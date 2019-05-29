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

let cx = classNames.bind(styles);

class SuppliersList extends React.Component {
    state = {
        openAddSupplierDialog: false
    };

    componentWillMount = () => this.props.getAllSuppliers();

    loadSuppliers = page => this.props.getNextSuppliers(page);

    addSupplierState = () => {
        this.setState({openAddSupplierDialog: !this.state.openAddSupplierDialog});
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
                              supplier={supplier}/>
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

    render() {
        const {isLoading, suppliers, hasMoreSuppliers} = this.props;
        if (isLoading || !suppliers) {
            return (
                <div className="pre-loader-container">
                    <Loader/>
                </div>
            );
        }
        const loader = hasMoreSuppliers ? <Loader/> : false;
        const dialogWindow = this.getDialogWindow();
        return (
            <div className="row">
                {dialogWindow}
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
            </div>
        )
    }
}

export default connect((state) => ({
    suppliers: mapToArr(state.suppliers.suppliers),
    isLoading: state.suppliers.isLoading,
    hasMoreSuppliers: state.suppliers.hasMoreSuppliers,
}), {getAllSuppliers, getNextSuppliers})(SuppliersList);