import React from 'react';
import ModalWindow from '../ModalWindow/index';
import AddNewContact from "./AddNewContact/AddNewContact";

class AddNewContactModal extends React.Component {
    render() {
        const {isEdit, contact, supplierId, close} = this.props;
        return(
            <div className="modal-body">
                <AddNewContact isEdit={isEdit} contact={contact} supplierId={supplierId} close={close}/>
            </div>
        )
    }
}

export default ModalWindow(AddNewContactModal);