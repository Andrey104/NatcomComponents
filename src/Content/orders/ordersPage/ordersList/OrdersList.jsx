import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import Loader from '../../../../components/Loader/index';
import AddButton from '../../../../components/AddButton/index';
import OrderCard from './OrderCard/index';
import InfiniteScrollOverride from '../../../../services/InfiniteScrollOverride';
import {
    getAllOrders, getNextOrders, incrementOrdersPage, resetPage, saveOrderInfoInStore,
    setOrdersDate
} from '../../store/actions/orders';
import {mapToArr} from '../../../../helpers';
import history from '../../../../history';

class OrdersList extends React.Component {
    page;
    static propTypes = {
        client: PropTypes.object,
    };

    constructor(props) {
        super(props);
        this.page = 1;
    }

    componentWillMount = () => {
        const {getAllOrders} = this.props;
        if (this.props.client) {
            setOrdersDate(null);
            getAllOrders(`?client=${this.props.client.id}`);
        } else {
            if (this.props.ordersDate){
                getAllOrders(`?date=${this.props.ordersDate}`);
            } else {
                getAllOrders();
            }
        }
    };

    loadOrders = () => {
        this.props.getNextOrders(this.props.nextPage, this.props.client, this.props.ordersDate);
    };

    addNewOrder = () => {
        if (this.props.orderSave !== null && this.props.orderSave !== undefined) {
            let isContinue = confirm("Продолжить редактирование заказа?");
            if (!isContinue) {
                this.props.saveOrderInfoInStore(null);
            }
        }
        history.push(`/orders/add_order`);
    };


    getBody(orders) {
        let ordersList;
        if (orders.length !== 0) {
            ordersList = orders.map((order, index) => {
                return (
                    <OrderCard key={order.id}
                               order={order}
                               number={++index}/>
                )
            })
        } else {
            ordersList = (
                <tr>
                    <td colSpan='7'>Нет заказов</td>
                </tr>
            )
        }
        return ordersList;
    }

    render() {
        const {isLoading, orders, hasMoreOrders} = this.props;
        if (isLoading && orders.length === 0) {
            return (
                <div className="pre-loader-container">
                    <Loader/>
                </div>
            );
        }
        const loader = hasMoreOrders ? <Loader/> : false;
        this.getBody(orders);
        return (
            <div className="row">
                <div className="col-12">
                    <InfiniteScrollOverride
                        pageStart={1}
                        loadMore={this.loadOrders}
                        hasMore={hasMoreOrders}
                        isDialog={true}
                        useWindow={false}>
                        <div className="row">
                            <div className="col-12">
                                <table className="table table-hover table-bordered">
                                    <thead className="thead">
                                    <tr>
                                        <th scope="col">№</th>
                                        <th scope="col">Клиент</th>
                                        <th scope="col">Склад</th>
                                        <th scope="col">Дата выдачи</th>
                                        <th scope="col">Статус</th>
                                        <th scope="col">Оплата</th>
                                        <th scope="col">Сумма</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {this.getBody(orders)}
                                    </tbody>
                                </table>
                                {loader}
                                <AddButton openAdd={this.addNewOrder}/>
                            </div>
                        </div>
                    </InfiniteScrollOverride>
                </div>
            </div>
        )
    }
}

export default connect((state) => ({
    orders: mapToArr(state.orders.orders),
    isLoading: state.orders.isLoading,
    hasMoreOrders: state.orders.hasMoreOrders,
    orderSave: state.orders.orderSave,
    nextPage: state.orders.nextPageNumber,
    ordersDate: state.orders.date,
}), {getAllOrders, getNextOrders, saveOrderInfoInStore, setOrdersDate})(OrdersList);