import React from 'react';

import {getDate, moneyFormat, userTypes} from '../../../../services/utils';
import './styles.css';

export default class extends React.Component {
    paymentSum;

    getPayment(payment) {
        const {user} = payment;
        this.paymentSum += Number(payment.sum);
        const date = getDate(payment.auto_date);
        const userInfo = `${user.first_name} ${user.last_name}(${userTypes[user.type]})`;
        const sum = `внес на оплату: ${moneyFormat(payment.sum)}`;
        return `${date} ${userInfo} ${sum}`;
    }

    getPaymentsInfo(order) {
        let paymentsInfo;
        if (order.payments) {
            this.paymentSum = 0;
            paymentsInfo = order.payments.map(payment => (
                <div key={payment.id}>{this.getPayment(payment)}</div>
            ));
        } else {
            paymentsInfo = <h5>Нет оплат</h5>
        }
        return paymentsInfo;
    }

    render() {
        const {order} = this.props;
        const paymentsInfo = this.getPaymentsInfo(order);
        return (
            <div className="col-11">
                <h5>Список оплат</h5>
                <h6>Оплачено: {moneyFormat(this.paymentSum)}</h6>
                <h6>Остаток: {moneyFormat(order.sum - this.paymentSum)}</h6>
                <div className="payments-info">
                    {paymentsInfo}
                </div>
            </div>
        )
    }
}