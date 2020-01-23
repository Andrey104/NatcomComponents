import React, {Component} from 'react';
import {connect} from 'react-redux';
import {editSupplier, getSupplier} from '../../store/actions/suppliers';
import SupplierEditingPage from "../SupplierEditingPage/SupplierEditingPage";
import Loader from "../../../../components/Loader";

class EditSupplier extends Component {

    componentDidMount () {
        const urlId = this.props.match.params.supplierId;
        if (urlId) this.props.getSupplier(urlId);
    };

    handleSubmit = supplier => {
        this.props.editSupplier(this.props.supplier.id, supplier);
    };

    render() {
        if (!Object.keys(this.props.supplier).length) {
            return (
                <div className="pre-loader-container">
                    <Loader />
                </div>
            );
        }
        return (
                <SupplierEditingPage supplier={this.props.supplier}
                                     handleSubmit={this.handleSubmit}/>
        )
    }
}

export default connect(state => ({
    supplier: state.suppliers.supplier
}), {editSupplier, getSupplier})(EditSupplier);