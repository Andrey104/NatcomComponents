import React from 'react';
import {connect} from 'react-redux';
import EditSupplier from './editSupplier/EditSupplier';
import Loader from '../../../components/Loader';
import {editSupplier, getSupplierDetail} from '../../../AC/suppliers';
import styles from './styles.css';
import SuppliesList from "../../supplies/suppliesPage/suppliesList/SuppliesList";
import SupplierContacts from "./supplierContacts/SupplierContacts";
import AddNewContactModal from "../../../components/addNewContact/AddNewContactModal";

class SupplierDetail extends React.Component {
    urlId;
    isEdit = false;
    contact;

    state = {
        openEditSupplierDialog: false,
        openAddNewContactDialog: false
    };

    getSupplierInfo() {
        this.props.supplierId ? this.urlId = this.props.supplierId : this.urlId = this.props.match.params.supplierId;
        this.props.getSupplierDetail(this.urlId);
    }

    componentDidMount() {
        this.getSupplierInfo()
    };

    editSupplierState = () => {
        this.setState({openEditSupplierDialog: !this.state.openEditSupplierDialog});
    };

    successEditSupplier = (supplier) => {
        this.editSupplierState();
        this.props.editSupplier(supplier);
    };

    getDialogWindow() {
        let dialogWindow = null;
        if (this.state.openEditSupplierDialog) {
            dialogWindow = <EditSupplier header={'Редактирование поставщика'}
                                         successEditSupplier={this.successEditSupplier}
                                         close={this.editSupplierState}
                                         supplier={this.props.supplier}/>
        }
        return dialogWindow;
    }

    getSuppliersContacts(contacts) {
        return contacts.map((contact) => <SupplierContacts contact={contact} editContact = {this.addNewContactDialogIsOpen} />)
    }

    addNewContactDialogIsOpen = (isEdit, contact) => {
        if (isEdit) {
            this.isEdit = isEdit;
            contact ? this.contact = contact : null;
        }
        this.setState({openAddNewContactDialog: !this.state.openAddNewContactDialog});
    };


    getAddNewContactDialogWindow(supplierId) {
        return <AddNewContactModal close = {this.addNewContactDialogIsOpen}
                                   isEdit={this.isEdit}
                                   contact = {this.contact}
                                   supplierId={supplierId}/>
    }

    render() {
        const {supplier, isLoading} = this.props;
        if (isLoading || !supplier) {
            return (
                <div className={styles["pre-loader-container"]}>
                    <Loader/>
                </div>
            );
        }
        const dialogWindow = this.getDialogWindow();
        const contacts = this.getSuppliersContacts(supplier.contacts);
        const addNewContact = this.getAddNewContactDialogWindow(supplier.id);
        return (
            <div>
                {dialogWindow}
                {this.state.openAddNewContactDialog ? addNewContact : null}
                <h1>{supplier.name}</h1>
                <table className="table table-bordered">
                    <tbody>
                    <tr>
                        <th scope="row" className='name-col'>Имя</th>
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
                        onClick={this.editSupplierState}
                        className="btn btn-primary btn-sm">Редактировать
                </button>
                {supplier.contacts[0] ?
                    <div>
                        <h2>Контакты: </h2>
                        <table className="table table-bordered">
                            <tr className="thead-light">
                                <th scope="col">Имя</th>
                                <th scope="col">Номер телефона</th>
                                <th scope="col">Email</th>
                                <th scope="col">Комментарий</th>
                            </tr>
                            <tbody>
                            {contacts}
                            </tbody>
                        </table>
                    </div>
                    : <h3>У поставщика нет контактов</h3>}
                <button type="button"
                        onClick={() => this.addNewContactDialogIsOpen(false)}
                        className="btn btn-primary btn-sm">Добавить
                </button>
                <h3>Список поставок:</h3>
                <SuppliesList supplierId={supplier.id}/>
            </div>
        )
    }
}

export default connect((state) => ({
    supplier: state.suppliers.supplier,
    isLoading: state.suppliers.isLoading
}), {getSupplierDetail, editSupplier})(SupplierDetail);