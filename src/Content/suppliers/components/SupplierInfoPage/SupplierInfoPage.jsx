import React, {Component} from 'react';
import {connect} from 'react-redux';
import Loader from '../../../../components/Loader';
import {getSupplier, openAddNewContactWindow, deleteSupplierFromStore} from '../../store/actions/suppliers';
import styles from './SupplierInfoPage.css';
import SuppliesList from "../../../supplies/components/SuppliesMainPage/SuppliesList/SuppliesList";
import SupplierContacts from "./SupplierContacts/SupplierContacts";
import AddNewContactModal from "../../../../components/addNewContact/AddNewContactModal";
import history from "../../../../history";

class SupplierInfoPage extends Component {
    urlId;

    componentWillMount() {
        this.urlId = this.props.match.params.supplierId;
        this.props.getSupplier(this.urlId);
    };

    getSuppliersContacts(contacts) {
        return contacts.map((contact) => <SupplierContacts contact={contact} editContact = {this.openAddNewContactModalWindow} />)
    };

    openAddNewContactModalWindow = (isOpen, isEdit, contact) => {
        this.props.openAddNewContactWindow({isOpen, isEdit, contact})
    };

    closeAddNewContactModalWindow = () => {
      this.props.openAddNewContactWindow({isOpen: false, isEdit: false});
    };

    getAddNewContactDialogWindow() {
        return <AddNewContactModal contact = {this.contact} close={this.closeAddNewContactModalWindow} supplierId={this.props.supplier.id}/>
    };

    render() {
        const {supplier, openAddNewContact} = this.props;
        if (supplier.id !== Number(this.urlId)) { //TODO: определить pre-loader-container стиль
            return (
                <div className={styles["pre-loader-container"]}>
                    <Loader/>
                </div>
            );
        }
        const contacts = this.getSuppliersContacts(supplier.contacts);
        const addNewContact = this.getAddNewContactDialogWindow(supplier.id);
        return (
            <div>
                {openAddNewContact ? addNewContact : null}
                <table className="table table-bordered">
                    <tbody>
                    <tr>
                        <th scope="row">Имя</th>
                        <td>{supplier.name}</td>
                    </tr>
                    <tr>
                        <th>Адрес</th>
                        <td>{supplier.address}</td>
                    </tr>
                    <tr>
                        <th>Комментарий</th>
                        <td>{supplier.comment}</td>
                    </tr>
                    </tbody>
                </table>
                <button type="button"
                        onClick={() => history.push(`/suppliers/${this.urlId}/edit`)}
                        className="btn btn-primary btn-sm">Редактировать
                </button>
                {supplier.contacts[0] ?
                    <div className="mobile-table-container">
                        <h4>Контакты:</h4>
                        <table className="table table-bordered">
                            <thead className="thead-light">
                                <th scope="col">Имя</th>
                                <th scope="col">Номер телефона</th>
                                <th scope="col">Email</th>
                                <th scope="col">Комментарий</th>
                            </thead>
                            <tbody>
                                {contacts}
                            </tbody>
                        </table>
                    </div>
                    : <h4>У поставщика нет контактов</h4>}
                <button type="button"
                        onClick={() => this.openAddNewContactModalWindow(true,false)}
                        className="btn btn-primary btn-sm">Добавить
                </button>
                <h4>Список поставок:</h4>
                <SuppliesList supplierId={supplier.id}/>
            </div>
        )
    }
    componentWillUnmount = () => this.props.deleteSupplierFromStore();
}

export default connect((state) => ({
    supplier: state.suppliers.supplier,
    openAddNewContact: state.suppliers.openAddNewContact
}), {getSupplier, openAddNewContactWindow, deleteSupplierFromStore})(SupplierInfoPage);