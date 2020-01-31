import React from 'react';
import {NavLink} from 'react-router-dom';
import {getPhoneWithMask, priceFormat} from "../services/utils";
import ClientPaymentDialog from '../components/payment/ClientPaymentDialog/index'
import PropTypes from 'prop-types';
import {getOrder} from "../Content/orders/store/actions/orders";
import connect from "react-redux/es/connect/connect";
import history from '../history';
import OrderInfoPrint from './OrderInfoPrint'
import TableOrderInfoPrint from './TableOrderInfoPrint'
import Loader from '../components/Loader'

class OrderPrintPage extends React.Component {

    componentDidMount() {
        this.urlId = this.props.match.params.orderId;
        this.props.getOrder(this.urlId);
    };

    handleBackButtonClick = () => {
        const {order} = this.props;
        history.push(`/orders/${order.id}`);
    };

    handlePrintButtonClick = () => {
        window.print();
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
            <div className="container">
                {/*<img className='logo' src='/public/logo.jpg'/>*/}
                <div className="d-print-none col-12">
                    <hr/>
                    <button onClick={this.handleBackButtonClick}
                            className="btn btn-secondary">Назад
                    </button>
                    <button onClick={this.handlePrintButtonClick}
                            className="btn btn-primary">Печать
                    </button>
                    <hr/>
                </div>
                <OrderInfoPrint order={order}/>
                <TableOrderInfoPrint order={order}/>
            </div>
        )
    }
}

export default connect((state) => ({
    order: state.orders.order,
}), {getOrder})(OrderPrintPage);