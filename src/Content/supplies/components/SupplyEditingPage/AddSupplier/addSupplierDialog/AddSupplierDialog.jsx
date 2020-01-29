import React, {Component} from 'react';
import {connect} from "react-redux";
import DialogWindow from '../../../../../../components/ModalWindow';
import SuppliersMainPage from '../../../../../suppliers/components/SuppliersMainPage/SuppliersMainPage';
import {deleteSuppliersFromStore} from "../../../../../suppliers/store/actions/suppliers";

class AddSupplierDialog extends Component {

    render() {
        return (
            <div className='modal-body'>
                <SuppliersMainPage supplierForSupply={this.props.supplierForSupply} isDialog={true}/>
            </div>
        )
    }
    componentWillUnmount = () => this.props.deleteSuppliersFromStore();
}

export default connect(null, {deleteSuppliersFromStore})(DialogWindow(AddSupplierDialog));