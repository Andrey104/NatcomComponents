import React from 'react';
import axios from 'axios';

import './Login.css';
import {baseUrl} from "../services/base";
import Logo from "../Menu/Logo/Logo";


export default class extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            errorMessage: ''
        };
    }

    handleChangeUsername = event => {
        this.setState({username: event.target.value});
    };

    handleChangePassword = event => {
        this.setState({password: event.target.value});
    };


    // TODO: Вынести в action
    handleSubmit = event => {
        event.preventDefault();
        const user = {
            username: this.state.username,
            password: this.state.password
        };
        axios
            .post(baseUrl + `login/`, user)
            .then(res => {
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('user_id', res.data.id);
                localStorage.setItem('user_type', res.data.type);
                localStorage.setItem('user_first_name', res.data.first_name);
                localStorage.setItem('user_last_name', res.data.last_name);
                this.props.history.push(`/orders`)
            }).catch(() => {
            this.setState({errorMessage: 'Неверный логин или пароль'});
        })
    };

    getDisabledState() {
        return !this.state.username || !this.state.password;
    }

    render() {
        return (
            <div className='login-main-page'>
                <div className="container login">
                    <Logo/>
                    <form onSubmit={this.handleSubmit} className="login-form">
                        <h4 className='login-title'>Авторизация</h4>
                        <div className="login-row form-group row">
                            <label className="col-sm-2 col-form-label">Логин</label>
                            <div className="col-sm-10">
                                <input type="text"
                                       name="name"
                                       className="form-control"
                                       onChange={this.handleChangeUsername}/>
                            </div>
                        </div>
                        <div className="password-row form-group row">
                            <label className="col-sm-2 col-form-label">Пароль</label>
                            <div className="col-sm-10">
                                <input type="password"
                                       name="password"
                                       className="form-control"
                                       onChange={this.handleChangePassword}/>
                            </div>
                        </div>
                        {this.state.errorMessage}
                        <div className="row">
                            <div className="col-12">
                                <button type="submit"
                                        disabled={this.getDisabledState()}
                                        className="btn btn-primary btn-block">Войти
                                </button>
                            </div>
                        </div>
                        <br/>
                        <div className="row">
                            <div className="col-12">
                                <p className='text-center'>NextFormat studio © 2018-2020</p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}