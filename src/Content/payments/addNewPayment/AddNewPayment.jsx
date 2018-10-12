import React from 'react';
import {connect} from 'react-redux';

import AddClientDialog from '../../../components/addClientDialog/AddClientDialog';
import {addNewPayment} from '../../../AC/payments';
import {openModalWindow, closeModalWindow} from '../../../AC/modal';
import {paymentTypes} from '../../../services/utils';
import {OPEN_ADD_CLIENT, REJECT_ORDER} from '../../../constans';

class AddNewPayment extends React.Component {
    client = null;

    constructor(props) {
        super(props);
        this.state = {
            sum: 0,
            paymentType: 1,
            openAddClientDialog: false,
        };
    }

    handleChangePayment = event => {
        const value = Number(event.target.value);
        const name = event.target.name;
        if (!isFinite(value)) return;
        this.setState({[name]: value});
    };

    closeDialog = () => this.props.closeModalWindow();

    selectedClient = client => {
        this.client = client;
        this.closeDialog();
    };

    handleSubmit = event => {
        event.preventDefault();
        const newPayment = {
            client: this.client.id,
            sum: this.state.sum,
            payment_type: this.state.paymentType
        };
        this.props.addNewPayment(newPayment);
    };

    getDialogWindow() {
        const {modal} = this.props;
        if (modal === OPEN_ADD_CLIENT) {
            return (
                <AddClientDialog header={'Добавить клиента'}
                                 addClient={this.selectedClient}
                                 close={this.closeDialog}/>
            )
        }
    };

    getCurrentClient() {
        if (this.client) {
            const {first_name, last_name} = this.client;
            return <h3>Сейчас выбран: {first_name} {last_name}</h3>;
        }
    };

    getDisabledState() {
        if (!this.client || !this.state.sum) {
            return true;
        }
        return false;
    }

    getPaymentSelect() {
        return (
            <div className="form-group">
                <label>Способ оплаты</label>
                <select className="form-control"
                        name="paymentType"
                        onChange={this.handleChangePayment}
                        defaultValue={this.state.paymentType}>
                    {paymentTypes.map((payment, index) => (
                        <option value={index + 1}
                                key={payment}>{payment}</option>
                    ))}
                </select>
            </div>
        )
    }

    render() {
        const dialogWindow = this.getDialogWindow();
        return (
            <div>
                {dialogWindow}
                <button type="button"
                        onClick={() => this.props.openModalWindow(OPEN_ADD_CLIENT)}
                        className="btn btn-success btn-sm">Добавить клиента
                </button>
                {this.getCurrentClient()}
                <div className="row">
                    <div className="col-6">
                        <div className="form-group">
                            <label htmlFor="sum">Сумма оплаты</label>
                            <input type="text"
                                   placeholder="Введите сумму"
                                   name="sum"
                                   value={this.state.sum}
                                   onChange={this.handleChangePayment}
                                   className="form-control"
                                   id="sum"/>
                        </div>
                    </div>
                    <div className="col-6">
                        {this.getPaymentSelect()}
                    </div>
                </div>
                <div className="col-sm-12 text-right">
                    <button type="submit"
                            onClick={this.handleSubmit}
                            disabled={this.getDisabledState()}
                            className="btn btn-primary">Добавить оплату
                    </button>
                </div>
            </div>
        )
    }
}

export default connect(state => ({
    modal: state.modal.modal
}), {openModalWindow, closeModalWindow, addNewPayment})(AddNewPayment);