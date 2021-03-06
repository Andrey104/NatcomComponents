import React from 'react';
import {NavLink} from 'react-router-dom';

import {orderStatuses, getDate} from '../../../../services/utils';
import {
    ORDER_ASSEMBLE_STATUS, ORDER_CONFIRM_STATUS, ORDER_DRAFT_STATUS, ORDER_FINAL_STATUS,
    ORDER_READY_STATUS
} from "../../../../constans";

export default class extends React.Component {

    getStatus() {
        const {order} = this.props;
        let s = null;

        switch (order.status) {
            case ORDER_DRAFT_STATUS: {
                s = (<div className="alert alert-warning">{orderStatuses[order.status]}</div>);
                break;
            }
            case ORDER_CONFIRM_STATUS: {
                s = (<div className="alert alert-secondary">{orderStatuses[order.status]}</div>);
                break;
            }
            case ORDER_ASSEMBLE_STATUS: {
                s = (<div className="alert alert-secondary">{orderStatuses[order.status]}</div>);
                break;
            }
            case ORDER_READY_STATUS: {
                s = (<div className="alert alert-success">{orderStatuses[order.status]}</div>);
                break;
            }
            case ORDER_FINAL_STATUS: {
                s = (<div className="alert alert-dark">{orderStatuses[order.status]}</div>);
                break;
            }
        }

        if (order.return_order === true) {
            s = (<div className="alert alert-danger">ВОЗВРАТ!</div>);
        }
        return s;
    }

    render() {
        const {order} = this.props;
        return (
            <div>
                <h4>№ {order.id}</h4>
                <div>Статус: {this.getStatus()}</div>
                <div>Склад: {order.stock.name}</div>
                <div>Дата выдачи: {getDate(order.date)}</div>
                <div>Комментарий: {order.comment}</div>
            </div>
        )
    }
}