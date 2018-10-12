import NavLink from "react-router-dom/es/NavLink";
import styles from "./styles.css"
import classNames from 'classnames/bind';
import React from 'react';
import {PC_DISPLAY} from "../services/utils";
import {UsersService} from "../services/users.service";

export default class extends React.Component {

    render() {
        const {isOpen, onMenuClose, mobile} = this.props;

        let adminBlock = null;
        if (UsersService.adminPermission()) {
            adminBlock = <div className='admin-block'>
                <ul className="nav flex-column">
                    <h4 className='title'>Администратор</h4>

                    <li className="nav-item">
                        <NavLink to='/users'
                                 onClick={onMenuClose}
                                 activeClassName='active-item'
                                 className="nav-link hovered">
                            <img className='icon' src='/public/stock.svg'/>
                            Пользователи
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to='/stocks'
                                 onClick={onMenuClose}
                                 activeClassName='active-item'
                                 className="nav-link hovered">
                            <img className='icon' src='/public/stock.svg'/>
                            Настройка складов
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to='/services'
                                 onClick={onMenuClose}
                                 activeClassName='active-item'
                                 className="nav-link hovered">
                            <img className='icon' src='/public/stock.svg'/>
                            Услуги
                        </NavLink>
                    </li>
                </ul>
            </div>
        }

        let standardBlock = null;
        if (UsersService.standardPermission()){
            standardBlock = <div className='standard-menu'>
                <ul className="nav flex-column">
                    <h4 className='title'>Основное</h4>

                    <h6 className='subtitle'>Товары</h6>
                    <li className="nav-item">
                        <NavLink to='/products'
                                 onClick={onMenuClose}
                                 activeClassName='active-item'
                                 className="nav-link hovered">
                            <img className='icon' src='/public/product.svg'/>
                            Обычные
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to='/membranes'
                                 onClick={onMenuClose}
                                 activeClassName='active-item'
                                 className="nav-link hovered">
                            <img className='icon' src='/public/stock.svg'/>
                            Полотна
                        </NavLink>
                    </li>
                    <h6 className='subtitle'>Заказы</h6>
                    <li className="nav-item">
                        <NavLink to='/harpoons'
                                 onClick={onMenuClose}
                                 activeClassName='active-item'
                                 className="nav-link hovered">
                            <img className='icon' src='/public/stock.svg'/>
                            Гарпуны
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to='/clients'
                                 onClick={onMenuClose}
                                 activeClassName='active-item'
                                 className="nav-link hovered">
                            <img className='icon' src='/public/client.svg'/>
                            Клиенты
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to='/orders'
                                 onClick={onMenuClose}
                                 activeClassName='active-item'
                                 className="nav-link hovered">
                            <img className='icon' src='/public/orders.svg'/>
                            Заказы
                        </NavLink>
                    </li>
                </ul>
            </div>
        }

        let managerBlock = null;
        if (UsersService.managerPermission()) {
            managerBlock =  <div className='manager-menu'>
                <ul className="nav flex-column">
                    <h4 className='title'>Менеджер</h4>

                    <li className="nav-item">
                        <NavLink to='/suppliers'
                                 onClick={onMenuClose}
                                 activeClassName='active-item'
                                 className="nav-link hovered">
                            <img className='icon' src='/public/stock.svg'/>
                            Поставщики
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to='/categories'
                                 onClick={onMenuClose}
                                 activeClassName='active-item'
                                 className="nav-link hovered">
                            <img className='icon' src='/public/stock.svg'/>
                            Категории
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to='/supplies'
                                 onClick={onMenuClose}
                                 activeClassName='active-item'
                                 className="nav-link hovered">
                            <img className='icon' src='/public/supply.svg'/>
                            Поставки
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to='/payments'
                                 onClick={onMenuClose}
                                 activeClassName='active-item'
                                 className="nav-link hovered">
                            <img className='icon' src='/public/payment.svg'/>
                            Оплаты
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to='/assemblies'
                                 onClick={onMenuClose}
                                 activeClassName='active-item'
                                 className="nav-link hovered">
                            <img className='icon' src='/public/stock.svg'/>
                            Сборки
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to='/transfer_requests'
                                 onClick={onMenuClose}
                                 activeClassName='active-item'
                                 className="nav-link hovered">
                            <img className='icon' src='/public/stock.svg'/>
                            Запросы на перевозку
                        </NavLink>
                    </li>
                </ul>
            </div>
        }

        let mainManagerBlock = null;
        if (UsersService.mainManagerPermission()) {
            mainManagerBlock = <div className='main-manager-menu'>
                <ul className="nav flex-column">
                    <h4 className='title'>Руководитель</h4>

                    <li className="nav-item">
                        <NavLink to='/cars'
                                 onClick={onMenuClose}
                                 activeClassName='active-item'
                                 className="nav-link hovered">
                            <img className='icon' src='/public/stock.svg'/>
                            Машины
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to='/drivers'
                                 onClick={onMenuClose}
                                 activeClassName='active-item'
                                 className="nav-link hovered">
                            <img className='icon' src='/public/stock.svg'/>
                            Водители
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to='/recipes'
                                 onClick={onMenuClose}
                                 activeClassName='active-item'
                                 className="nav-link hovered">
                            <img className='icon' src='/public/stock.svg'/>
                            Настройка сборок
                        </NavLink>
                    </li>
                </ul>
            </div>
        }

        let otherBlock = <div className='other-menu'>
            <ul className="nav flex-column">
                <h4 className='title'>Прочее</h4>

                <li className="nav-item">
                    <NavLink to='/login'
                             onClick={onMenuClose}
                             activeClassName='active-item'
                             className="nav-link hovered">
                        <img className='icon' src='/public/stock.svg'/>
                        Выход
                    </NavLink>
                </li>
            </ul>
        </div>

        return (
            <div className={classNames({
                    'menu-container': true,
                    'visible': (isOpen && !mobile),
                    'hidden': (!isOpen && !mobile),
                    'col-1 col-md-2': !mobile,
                    'mobile-visible': (mobile && isOpen),
                    'mobile-hidden': (mobile && !isOpen),
                }
            )}>
                <div className={classNames({
                        'visible': mobile,
                        'hidden': !mobile,
                        'menu-header': true
                    }
                )}>
                    <NavLink className='nav-link' to='/'
                             onClick={onMenuClose}>
                        <h6>Все полотна</h6>
                    </NavLink>
                </div>
                {standardBlock}
                {managerBlock}
                {mainManagerBlock}
                {adminBlock}
                {otherBlock}
            </div>
        )
    }
}
