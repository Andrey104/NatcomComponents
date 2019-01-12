import React from 'react';
import NavLink from 'react-router-dom/es/NavLink';
import history from '../history';

import './styles.css';
import {UsersService} from "../services/users.service";
import {saveOrderInfoInStore} from "../AC/orders";
import connect from "react-redux/es/connect/connect";
import {mapToArr} from "../helpers";

class Header extends React.Component {

    handleNewOrderButtonClick = () => {
        this.props.saveOrderInfoInStore(null);
        history.push(`/orders/add_order`);
    };

    render() {
        const {onMenuOpen} = this.props;
        return (
            <nav className="row navbar navbar-expand-md navbar-dark">
                <div onClick= {onMenuOpen} className="menu-icon-container">
                    <img className='menu-icon' src = "/public/menu.svg"/>
                </div>
                <NavLink className="navbar-brand" to='/'>Все полотна</NavLink>
                <button className="btn btn-primary"
                        onClick={this.handleNewOrderButtonClick}>Добавить заказ</button>
                <div className="collapse navbar-collapse" id="navbarsExampleDefault">
                    <ul className="navbar-nav mr-auto">
                    </ul>
                </div>
                <div className='user-info'>{UsersService.getUserInfo()}</div>
            </nav>
       )
    }
}

export default connect((state) => ({
    orders: mapToArr(state.orders.orders),
    isLoading: state.orders.isLoading,
    hasMoreOrders: state.orders.hasMoreOrders,
    orderSave: state.orders.orderSave
}), {saveOrderInfoInStore})(Header);