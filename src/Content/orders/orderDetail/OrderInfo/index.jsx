import React from 'react';
import {NavLink} from 'react-router-dom';

import {orderStatuses, getDate} from '../../../../services/utils';

export default class extends React.Component {
    render() {
        const {order} = this.props;
        return (
            <div>
                <div>Статус: {orderStatuses[order.status]}</div>
                <div>Склад: {order.stock.name}</div>
                <NavLink to={'/clients/' + order.id}>
                    {order.client.first_name} {order.client.last_name}
                </NavLink>
                <div>Дата: {getDate(order.date)}</div>
                <div>Комментарий: {order.comment}</div>
            </div>
        )
    }
}