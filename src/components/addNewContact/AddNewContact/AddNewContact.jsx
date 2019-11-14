import React from 'react';
import './styles.css';
import {getPhoneWithMask} from "../../../services/utils";
import {connect} from 'react-redux';
import {addNewContact, editContact, deleteContact} from "../../../AC/suppliers";

class AddNewContact extends React.Component {
    constructor(props) {
        super(props);
        let editContact;
        this.props.contact ? editContact = this.props.contact :
            editContact = {
                name: "Имя",
                phone: "Номер телефона",
                email: "Email",
                comment: "Комментарий"
            };
        this.state = {
            name: editContact.name,
            phone: editContact.phone,
            email: editContact.email,
            comment: editContact.comment
        }

    }
    state = {
            name: "Имя",
            phone: "Номер телефона",
            email: "Email",
            comment: "Комментарий"
    };

    componentDidMount() {
        const {contact} = this.props;
        contact ? this.setState({name: contact.name,
                                       phone: contact.phone,
                                       email: contact.email,
                                       comment: contact.comment}) : null;
    }

    handleChangeContactsName = event => {
        this.setState({name: event.target.value})
    };
    handleChangeContactsPhone = event => {
        this.setState({phone: event.target.value})
    };
    handleChangeContactsEmail = event => {
        this.setState({email: event.target.value})
    };
    handleChangeContactsComment = event => {
        this.setState({comment: event.target.value})
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

    render() {
        const {isEdit, supplierId, contact} = this.props;
        return (
            <div className="add-new-contact-container">
                {isEdit ? <h1>Редактировать контакт</h1> : <h1>Добавить новый контакт</h1>}
                <input className="form-control" placeholder="Имя" defaultValue={isEdit ? this.state.name : null}
                       onChange={this.handleChangeContactsName}/>
                <input className="form-control" placeholder="Email" defaultValue={isEdit ? this.state.email : null}
                       onChange={this.handleChangeContactsEmail}/>
                <input className="form-control" placeholder="Номер телефона" defaultValue={isEdit ? getPhoneWithMask(this.state.phone) : null}
                       onChange={this.handleChangeContactsPhone}/>
                <input className="form-control" placeholder="Комментарий" defaultValue={isEdit ? this.state.comment : null}
                       onChange={this.handleChangeContactsComment}/>
                <button type="button"
                        onClick={() => this.submitButtonClick(isEdit)}
                        className="btn btn-primary btn-sm">{isEdit ? "Редактировать" : "Добавить"}
                </button>
                {isEdit ? <button type="button"
                                  onClick={() => this.deleteButtonClick(supplierId, contact.id)}
                                  className="btn btn-danger btn-sm">Удалить
                          </button>
                : null}
            </div>
        )
    }
}

const mapDispatchToProps = {
  addNewContact,
  editContact,
  deleteContact
};

export default connect(null, mapDispatchToProps)(AddNewContact);