import React from 'react';

import {getDate, orderPaymentStatuses, orderStatuses, priceFormat} from '../../../../../services/utils';
import history from '../../../../../history';
import {ORDER_PAYMENT_FULL_STATUS} from "../../../../../constans";
import './styles.css';

export default class extends React.Component {

    handleClick = orderId => () => history.push(`/orders/${orderId}`);

    getOrderCardStyles(order) {
        if (order.payment_status === ORDER_PAYMENT_FULL_STATUS) {
            return 'full-payment'
        }
    }

    render() {
        const {order, number} = this.props;
        return (
            <tr className={this.getOrderCardStyles(order)} onClick={this.handleClick(order.id)}>
                <td scope="row">{order.id}</td>
                <td>{order.client.first_name} {order.client.last_name}</td>
                <td>{order.stock.name}</td>
                <td>{getDate(order.date)}</td>
                <td>{orderStatuses[order.status]}</td>
                <td>{orderPaymentStatuses[order.payment_status]}</td>
                <td>{priceFormat(order.sum)}</td>
            </tr>
        );
    }
}