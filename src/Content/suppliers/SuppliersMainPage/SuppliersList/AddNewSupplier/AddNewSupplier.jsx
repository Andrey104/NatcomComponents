import React, {Component} from 'react';
import {connect} from 'react-redux';

import DialogWindow from '../../../../../components/ModalWindow/index';
import {addNewSupplier} from '../../../../../AC/suppliers';
import './AddNewSupplier.css';

class AddNewSupplier extends Component {
    state = {
        name: '',
        address: null,
        comment: null
    };

    handleChangeSupplierState = event => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({[name]: value});
    };

    handleSubmit = event => {
        event.preventDefault();
        const newSupplier = this.getSupplier();
        this.props.addNewSupplier(newSupplier);
        this.close();
    };

    getSupplier = () => {
        let newSupplier = this.state;
        if (newSupplier.address === '') newSupplier.address = null;
        if (newSupplier.comment === '') newSupplier.comment = null;
        return newSupplier;
    };

    close = () => this.props.close();

    checkForm = () => !this.state.name;

    render() {
        return (
            <div>
                <div className="modal-body">
                    <div className="form-group">
                        <label htmlFor="name"
                               className="required-area">Имя поставщика</label>
                        <input type="text"
                               name="name"
                               onChange={this.handleChangeSupplierState}
                               className="form-control"
                               id="name"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Адрес поставщика</label>
                        <input type="text"
                               name="address"
                               onChange={this.handleChangeSupplierState}
                               className="form-control"
                               id="address"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="comment">Комментарий</label>
                        <textarea className="form-control text-field-dialog"
                                  name="comment"
                                  onChange={this.handleChangeSupplierState}
                                  id="comment"/>
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button"
                            onClick={this.close}
                            className="btn btn-secondary">Закрыть
                    </button>
                    <button type="submit"
                            onClick={this.handleSubmit}
                            disabled={this.checkForm()}
                            className="btn btn-primary">Добавить
                    </button>
                </div>
            </div>
        )
    }
}

export default DialogWindow(connect(null, {addNewSupplier})(AddNewSupplier));