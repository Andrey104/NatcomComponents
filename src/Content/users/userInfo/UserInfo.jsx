import React from 'react';
import MaskedInput from 'react-text-mask';
import {connect} from 'react-redux';

import Loader from '../../../components/Loader';
import {phoneMask, userTypes, getPhoneWithoutMask} from '../../../services/utils';
import {getAllStocks} from '../../../AC/stocks';
import {mapToArr} from '../../../helpers';

class UserInfo extends React.Component {
    stock;

    constructor(props) {
        super(props);
        const {user} = this.props;
        if (user) {
            this.state = user;
            // исправить
            this.state.stock = user.stock ? user.stock.id : 10;
        } else {
            this.state = {
                username: '',
                password: '',
                type: 0,
                first_name: '',
                last_name: '',
                email: '',
                phone: '',
                telegram: '',
                stock: null
            }
        }
    }

    componentWillMount = () => this.props.getAllStocks();

    handleChangeUserState = event => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({[name]: value});
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const {stocks} = this.props;
        const defaultStock = stocks[0].id;
        let newUser = this.state;
        if (newUser.stock === null) newUser.stock = defaultStock;
        newUser.phone = getPhoneWithoutMask(newUser.phone);
        newUser.telegram = getPhoneWithoutMask(newUser.telegram);
        this.props.handleSubmit(newUser);
    };

    checkForm() {
        const {username, first_name, last_name, email, phone} = this.state;
        if (!username || !first_name || !last_name || !email || !phone) {
            return true;
        }
        return false;
    }

    getPasswordField() {
        const {user} = this.props;
        if (!user) {
            return (
                <div className="form-group">
                    <label htmlFor="password"
                           className="required-area">Пароль</label>
                    <input type="password"
                           name="password"
                           placeholder="Введите пароль пользователя"
                           defaultValue={this.state.password}
                           onChange={this.handleChangeUserState}
                           className="form-control"
                           id="password"/>
                </div>
            )
        }
    }

    getUserTypes() {
        return (
            <div className="form-group">
                <label className="required-area">Роль пользователя</label>
                <select className="form-control"
                        name="type"
                        onChange={this.handleChangeUserState}
                        defaultValue={this.state.type}>
                    {userTypes.map((type, index) => (
                        <option value={index}
                                key={type}>{type}</option>
                    ))}
                </select>
            </div>
        )
    }

    getStocks(stocks) {
        return (
            <div className="form-group">
                <label className="required-area">Склад</label>
                <select className="form-control"
                        name="stock"
                        onChange={this.handleChangeUserState}
                        defaultValue={this.state.stock || stocks[0].id}>
                    {stocks.map(stock => (
                        <option value={stock.id}
                                key={stock.id}>{stock.name}</option>
                    ))}
                </select>
            </div>
        )
    }

    getBtnText() {
        const {user} = this.props;
        return user ? 'Редактировать' : 'Добавить';
    }

    getBody(stocks) {
        if (stocks.length > 0) {
            return (
                <form onSubmit={this.handleSubmit}>
                    <div className="row">
                        <div className="col-6">
                            <div className="form-group">
                                <label htmlFor="login"
                                       className="required-area">Логин</label>
                                <input type="text"
                                       name="username"
                                       placeholder="Введите логин пользователя"
                                       defaultValue={this.state.username}
                                       onChange={this.handleChangeUserState}
                                       className="form-control"
                                       id="login"/>
                            </div>
                            {this.getPasswordField()}
                            <div className="form-group">
                                <label htmlFor="email"
                                       className="required-area">Email</label>
                                <input type="email"
                                       name="email"
                                       placeholder="Введите email пользователя"
                                       defaultValue={this.state.email}
                                       onChange={this.handleChangeUserState}
                                       className="form-control"
                                       id="email"/>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="form-group">
                                <label htmlFor="firstName"
                                       className="required-area">Имя</label>
                                <input type="text"
                                       name="first_name"
                                       placeholder="Введите имя пользователя"
                                       defaultValue={this.state.first_name}
                                       onChange={this.handleChangeUserState}
                                       className="form-control"
                                       id="firstName"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="lastName"
                                       className="required-area">Фамилия</label>
                                <input type="text"
                                       name="last_name"
                                       placeholder="Введите фамилию пользователя"
                                       defaultValue={this.state.last_name}
                                       onChange={this.handleChangeUserState}
                                       className="form-control"
                                       id="lastName"/>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <div className="form-group">
                                <label htmlFor="phone"
                                       className="required-area">Телефон</label>
                                <MaskedInput type="text"
                                             name="phone"
                                             placeholder="Введите телефон пользователя"
                                             mask={phoneMask}
                                             defaultValue={this.state.phone}
                                             onChange={this.handleChangeUserState}
                                             className="form-control"
                                             id="phone"/>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="form-group">
                                <label htmlFor="telegram">Телеграм</label>
                                <MaskedInput type="text"
                                             name="telegram"
                                             placeholder="Введите телеграм пользователя"
                                             mask={phoneMask}
                                             defaultValue={this.state.telegram}
                                             onChange={this.handleChangeUserState}
                                             className="form-control"
                                             id="telegram"/>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">{this.getUserTypes()}</div>
                        <div className="col-6">{this.getStocks(stocks)}</div>
                    </div>
                    <div className="col-sm-12 text-right">
                        <button type="submit"
                                disabled={this.checkForm()}
                                className="btn btn-primary pull-right">{this.getBtnText()}
                        </button>
                    </div>
                </form>
            )
        }
        return <h3>Нельзя добавить пользователя, так как нет ни одного склада</h3>
    }

    render() {
        const {isLoading, stocks} = this.props;
        if (isLoading && stocks.length === 0) {
            return (
                <div className="pre-loader-container">
                    <Loader/>
                </div>
            );
        }
        return (
            <div>
                {this.getBody(stocks)}
            </div>
        )
    }

}

export default connect((state) => ({
    stocks: mapToArr(state.stocks.stocks),
    isLoading: state.stocks.isLoading,
}), {getAllStocks})(UserInfo);