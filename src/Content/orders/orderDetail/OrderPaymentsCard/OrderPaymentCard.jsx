import React from 'react';
import PropTypes from 'prop-types';

import {getDate, priceFormat, userTypes} from '../../../../services/utils';
import {
    ORDER_PAYMENT_FULL_STATUS, ORDER_PAYMENT_NO_PAYMENT_STATUS,
    ORDER_PAYMENT_PREPAYMENT_STATUS
} from "../../../../constans";

class OrderPaymentCard extends React.Component {
    paymentSum;

    static propTypes = {
        order: PropTypes.object,
        addBalancePay: PropTypes.func,
    };

    constructor(props) {
        super(props);
        this.state = {
            historyIsVisible: false
        };
    }

    historySwitch = () => {
        this.setState({
            historyIsVisible: !this.state.historyIsVisible
        });
    };

    getPayment(payment) {
        const {user} = payment;
        this.paymentSum += Number(payment.sum);
        const date = getDate(payment.auto_date);
        const userInfo = `${user.first_name} ${user.last_name}(${userTypes[user.type]})`;
        const sum = `списал с баланса: ${priceFormat(payment.sum)}`;
        return `${date} ${userInfo} ${sum}`;
    }

    getPaymentsHistory(order) {
        let history;
        let paymentsInfo;
        this.paymentSum = 0;
        if (order.payments) {
            this.paymentSum = 0;
            paymentsInfo = order.payments.map(payment => (
                <div key={payment.id}>{this.getPayment(payment)}</div>
            ));
        } else {
            paymentsInfo = <h5>Нет оплат</h5>
        }
        if (this.state.historyIsVisible) {
            history = (
                <div>
                    <h5>История</h5>
                    {paymentsInfo}
                </div>
            );
        } else {
            history = null;
        }
        return history;
    }

    getPaymentStatus(order) {
        let alert = null;

        // const orderSum = Number(order.sum);
        // const nowPay = Number(this.paymentSum);
        // const prepayment = Number(order.prepayment);

        switch (order.payment_status) {
            case (ORDER_PAYMENT_NO_PAYMENT_STATUS): {
                alert = (
                    <div className="alert alert-warning">Не оплачено</div>
                );
                break;
            }
            case (ORDER_PAYMENT_PREPAYMENT_STATUS): {
                alert = (
                    <div className="alert alert-primary">Предоплата внесена</div>
                );
                break;
            }
            case (ORDER_PAYMENT_FULL_STATUS): {
                alert = (
                    <div className="alert alert-success">Оплачено</div>
                );
                break;
            }
        }
        return alert;
    }

    render() {
        const {order} = this.props;

        const history = this.getPaymentsHistory(order);
        const paymentStatus = this.getPaymentStatus(order);

        return (
            <div className="c-card">
                <div className="row">
                    <div className="col-12">
                        <h5>Список оплат</h5>
                    </div>
                </div>

                <div className="row padding-row">
                    <div className="col-md-6">
                        <h6>Сумма: {priceFormat(order.sum)}</h6>
                        <h6>Предоплата: {priceFormat(order.prepayment)}</h6>
                    </div>
                    <div className="col-md-6">
                        <h6>Внесено с баланса: {priceFormat(this.paymentSum)}</h6>
                        <h6>Осталось внести: {priceFormat(order.sum - this.paymentSum)}</h6>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12">
                        {paymentStatus}
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6">
                        <button className="btn btn-sm btn-primary" onClick={this.props.addBalancePay}>Оплатить с
                            баланса клиента
                        </button>
                    </div>
                    <div className="col-md-6">
                        <button className="btn btn-sm btn-primary" onClick={this.historySwitch}>История списаний
                        </button>
                    </div>
                </div>

                <div className="row padding-row">
                    <div className="col-12">
                        {history}
                    </div>
                </div>
            </div>
        )
    }
}

export default OrderPaymentCard