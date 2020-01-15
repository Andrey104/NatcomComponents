import React, {Component} from 'react';
import {connect} from 'react-redux';

import SearchInput from '../../../components/SearchInput';
import SuppliersList from './SuppliersList/SuppliersList';
import {setSuppliersFilter} from '../../../AC/suppliers';
import './SuppliersMainPage.css';

class SuppliersMainPage extends Component {

    searchSuppliers = text => this.props.setSuppliersFilter(text);

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-12">
                        <div className="row align-items-center">
                            <div className="col-6">
                                <SearchInput search={this.searchSuppliers}/>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 suppliers-page-scroll">
                        <SuppliersList supplierForSupply={this.props.supplierForSupply}
                                       isDialog={this.props.isDialog}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(null, {setSuppliersFilter})(SuppliersMainPage)