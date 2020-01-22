import React, {Component} from 'react';
import {connect} from 'react-redux';
import {addNewSupplier} from '../../store/actions/suppliers';
import SupplierEditingPage from "../SupplierEditingPage/SupplierEditingPage";

class AddNewSupplier extends Component {

    handleSubmit = supplier => {
        this.props.addNewSupplier(supplier);
        //history.replace('')
    }

    render() {
        return (
                <SupplierEditingPage handleSubmit={this.handleSubmit}/>
        )
    }
}

export default connect(null, {addNewSupplier})(AddNewSupplier);