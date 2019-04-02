import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import DialogWindow from '../../../../components/ModalWindow';
import {addPaymentInOrder} from '../../../../AC/orders';
import {priceFormat} from "../../../../services/utils";
import {ORDER_CONFIRM_STATUS} from "../../../../constans";

class ReturnPaymentDialog extends React.Component {
    error = true;

    static propTypes = {
        order: PropTypes.object,
        update: PropTypes.func,
        close: PropTypes.func
    };

    constructor(props) {
        super(props);
        const {order} = this.props;
        let paymentSum = 0;
        for (const payment of order.payments) {
            paymentSum += Number(payment.sum);
        }
        this.paymentBalance = Number(order.sum) - paymentSum;
        this.state = {
            selectedPaymentOption: "ALL",
        };
        const orderSum = this.props.order.sum;
        const prepayment = this.props.order.prepayment;
        const nowPayment = this.getNowPayment();
    }

    getSubmitDisable() {
        return !(!this.getAlert() && !this.getError());
    }

    handleChangeSum = event => {
        const sum = (event.target.value);
        if (!isFinite(sum)) return;
        this.setState({sum});
    };

    handleSubmit = event => {
        event.preventDefault();
        const {order, addPaymentInOrder} = this.props;
        let payment = {
            sum: this.getPaySum()
        };
        if (payment.sum !== "0.00" && !this.getError()) {
            addPaymentInOrder(payment, order.id);
        }
        this.props.close();
    };

    getNowPayment() {
        const {order} = this.props;
        let s;
        s = 0;
        order.payments.map(payment => {
            s = s + Number(payment.sum)
        });
        return priceFormat(s)
    }

    handlePaymentOptionChange = (event) => {
        this.setState({
            selectedPaymentOption: event.target.value
        });
    };

    getPaySum() {
        let paySum = 0;
        const orderSum = Number(this.props.order.sum);
        const prepayment = Number(this.props.order.prepayment);
        const nowPayment = Number(this.getNowPayment());
        if (this.state.selectedPaymentOption === "PREPAYMENT") {
            if (nowPayment > prepayment) {
                paySum = 0;
            } else {
                paySum = prepayment - nowPayment;
            }
        } else {
            if (nowPayment > orderSum) {
                paySum = 0;
            } else {
                paySum = orderSum - nowPayment;
            }
        }
        return priceFormat(paySum);
    }

    getAlert() {
        let alert;
        if (this.state.selectedPaymentOption === "PREPAYMENT") {
            if (this.getPaySum() === "0.00") {
                alert = "Предоплата по этому заказу, уже внесена!";
            } else {
                alert = null;
            }
        } else {
            if (this.getPaySum() === "0.00") {
                alert = "Вся оплата по этому заказу, уже внесена!";
            } else {
                alert = null;
            }
        }
        if (alert) {
            return (
                <div className="alert alert-success">{alert}</div>
            );
        } else {
            return null;
        }
    }

    getError() {
        let error = null;
        const {order} = this.props;
        if (order.status < ORDER_CONFIRM_STATUS) {
            error = "Этот заказ еще не подтвержден"
        }
        if (error) {
            return (
                <div className="alert alert-danger">{error}</div>
            );
        } else {
            return null;
        }
    }


    render() {
        return (
            <div>
                <div className="modal-body text-left">
                    <div className="row">
                        <div className="col-md-6">
                            <p>Сумма: {priceFormat(this.props.order.sum)} руб.</p>
                            <p>Предоплата: {priceFormat(this.props.order.prepayment)} руб.</p>
                        </div>
                        <div className="col-md-6">
                            <p>Оплачено: {this.getNowPayment()} руб.</p>
                            <p>Осталось оплатить: {priceFormat(this.paymentBalance)} руб.</p>
                        </div>
                    </div>
                    {this.getError()}
                    <form>
                        <div>
                            <lable>
                                <input type="radio"
                                       checked={this.state.selectedPaymentOption === "PREPAYMENT"}
                                       disabled={this.state.prepaymentDisable}
                                       onChange={this.handlePaymentOptionChange}
                                       value="PREPAYMENT"/> Предоплата
                            </lable>
                        </div>
                        <div>
                            <lable>
                                <input type="radio"
                                       checked={this.state.selectedPaymentOption === "ALL"}
                                       onChange={this.handlePaymentOptionChange}
                                       value="ALL"/> Вся сумма
                            </lable>
                        </div>
                    </form>
                    <div className="form-group">
                        <label htmlFor="sum">
                            Сумма
                        </label>
                        <input type="text"
                               placeholder="Сумма"
                               value={this.getPaySum()}
                               disabled={true}
                               className="form-control"
                               id="sum"/>
                        {this.getAlert()}
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button"
                            onClick={this.props.close}
                            className="btn btn-secondary">Закрыть
                    </button>
                    <button type="submit"
                            onClick={this.handleSubmit}
                            disabled={this.getSubmitDisable()}
                            className="btn btn-primary">Оплатить
                    </button>
                </div>
            </div>
        )
    }
}

export default DialogWindow(connect(null, {addPaymentInOrder})(AddPaymentDialog));