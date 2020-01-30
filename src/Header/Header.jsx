import React from 'react';
import NavLink from 'react-router-dom/es/NavLink';
import history from '../history';

import './Header.css';
import {saveOrderInfoInStore} from "../AC/orders";
import connect from "react-redux/es/connect/connect";
import {mapToArr} from "../helpers";
import {UsersService} from "../services/users.service";

class Header extends React.Component {

    handleNewOrderButtonClick = () => {
        this.props.saveOrderInfoInStore(null);
        history.push(`/orders/add_order`);
    };

    getAddOrderButton = (mobile) => {
        if (!mobile) {
            return(
                <button className="classic-button"
                        onClick={this.handleNewOrderButtonClick}>Добавить заказ
                </button>
            )
        }
    };

    render() {
        const {onMenuOpen, mobile} = this.props;
        return (
            <nav className="row navbar navbar-expand-md navbar-dark">
                <div onClick={onMenuOpen} className="menu-icon-container">
                    <img className='menu-icon'
                         src="/public/menu.svg"
                         alt='menu'/>
                </div>
                <NavLink className="navbar-brand" to='/'>Все полотна</NavLink>
                {this.getAddOrderButton(mobile)}
                <div className="collapse navbar-collapse"
                     id="navbarsExampleDefault">
                    <ul className="navbar-nav mr-auto">
                    </ul>
                </div>
                <div className='header-user-info'>{UsersService.getUserInfo()}</div>
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