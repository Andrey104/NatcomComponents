import React, {Component} from 'react';
import {getPhoneWithMask} from "../../../../../services/utils";
import './SupplierContacts.css';

export default class SupplierContacts extends Component {
    render() {
        const {contact, editContact} = this.props;
        return (
            <tr>
                <td className="contact-name">
                    <img onClick={() => editContact(true, true, contact)} src="/public/edit.svg"
                         className="circle-button edit-button"/>
                    {contact.name}
                </td>
                <td data-label="Телефон: ">{getPhoneWithMask(contact.phone)}</td>
                <td data-label="Email: ">{contact.email}</td>
                <td data-label="Комментарий: ">{contact.comment}</td>
            </tr>
        )
    }
}