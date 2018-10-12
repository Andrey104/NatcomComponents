import React from 'react';

import {getDate, orderStatuses} from '../../../../../services/utils';
import history from '../../../../../history';

export default class extends React.Component {

    handleClick = orderId => () => history.push(`/orders/${orderId}`);

    render() {
        const {order, number} = this.props;
        return (
            <tr onClick={this.handleClick(order.id)}>
                <td scope="row">{number}</td>
                <td>{order.client.first_name} {order.client.last_name}</td>
                <td>{order.stock.name}</td>
                <td>{getDate(order.date)}</td>
                <td>{orderStatuses[order.status]}</td>
            </tr>
        );
    }
}