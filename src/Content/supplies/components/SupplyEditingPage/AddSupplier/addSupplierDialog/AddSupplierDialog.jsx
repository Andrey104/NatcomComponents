import React, {Component} from 'react';
import {connect} from "react-redux";
import DialogWindow from '../../../../../../components/ModalWindow';
import SuppliersMainPage from '../../../../../suppliers/components/SuppliersMainPage/SuppliersMainPage';

class AddSupplierDialog extends Component {

    render() {
        return (
            <div className='modal-body'>
                <SuppliersMainPage supplierForSupply={this.props.supplierForSupply} isDialog={true}/>
            </div>
        )
    }
}

export default connect(null, null)(DialogWindow(AddSupplierDialog));