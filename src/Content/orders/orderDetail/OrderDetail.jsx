import React from 'react';
import {connect} from 'react-redux';

import OrderInfo from './OrderInfo';
import OrderClientCard from '../../../components/OrderClientCard'
import TableOrderInfo from './TableOrderInfo';
import ChangeOrderStatus from './changeOrderStatus/ChangeOrderStatus';
import OrderPayments from './OrderPaymentsCard';
import RejectOrder from './rejectOrder/RejectOrder';
import Loader from '../../../components/Loader';
import {getOrder, saveOrderInfoInStore} from '../../../AC/orders';
import {getItemsInfo} from '../../../AC/items';
import {getItemsInfoParams} from '../../../services/utils';
import history from '../../../history';
import './styles.css';
import AddPaymentDialog from "./addPaymentDialog/AddPaymentDialog";

class OrderDetail extends React.Component {
    urlId;

    constructor(props) {
        super(props);
        this.state = {
            balancePayDialogIsOpen: false,
            balancePayReturnDialogIsOpen: false,
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

    openBalancePayReturnDialog = () => {
        this.setState({
            balancePayReturnDialogIsOpen: true
        });
    };

    closeBalancePayReturnDialog = () => {
        this.setState({
            balancePayReturnDialogIsOpen: false
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

    getBalancePayReturnDialog() {
        if (this.state.balancePayDialogIsOpen) {
            return (
                <AddPaymentDialog header={'Списать с баланса клиента'}
                                  order={this.props.order}
                                  update={this.updateOrder}
                                  close={this.closeBalancePayDialog}/>
            )
        }
    }

    handlePrintButtonClick = () => {
        history.push(`/print/${this.props.order.id}`);
    };

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
                    <button onClick={this.handlePrintButtonClick}>На печать</button>
                    <OrderInfo order={order}/>
                </div>
                <div className="col-md-6">
                    <OrderClientCard client={order.client}
                                     update={this.updateOrder}/>
                    <OrderPayments order={order}
                                   addBalancePay={this.openBalancePayDialog}
                                   returnBalancePay={this.openBalancePayReturnDialog}/>
                </div>
                <div className="col-12">
                    <TableOrderInfo order={order}/>
                </div>
                <div className="col-12 text-right">
                    <ChangeOrderStatus order={order}
                                       update={this.updateOrder}/>
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