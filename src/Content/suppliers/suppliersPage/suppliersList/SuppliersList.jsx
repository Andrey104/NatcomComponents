import React from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames/bind';

import SupplierCard from './SupplierCard/index';
import AddNewSupplier from './addNewSupplier/AddNewSupplier';
import AddButton from '../../../../components/AddButton/index';
import Loader from '../../../../components/Loader/index';
import InfiniteScrollOverride from '../../../../services/InfiniteScrollOverride';
import {mapToArr} from '../../../../helpers';
import {getAllSuppliers, getNextSuppliers} from '../../../../AC/suppliers';
import styles from './styles.scss';
import SupplierDetailModal from "../../supplierDetail/supplierDetailModal/supplierDetailModal";

let cx = classNames.bind(styles);

class SuppliersList extends React.Component {
    selectedSupplierId;
    state = {
        openAddSupplierDialog: false,
        supplierDetailModalIsOpen: false
    };

    componentWillMount = () => this.props.getAllSuppliers();

    loadSuppliers = page => this.props.getNextSuppliers(page);

    addSupplierState = () => {
        this.setState({openAddSupplierDialog: !this.state.openAddSupplierDialog});
    };

    handleSupplierClick = supplierId => {
      this.selectedSupplierId = supplierId;
      this.setState({supplierDetailModalIsOpen: true});
    };

    closeSupplierDetailModalWindow = () => {
        this.setState({supplierDetailModalIsOpen: false})
    };

    getBody(suppliers) {
        if (!suppliers.length) return (
            <tr>
                <td colSpan='6'>Вы еще не добавили ни одного поставщика</td>
            </tr>
        );

        let number = 1;
        return suppliers.map((supplier) => (
                <SupplierCard key={supplier.id}
                              number={number++}
                              supplierForSupply={this.props.supplierForSupply}
                              supplier={supplier}
                              handleClick={this.handleSupplierClick}/>
            )
        );
    }

    getDialogWindow() {
        let dialogWindow = null;
        if (this.state.openAddSupplierDialog) {
            dialogWindow = <AddNewSupplier header={'Новый поставщик'}
                                           close={this.addSupplierState}/>
        }
        return dialogWindow;
    }

    getAddSupplierButton() {
        return this.props.supplierForSupply ? null : <AddButton openAdd={this.addSupplierState}/>
    }

    getPageClasses = () => this.props.supplierForSupply ? 'dialog' : '';

    getSupplierDetailModalWindow() {
        if (this.state.supplierDetailModalIsOpen) {
            return (
                <SupplierDetailModal supplierId={this.selectedSupplierId} close={this.closeSupplierDetailModalWindow}/>
            )
        }
    }

    render() {
        let content;
        const {isLoading, suppliers, hasMoreSuppliers} = this.props;
        const loader = hasMoreSuppliers ? <Loader/> : false;
        if (isLoading || !suppliers) {
            content = (
                <div className="pre-loader-container">
                    <Loader/>
                </div>
            );
        } else {
            content = (
                <div className={cx('col-12', this.getPageClasses())}>
                    <InfiniteScrollOverride
                        pageStart={1}
                        loadMore={this.loadSuppliers}
                        hasMore={hasMoreSuppliers}
                        useWindow={false}
                        isDialog={this.props.supplierForSupply}
                        className = 'scroll'>
                        <div className="row">
                            <div className="col-12">
                                <table className="table table-hover table-bordered">
                                    <thead className="thead-light">
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Поставщик</th>
                                        <th scope="col">Адрес</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {this.getBody(suppliers)}
                                    </tbody>
                                </table>
                                {loader}
                            </div>
                            {this.getAddSupplierButton()}
                        </div>
                    </InfiniteScrollOverride>
                </div>
            )
        }


        const dialogWindow = this.getDialogWindow();
        const supplierDetailModalWindow = this.getSupplierDetailModalWindow();
        return (
            <div className="row">
                {dialogWindow}
                {supplierDetailModalWindow}
                {content}
            </div>
        )
    }
}

export default connect((state) => ({
    suppliers: mapToArr(state.suppliers.suppliers),
    isLoading: state.suppliers.isLoading,
    hasMoreSuppliers: state.suppliers.hasMoreSuppliers,
}), {getAllSuppliers, getNextSuppliers})(SuppliersList);