import React, {Component} from 'react';
import './styles.css';
import {getPhoneWithoutMask, phoneMask} from "../../../services/utils";
import {connect} from 'react-redux';
import {
    addNewContact,
    editContact,
    deleteContact,
    openAddNewContactWindow
} from "../../../Content/suppliers/store/actions/suppliers";
import MaskedInput from "react-text-mask";

class AddNewContact extends Component {
    constructor(props) {
        super(props);
        let editContact;
        this.props.contact ? editContact = this.props.contact :
            editContact = {
                name: null,
                phone: null,
                email: null,
                comment: null
            };
        this.state = {
            name: editContact.name,
            phone: editContact.phone,
            email: editContact.email,
            comment: editContact.comment
        }
    };

    handleChangeInput = event => {
        const {handleChangeNewSupplierContact, newSupplier} = this.props;
        let name = event.target.name;
        let value = event.target.value;
        name === "phone" ? this.setState({[name]: getPhoneWithoutMask(value)}) : this.setState({[name]: value});
        newSupplier ? handleChangeNewSupplierContact(event) : null;
    };

    submitButtonClick = (isEdit) => {
        isEdit ? this.props.editContact(this.props.supplierId, this.props.contact.id, this.state)
            : this.props.addNewContact(this.props.supplierId, this.state);
        this.props.close();
    };

    deleteButtonClick = (supplierId, contactId) => {
        this.props.deleteContact(supplierId, contactId);
        this.props.close();
    };

    getDisabledState = () => {
        if (!this.state.name) return true
    };

    getEditButtons(isEdit, supplierId, contact) {
       return (
            <div>
                <button type="button"
                         onClick={() => this.submitButtonClick(isEdit)}
                         disabled={this.getDisabledState()}
                         className="btn btn-primary btn-sm">{isEdit ? "Сохранить" : "Добавить"}
                </button>
                {isEdit ? <button type="button"
                                  onClick={() => this.deleteButtonClick(supplierId, contact.id)}
                                  className="btn btn-danger btn-sm">Удалить
                    </button>
                    : null}
            </div>
        )
    };

    render() {
        const {isEdit, supplierId, contact, newSupplier} = this.props;
        let editButtons = this.getEditButtons(isEdit, supplierId, contact, newSupplier);
        return (
            <div className="add-new-contact-container">
                {isEdit ? <h3>Редактировать контакт</h3> : <h3>Добавить новый контакт</h3>}
                <input className="form-control" name="name" placeholder="Имя" defaultValue={isEdit ? this.state.name : null}
                       onChange={this.handleChangeInput}/>
                <input className="form-control" name="email" placeholder="Email" defaultValue={isEdit ? this.state.email : null}
                       onChange={this.handleChangeInput}/>
                <MaskedInput type="text"
                             name="phone"
                             placeholder="Номер телефона"
                             defaultValue={isEdit ? this.state.phone : null}
                             mask={phoneMask}
                             onChange={this.handleChangeInput}
                             className="form-control"
                             id="supplier_contact_phone"/>
                <input className="form-control" name="comment" placeholder="Комментарий" defaultValue={isEdit ? this.state.comment : null}
                       onChange={this.handleChangeInput} />
                {!newSupplier ? <div>{editButtons}</div> : null}
            </div>
        )
    }
}

export default connect(state => ({
    contact: state.suppliers.contact,
    isEdit: state.suppliers.isEdit,
}), {addNewContact, editContact, deleteContact, openAddNewContactWindow})(AddNewContact);