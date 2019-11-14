import React from 'react';
import {getPhoneWithMask} from "../../../../services/utils";
import './styles.css';

class SupplierContacts extends React.Component {
    render() {
        const {contact, editContact} = this.props;
        return (
            <tr>
                <td>{contact.name}</td>
                <td>{getPhoneWithMask(contact.phone)}</td>
                <td>{contact.email}</td>
                <td>{contact.comment}</td>
                <button type="button"
                        onClick={() => editContact(true, contact)}
                        className="btn btn-primary btn-sm">Редактировать
                </button>
            </tr>
        )
    }
}

export default SupplierContacts;