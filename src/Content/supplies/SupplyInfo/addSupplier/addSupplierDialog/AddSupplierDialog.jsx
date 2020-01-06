import React from 'react';
import {connect} from "react-redux";
import DialogWindow from '../../../../../components/ModalWindow/index';
import SuppliersPage from '../../../../suppliers/suppliersPage/SuppliersPage';
import {getAllSuppliers} from "../../../../../AC/suppliers";

class AddSupplierDialog extends React.Component {

    render() {
        return (
            <div className='modal-body'>
                <SuppliersPage supplierForSupply = {this.props.supplierForSupply}/>
            </div>
        )
    }
}

export default connect(null, {getAllSuppliers})(DialogWindow(AddSupplierDialog));