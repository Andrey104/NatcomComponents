import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import DialogWindow from '../../../components/DialogWindow/index';
import {addNewPayment} from '../../../AC/payments';
import {paymentTypes} from '../../../services/utils';

class ClientPaymentDialog extends React.Component {

    static propTypes = {
        client: PropTypes.object
    };

    constructor(props) {
        super(props);
        this.state = {
            sum: 0,
            paymentType: 1,
            openAddClientDialog: false,
        };
    }

    handleChangePayment = event => {
        const value = (event.target.value);
        const name = event.target.name;
        if (!isFinite(value)) return;
        this.setState({[name]: value});
    };

    selectedClient = client => {
        this.client = client;
        this.closeDialog();
    };

    handleSubmit = event => {
        event.preventDefault();
        const newPayment = {
            client: this.props.client.id,
            sum: this.state.sum,
            payment_type: this.state.paymentType
        };
        this.props.addNewPayment(newPayment);
        this.props.close();
    };

    getCurrentClient() {
        const {client} = this.props;
        if (client) {
            const {first_name, last_name} = client;
            return <p>Клиент: {first_name} {last_name}</p>;
        }
    };


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
        return (
            <div className="modal-body">
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
                            className="btn btn-primary">Добавить оплату
                    </button>
                </div>
            </div>
        )
    }
}

export default connect(state => ({
}), {addNewPayment})(DialogWindow(ClientPaymentDialog));