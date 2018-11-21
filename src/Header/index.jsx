import React from 'react';
import NavLink from 'react-router-dom/es/NavLink';

import './styles.css';
import {UsersService} from "../services/users.service";

export default class Header extends React.Component {


    render() {
        const {onMenuOpen} = this.props;
        return (
            <nav className="row navbar navbar-expand-md navbar-dark">
                <div onClick= {onMenuOpen} className="menu-icon-container">
                    <img className='menu-icon' src = "/public/menu.svg"/>
                </div>
                <NavLink className="navbar-brand" to='/'>Все полотна</NavLink>
                <div className="collapse navbar-collapse" id="navbarsExampleDefault">
                    <ul className="navbar-nav mr-auto">
                    </ul>
                </div>
                <div className='user-info'>{UsersService.getUserInfo()}</div>
            </nav>
       )
    }
}