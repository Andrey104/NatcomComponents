import React from 'react';
import ModalWindow from '../../../../components/ModalWindow/index';
import SupplierDetail from "../SupplierDetail";

class SupplierDetailModal extends React.Component {
    render() {
        return (
            <div className="modal-body">
                <SupplierDetail supplierId={this.props.supplierId}/>
            </div>
        )
    }
}

export default ModalWindow(SupplierDetailModal)

