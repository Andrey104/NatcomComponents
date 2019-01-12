import React from 'react';
import {NavLink} from 'react-router-dom';

import {orderStatuses, getDate} from '../../services/utils';
import {
    ORDER_ASSEMBLE_STATUS, ORDER_CONFIRM_STATUS, ORDER_DRAFT_STATUS, ORDER_FINAL_STATUS,
    ORDER_READY_STATUS
} from "../../constans";

export default class extends React.Component {
    render() {
        const {order} = this.props;
        return (
            <div className='row'>
                <div className="col-md-6">
                    <h4>№ {order.id}</h4>
                    <h4>{order.client.first_name} {order.client.last_name}</h4>
                </div>
                <div className="col-md-6">
                    {/*<div>Склад: {order.stock.name}</div>*/}
                    <div>Дата выдачи: {getDate(order.date)}</div>
                    <div>Комментарий: {order.comment}</div>
                </div>
            </div>
        )
    }
}