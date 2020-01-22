import React, {Component} from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames/bind';

import SupplierCard from './SupplierCard/SupplierCard';
import AddButton from '../../../../../components/AddButton';
import Loader from '../../../../../components/Loader';
import InfiniteScrollOverride from '../../../../../services/InfiniteScrollOverride';
import {mapToArr} from '../../../../../helpers';
import {getSuppliers} from '../../../store/actions/suppliers';
import styles from './SupliersList.scss';
import history from "../../../../../history";

let cx = classNames.bind(styles);

class SuppliersList extends Component {

    componentDidMount = () => this.props.getSuppliers(null, this.props.filter, true);

    loadSuppliers = () => {
        const {isLoading, nextPageNumber} = this.props;
        if (isLoading) return;
        this.props.getSuppliers(nextPageNumber, this.props.filter, false);
    };

    addNewSupplier = () => history.push(`/suppliers/add_supplier`);

    getBody(suppliers) {
        if (!suppliers.length) return (
            <tr>
                <td colSpan='6'>Вы еще не добавили ни одного поставщика</td>
            </tr>
        );

        return suppliers.map((supplier, index) => (
                <SupplierCard key={supplier.id}
                              number={++index}
                              supplierForSupply={this.props.supplierForSupply}
                              supplier={supplier}/>
            )
        );
    };

    getAddSupplierButton = () => {
        return this.props.supplierForSupply ? null : <AddButton openAdd={this.addNewSupplier}/>
    };

    getPageClasses = () => this.props.supplierForSupply ? 'dialog' : '';

    render() {
        const {isLoading, suppliers, hasMoreSuppliers} = this.props;
        const loader = hasMoreSuppliers ? <Loader/> : false;
        if (isLoading && !suppliers.length) {
            return (
                <div className="pre-loader-container">
                    <Loader/>
                </div>
            );
        }
        return (
            <div className="row">
                <div className={cx('col-12', this.getPageClasses())}>
                    <InfiniteScrollOverride
                        loadMore={this.loadSuppliers}
                        hasMore={hasMoreSuppliers}
                        useWindow={false}
                        isDialog={this.props.isDialog}
                        className='scroll'>
                        <div className="row">
                            <div className="col-12">
                                <table className="table table-hover table-bordered">
                                    <thead className="thead">
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
    filter: state.suppliers.searchText,
    isLoading: state.suppliers.isLoading,
    hasMoreSuppliers: state.suppliers.hasMoreSuppliers,
    nextPageNumber: state.suppliers.nextPageNumber
}), {getSuppliers})(SuppliersList);