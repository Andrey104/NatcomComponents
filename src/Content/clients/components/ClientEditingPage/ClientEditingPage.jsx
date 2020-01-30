import React, {Component} from 'react';
import MaskedInput from 'react-text-mask';

import {phoneMask, getPhoneWithoutMask, getPhoneWithMask} from '../../../../services/utils';

export default class ClientEditingPage extends Component {
    btnText = 'Добавить';

    constructor(props) {
        super(props);
        const {client} = props;
        if (client) {
            this.state = {
                first_name: client.first_name,
                last_name: client.last_name,
                phone1: getPhoneWithMask(client.phone1),
                phone2: client.phone2 ? getPhoneWithMask(client.phone2) : '',
                email: client.email ? client.email : ''
            };
            this.btnText = 'Изменить';
        } else {
            this.state = {
                first_name: '',
                last_name: '',
                phone1: '',
                phone2: '',
                email: ''
            };
        }
    };

    handleChangeClientState = event => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({[name]: value});
    };

    handleSubmit = event => {
        event.preventDefault();
        const newClient = this.getClient(this.state);
        this.props.handleSubmit(newClient);
    };

    getClient() {
        let newClient = this.state;
        if (!newClient.email) newClient.email = null;
        newClient.phone1 = getPhoneWithoutMask(newClient.phone1);
        newClient.phone2 = newClient.phone2 ? getPhoneWithoutMask(newClient.phone2) : null;
        return newClient;
    };

    getDisabledState() {
        if (!this.state.first_name || !this.state.last_name) {
            return true;
        } else if (getPhoneWithoutMask(this.state.phone1).length < 10) {
            return true;
        } else if (this.state.phone2) {
            if (getPhoneWithoutMask(this.state.phone2).length < 10) {
                return true;
            }
        }
        return false;
    };

    render() {
        return (
            <div>
                <div className="form-group">
                    <label htmlFor="first_name"
                           className="required-area">Имя</label>
                    <input type="text"
                           name="first_name"
                           placeholder="Введите имя клиента"
                           value={this.state.first_name}
                           onChange={this.handleChangeClientState}
                           className="form-control"
                           id="first_name"/>
                </div>
                <div className="form-group">
                    <label htmlFor="last_name"
                           className="required-area">Фамилия</label>
                    <input type="text"
                           name="last_name"
                           placeholder="Введите фамилию клиента"
                           value={this.state.last_name}
                           onChange={this.handleChangeClientState}
                           className="form-control"
                           id="last_name"/>
                </div>
                <div className="form-group">
                    <label htmlFor="phone1"
                           className="required-area">Основной телефон</label>
                    <MaskedInput type="text"
                                 name="phone1"
                                 placeholder="Введите телефон клиента"
                                 value={this.state.phone1}
                                 mask={phoneMask}
                                 onChange={this.handleChangeClientState}
                                 className="form-control"
                                 id="phone1"/>
                </div>
                <div className="form-group">
                    <label htmlFor="phone2">Второй телефон</label>
                    <MaskedInput type="text"
                                 name="phone2"
                                 placeholder="Введите телефон клиента"
                                 value={this.state.phone2}
                                 mask={phoneMask}
                                 onChange={this.handleChangeClientState}
                                 className="form-control"
                                 id="phone2"/>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="text"
                           name="email"
                           placeholder="Введите email клиента"
                           value={this.state.email}
                           onChange={this.handleChangeClientState}
                           className="form-control"
                           id="email"/>
                </div>
                <button type="submit"
                        onClick={this.handleSubmit}
                        disabled={this.getDisabledState()}
                        className="btn btn-primary">{this.btnText}
                </button>
            </div>
        )
    }
}