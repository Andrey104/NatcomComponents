import React from 'react';
import {connect} from 'react-redux';

import OrderInfo from './OrderInfo/OrderInfo';
import OrderClientCard from '../../../components/OrderClientCard'
import TableOrderInfo from './TableOrderInfo/TableOrderInfo';
import ChangeOrderStatus from './changeOrderStatus/ChangeOrderStatus';
import OrderPayments from './OrderPaymentsCard/OrderPaymentCard';
import RejectOrder from './rejectOrder/RejectOrder';
import Loader from '../../../components/Loader';
import {getOrder, saveOrderInfoInStore} from '../../../AC/orders';
import {getItemsInfo} from '../../../AC/items';
import {getItemsInfoParams} from '../../../services/utils';
import history from '../../../history';
import AddPaymentDialog from "./addPaymentDialog/AddPaymentDialog";

class OrderDetail extends React.Component {
    urlId;

    constructor(props) {
        super(props);
        this.state = {
            balancePayDialogIsOpen: false,
        };
    }

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
        if (order.status < 4) {
            return (
                <button type="button"
                        onClick={this.openEditOrder}
                        className="btn btn-primary btn-sm detail-btn">Редактировать
                </button>
            )
        }
    }

    updateOrder = () => {
        this.props.getOrder(this.urlId);
    };

    openBalancePayDialog = () => {
        this.setState({
            balancePayDialogIsOpen: true
        });
    };

    closeBalancePayDialog = () => {
        this.setState({
            balancePayDialogIsOpen: false
        });
    };


    getBalancePayDialog() {
        if (this.state.balancePayDialogIsOpen) {
            return (
                <AddPaymentDialog header={'Списать с баланса клиента'}
                                  order={this.props.order}
                                  update={this.updateOrder}
                                  close={this.closeBalancePayDialog}/>
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
            <div className="row">
                {this.getBalancePayDialog()}
                <div className="col-md-6">
                    <OrderInfo order={order}/>
                </div>
                <div className="col-md-6">
                    <OrderClientCard client={order.client}
                                     order={order}
                                     update={this.updateOrder}/>
                    <OrderPayments order={order}
                                   addBalancePay={this.openBalancePayDialog}/>
                </div>
                <div className="col-12">
                    <div className="c-card">
                        <TableOrderInfo order={order}/>
                        <div className="row">
                            <div className="col-12 text-right">
                                <ChangeOrderStatus order={order}
                                                   update={this.updateOrder}/>
                                <RejectOrder order={order}/>
                                {this.getEditOrderBtn(order)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect((state) => ({
    order: state.orders.order,
}), {getOrder, saveOrderInfoInStore, getItemsInfo})(OrderDetail);