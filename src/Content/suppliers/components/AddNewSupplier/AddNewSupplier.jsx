import React, {Component} from 'react';
import {connect} from 'react-redux';
import {addNewSupplier, deleteSupplierFromStore} from '../../store/actions/suppliers';
import SupplierEditingPage from "../SupplierEditingPage/SupplierEditingPage";

class AddNewSupplier extends Component {

    handleSubmit = supplier => this.props.addNewSupplier(supplier);

    render() {
        return <SupplierEditingPage handleSubmit={this.handleSubmit}/>
    }

    componentWillUnmount = () => this.props.deleteSupplierFromStore();
}

export default connect(null, {addNewSupplier, deleteSupplierFromStore})(AddNewSupplier);