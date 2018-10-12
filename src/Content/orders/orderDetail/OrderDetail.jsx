import React from 'react';
import {connect} from 'react-redux';

import OrderInfo from './OrderInfo';
import TableOrderInfo from './TableOrderInfo';
import ChangeOrderStatus from './changeOrderStatus/ChangeOrderStatus';
import OrderPayments from './OrderPayments';
import RejectOrder from './rejectOrder/RejectOrder';
import Loader from '../../../components/Loader';
import {getOrder, saveOrderInfoInStore} from '../../../AC/orders';
import {getItemsInfo} from '../../../AC/items';
import {getItemsInfoParams} from '../../../services/utils';
import history from '../../../history';
import './styles.css';

class OrderDetail extends React.Component {
    urlId;

    componentWillMount = () => {
        this.urlId = this.props.match.params.orderId;
        this.props.getOrder(this.urlId);
    };

    openEditOrder = () => {
        const {order} = this.props;
        if (order.items.length) {
            const params = getItemsInfoParams(order.items);
            this.props.getItemsInfo(this.urlId, params);
        } else {
            history.push(`/orders/${order.id}/edit`);
        }
    };

    getEditOrderBtn(order) {
        if (order.status !== 3) {
            return (
                <button type="button"
                        onClick={this.openEditOrder}
                        className="btn btn-primary btn-sm detail-btn">Редактировать
                </button>
            )
        }
    }

    render() {
        const {order} = this.props;
        if (order.id !== Number(this.urlId)) {
            return (
                <div>
                    <Loader/>
                </div>
            );
        }
        return (
            <div className="col-12">
                <OrderInfo order={order}/>
                <TableOrderInfo order={order}/>
                <OrderPayments order={order}/>
                <div className="col-12 text-right">
                    <ChangeOrderStatus order={order}/>
                    <RejectOrder order={order}/>
                    {this.getEditOrderBtn(order)}
                </div>
            </div>
        )
    }
}

export default connect((state) => ({
    order: state.orders.order,
}), {getOrder, saveOrderInfoInStore, getItemsInfo})(OrderDetail);