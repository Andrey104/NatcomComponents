import React from 'react';
import Switch from 'react-router-dom/es/Switch';
import Route from 'react-router-dom/es/Route';
import NavLink from 'react-router-dom/es/NavLink';
import {connect} from 'react-redux';

import ComponentMenu from '../../components/ComponentMenu';
import OrdersPage from './ordersPage/OrdersPage';
import AddNewOrder from './addNewOrder/AddNewOrder';
import AddOrEditHarpoon from './orderCreate/addOrEditHarpoon/AddOrEditHarpoon';
import OrderDetail from './orderDetail/OrderDetail';
import EditOrder from './editOrder/EditOrder';
import {orderStatuses} from '../../services/utils';

class OrdersRouter extends React.Component {

    getMenu() {
        let menu = (
            <NavLink to='/orders'>
                <span>Заказы</span>
            </NavLink>
        );
        const urlId = this.props.match.params.orderId;
        const {order} = this.props;
        const isAddHarpoon = this.props.match.url.indexOf('add_harpoon') !== -1;
        const isEditOrder = this.props.match.url.indexOf('edit') !== -1;
        if (this.props.match.url.indexOf('add_order') !== -1) {
            const name = isAddHarpoon
                ? <NavLink to={`/orders/add_order`}>Новый заказ</NavLink>
                : <span>Новый заказ</span>;
            menu = (
                <ComponentMenu menu={menu} name={name}/>
            );
        }
        if (isAddHarpoon) {
            menu = (
                <ComponentMenu menu={menu} name='Новый гарпун'/>
            );
        }
        if (Number(urlId) === order.id) {
            const name = isEditOrder
                ? <NavLink to={`/orders/${order.id}`}>{orderStatuses[order.status]}</NavLink>
                : <span>{orderStatuses[order.status]}</span>;
            menu = (
                <ComponentMenu menu={menu} name={name}/>
            );
        }
        if (isEditOrder) {
            menu = (
                <ComponentMenu menu={menu} name='Редактирование'/>
            );
        }
        return menu;
    }

    render() {
        const menu = this.getMenu();
        return (
            <div>
                <div className="breadcrumbs">
                    {menu}
                </div>
                <Switch>
                    <Route exact path='/orders' component={OrdersPage}/>
                    <Route exact path='/orders/add_order' component={AddNewOrder}/>
                    <Route exact path='/orders/add_order/add_harpoon' component={AddOrEditHarpoon}/>
                    <Route exact path='/orders/:orderId' component={OrderDetail}/>
                    <Route exact path='/orders/:orderId/edit' component={EditOrder}/>
                </Switch>
            </div>
        )
    }
}

export default connect((state) => ({
    order: state.orders.order,
}))(OrdersRouter);