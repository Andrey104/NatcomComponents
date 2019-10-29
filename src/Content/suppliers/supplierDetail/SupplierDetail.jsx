import React from 'react';
import {connect} from 'react-redux';

import EditSupplier from './editSupplier/EditSupplier';
import Loader from '../../../components/Loader';
import {editSupplier, getSupplierDetail} from '../../../AC/suppliers';
import styles from './styles.css';
import SuppliesList from "../../supplies/suppliesPage/suppliesList/SuppliesList";

class SupplierDetail extends React.Component {
    urlId;
    state = {
        openEditSupplierDialog: false,
    };

    componentDidMount() {
        this.props.supplierId ? this.urlId = this.props.supplierId : this.urlId = this.props.match.params.supplierId;
        this.props.getSupplierDetail(this.urlId);
    };

    editSupplierState = () => {
        this.setState({openEditSupplierDialog: !this.state.openEditSupplierDialog});
    };

    successEditSupplier = (supplier) => {
        this.editSupplierState();
        this.props.editSupplier(supplier);
    };

    getDialogWindow() {
        let dialogWindow = null;
        if (this.state.openEditSupplierDialog) {
            dialogWindow = <EditSupplier header={'Редактирование поставщика'}
                                         successEditSupplier={this.successEditSupplier}
                                         close={this.editSupplierState}
                                         supplier={this.props.supplier}/>
        }
        return dialogWindow;
    }

    render() {
        const {supplier, isLoading} = this.props;
        if (isLoading || !supplier) {
            return (
                <div className={styles["pre-loader-container"]}>
                    <Loader/>
                </div>
            );
        }
        const dialogWindow = this.getDialogWindow();
        return (
            <div>
                {dialogWindow}
                <table className="table table-bordered">
                    <tbody>
                    <tr>
                        <th scope="row" className='name-col'>Имя</th>
                        <td>{supplier.name}</td>
                    </tr>
                    <tr>
                        <th>Адрес</th>
                        <td>{supplier.address}</td>
                    </tr>
                    <tr>
                        <th>Комментарий</th>
                        <td>{supplier.comment}</td>
                    </tr>
                    </tbody>
                </table>

                <button type="button"
                        onClick={this.editSupplierState}
                        className="btn btn-primary btn-sm">Редактировать
                </button>
                <h3>Список поставок:</h3>
                <SuppliesList supplierId={supplier.id}/>
            </div>
        )
    }
}

export default connect((state) => ({
    supplier: state.suppliers.supplier,
    isLoading: state.suppliers.isLoading
}), {getSupplierDetail, editSupplier})(SupplierDetail);