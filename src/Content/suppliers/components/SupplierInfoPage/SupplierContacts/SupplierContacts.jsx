import React, {Component} from 'react';
import {getPhoneWithMask} from "../../../../../services/utils";
import './SupplierContacts.css';

export default class SupplierContacts extends Component {
    render() {
        const {contact, editContact} = this.props;
        return (
            <tr>
                <td className="contact-name">
                    <button type="button"
                            onClick={() => editContact(true, true, contact)}
                            className="btn btn-primary btn-sm">Редактировать
                    </button>
                    {contact.name}
                </td>
                <td>{getPhoneWithMask(contact.phone)}</td>
                <td>{contact.email}</td>
                <td>{contact.comment}</td>
            </tr>
        )
    }
}