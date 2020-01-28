import React, {Component} from 'react';
import {connect} from 'react-redux';

import SearchInput from '../../../../components/SearchInput';
import SuppliersList from './SuppliersList/SuppliersList';
import {setSuppliersFilter} from '../../store/actions/suppliers';

class SuppliersMainPage extends Component {

    searchSuppliers = text => this.props.setSuppliersFilter(text);

    render() {
        return (
            <div className="row">
                <div className="col-12">
                    <div className="row align-items-center">
                        <div className="col-12">
                            <SearchInput search={this.searchSuppliers}/>
                        </div>
                    </div>
                </div>
                <div className="col-12">
                    <SuppliersList supplierForSupply={this.props.supplierForSupply}
                                   isDialog={this.props.isDialog}/>
                </div>
            </div>
        )
    }
}

export default connect(null, {setSuppliersFilter})(SuppliersMainPage)