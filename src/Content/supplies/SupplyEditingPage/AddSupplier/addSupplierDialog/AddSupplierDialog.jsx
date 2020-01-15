import React, {Component} from 'react';
import {connect} from "react-redux";
import DialogWindow from '../../../../../components/ModalWindow/index';
import SuppliersPage from '../../../../suppliers/SuppliersMainPage/SuppliersMainPage';

class AddSupplierDialog extends Component {

    render() {
        return (
            <div className='modal-body'>
                <SuppliersPage supplierForSupply = {this.props.supplierForSupply}/>
            </div>
        )
    }
}

export default connect(null, null)(DialogWindow(AddSupplierDialog));