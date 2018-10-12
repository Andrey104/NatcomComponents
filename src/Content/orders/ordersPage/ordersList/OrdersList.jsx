import React from 'react';
import {connect} from 'react-redux';

import Loader from '../../../../components/Loader/index';
import AddButton from '../../../../components/AddButton/index';
import OrderCard from './OrderCard/index';
import InfiniteScrollOverride from '../../../../services/InfiniteScrollOverride';
import {getAllOrders, getNextOrders} from '../../../../AC/orders';
import {mapToArr} from '../../../../helpers';
import history from '../../../../history';

class OrdersList extends React.Component {

    componentWillMount = () => {
        const {date, getAllOrders} = this.props;
        getAllOrders(`?date=${date}`);
    };

    loadOrders = page => this.props.getNextOrders(page);

    addNewOrder = () => history.push(`/orders/add_order`);

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
                    <td colSpan='5'>Нет заказов</td>
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
                        useWindow={false}>
                        <div className="row">
                            <div className="col-12">
                                <table className="table table-hover table-bordered">
                                    <thead className="thead-light">
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Клиент</th>
                                        <th scope="col">Склад</th>
                                        <th scope="col">Дата</th>
                                        <th scope="col">Статус</th>
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
    hasMoreOrders: state.orders.hasMoreOrders
}), {getAllOrders, getNextOrders})(OrdersList);