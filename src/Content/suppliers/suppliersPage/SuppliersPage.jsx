import React from 'react';
import {connect} from 'react-redux';

import SearchInput from '../../../components/SearchInput';
import SuppliersList from './suppliersList/SuppliersList';
import {getAllSuppliers} from '../../../AC/suppliers';

class SuppliersPage extends React.Component {
    searchText;

    searchSuppliers = text => {
        this.searchText = text;
        this.getFilterSuppliers();
    };

    getFilterSuppliers = () => {
        let url = '';
        if (this.searchText) url += `text=${this.searchText}&`;
        if (url) {
            url = '?' + url.slice(0, url.length - 1);
        }
        this.props.getAllSuppliers(url);
    };

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
                    <div className="col-12">
                        <SuppliersList/>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(null, {getAllSuppliers})(SuppliersPage)