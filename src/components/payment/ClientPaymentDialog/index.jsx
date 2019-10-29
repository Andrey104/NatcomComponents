import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import DialogWindow from '../../ModalWindow/index';
import {addNewPayment} from '../../../AC/payments';
import {paymentTypes} from '../../../services/utils';

class ClientPaymentDialog extends React.Component {

    constructor(props) {
        super(props);
        let comment ="";

        const {order} = this.props;

        if (order) {
            comment = "Оплата по заказу №" + order.id
        }

        this.state = {
            sum: 0,
            paymentType: 1,
            openAddClientDialog: false,
            comment: comment,
        };
    }

    handleChangePayment = event => {
        const value = (event.target.value);
        const name = event.target.name;
        if (!isFinite(value)) return;
        this.setState({[name]: value});
    };

    handleChangeComment = event => {
        this.setState({
            comment: event.target.value
        });
    };

    handleSubmit = event => {
        event.preventDefault();
        const newPayment = {
            client: this.props.client.id,
            sum: this.state.sum,
            payment_type: this.state.paymentType,
            comment: this.state.comment
        };

        this.props.addNewPayment(newPayment, this.props.order);
        this.props.close();
    };

    getCurrentClient() {
        const {client} = this.props;
        if (client) {
            const {first_name, last_name} = client;
            return (
                <div>
                    <p>Клиент:</p> <h4>{first_name} {last_name}</h4>
                </div>
            );
        }
    };


    getPaymentSelect() {
        return (
            <div>
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
                <hr/>
                <div className="row">
                    <div className="col-md-6">
                        <label htmlFor="sum">Сумма оплаты (руб)</label>
                        <input type="text"
                               placeholder="Введите сумму"
                               name="sum"
                               value={this.state.sum || ""}
                               onChange={this.handleChangePayment}
                               className="form-control"
                               id="sum"/>
                    </div>
                </div>
                <br/>
                <div className="row">
                    <div className="col-md-6">
                        {this.getPaymentSelect()}
                    </div>
                </div>
                <br/>
                <div className="row">
                    <div className="col-md-6">
                        <label htmlFor="sum">Комментарий</label>
                        <textarea type="text"
                               placeholder="Комментарий"
                               name="comment"
                               value={this.state.comment}
                               onChange={this.handleChangeComment}
                               className="form-control"/>
                    </div>
                </div>
                <br/>
                <div className="row">
                    <div className="col-md-12">
                        <button type="submit"
                                onClick={this.handleSubmit}
                                className="btn btn-primary">Добавить оплату
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(state => ({}), {addNewPayment})(DialogWindow(ClientPaymentDialog));