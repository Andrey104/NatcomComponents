import React from 'react';
import {connect} from 'react-redux';

import SearchInput from '../../../components/SearchInput';
import SuppliersList from './suppliersList/SuppliersList';
import {getAllSuppliers} from '../../../AC/suppliers';
import './styles.css';

class SuppliersPage extends React.Component {
    state = {
        searchText: ''
    };

    searchSuppliers = text => {
        this.props.getAllSuppliers(text);
        this.setState({searchText: text});
    };

    render() {
        console.log('SupplierPage render:: ', this.props.supplierForSupply);
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
                        <SuppliersList supplierForSupply = {this.props.supplierForSupply} text={this.state.searchText}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(null, {getAllSuppliers})(SuppliersPage)