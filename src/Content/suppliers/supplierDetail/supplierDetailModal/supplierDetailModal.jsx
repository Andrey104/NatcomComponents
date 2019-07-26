import React from 'react';
import ModalWindow from '../../../../components/ModalWindow/index';
import SupplierDetail from "../SupplierDetail";

class SupplierDetailModal extends React.Component {
    render() {
        return (
            <SupplierDetail supplierId = {this.props.supplierId}/>
        )
    }
}

export default ModalWindow(SupplierDetailModal)

