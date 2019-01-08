import React from 'react';
import PropTypes from 'prop-types';

import {getDate, priceFormat, userTypes} from '../../../../services/utils';
import './styles.css';
import {
    ORDER_PAYMENT_FULL_STATUS, ORDER_PAYMENT_NO_PAYMENT_STATUS,
    ORDER_PAYMENT_PREPAYMENT_STATUS
} from "../../../../constans";

export default class extends React.Component {
    paymentSum;

    static propTypes = {
        order: PropTypes.object,
        addBalancePay: PropTypes.func,
        returnBalancePay: PropTypes.func
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
                    <h6>История</h6>
                    {paymentsInfo}
                </div>
            );
        } else {
            history = null;
        }
        return history;
    }

    getPaymentStatus() {
        let alert = null;
        const {order} = this.props;
        const orderSum = Number(order.sum);
        const nowPay = Number(this.paymentSum);
        const prepayment = Number(order.prepayment);
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
        // if (nowPay >= orderSum) {
        //     alert = (
        //         <div className="alert alert-success">Оплачено</div>
        //     );
        // } else {
        //     if (nowPay >= prepayment) {
        //         alert = (
        //             <div className="alert alert-primary">Предоплата внесена</div>
        //         );
        //     } else {
        //         alert = null;
        //     }
        // }
        return alert;
    }

    render() {
        const {order} = this.props;
        const history = this.getPaymentsHistory(order);
        return (
            <div className="card">
                <h5>Список оплат</h5>
                <div className="row">
                    <div className="col-md-6">
                        <h6>Сумма: {priceFormat(order.sum)}</h6>
                        <h6>Предоплата: {priceFormat(order.prepayment)}</h6>
                    </div>
                    <div className="col-md-6">
                        <h6>Внесено с баланса: {priceFormat(this.paymentSum)}</h6>
                        <h6>Осталось внести: {priceFormat(order.sum - this.paymentSum)}</h6>
                    </div>
                </div>
                {this.getPaymentStatus()}
                <button onClick={this.props.addBalancePay}>Оплатить с баланса клиента</button>
                <button onClick={this.props.returnBalancePay}>Вернуть оплату на баланс</button>
                <button onClick={this.historySwitch}>История списаний</button>
                {history}
            </div>
        )
    }
}