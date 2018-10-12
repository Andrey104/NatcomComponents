import React from 'react';
import MaskedInput from 'react-text-mask';

import {phoneMask, getPhoneWithoutMask} from '../../../services/utils';

export default class extends React.Component {

    constructor(props) {
        super(props);
        const {driver} = props;

        if (driver) {
            this.state = driver;
        } else {
            this.state = {
                first_name: '',
                last_name: '',
                phone: ''
            };
        }
    }

    handleChangeDriverState(event, state) {
        this.setState({[state]: event.target.value});
    }

    handleSubmit = event => {
        event.preventDefault();
        const newDriver = this.state;
        newDriver.phone = getPhoneWithoutMask(this.state.phone);
        this.props.handleSubmit(newDriver);
    };

    close = () => this.props.close();

    getDisabledState() {
        if (!this.state.first_name || !this.state.last_name) {
            return true;
        } else if (getPhoneWithoutMask(this.state.phone).length < 10) {
            return true;
        }
        return false;
    }

    render() {
        return (
            <div>
                <div className="modal-body">
                    <div className="form-group">
                        <label>Имя</label>
                        <input type="text"
                               defaultValue={this.state.first_name}
                               placeholder="Введите имя водителя"
                               onChange={(e) => this.handleChangeDriverState(e, 'first_name')}
                               className="form-control"/>
                    </div>
                    <div className="form-group">
                        <label>Фамилия</label>
                        <input type="text"
                               defaultValue={this.state.last_name}
                               placeholder="Введите фамилию водителя"
                               onChange={(e) => this.handleChangeDriverState(e, 'last_name')}
                               className="form-control"/>
                    </div>
                    <div className="form-group">
                        <label>Телефон</label>
                        <MaskedInput type="text"
                                     defaultValue={this.state.phone}
                                     placeholder="Введите телефон водителя"
                                     mask={phoneMask}
                                     onChange={(e) => this.handleChangeDriverState(e, 'phone')}
                                     className="form-control"/>
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button"
                            onClick={this.close}
                            className="btn btn-secondary">Закрыть
                    </button>
                    <button type="submit"
                            onClick={this.handleSubmit}
                            disabled={this.getDisabledState()}
                            className="btn btn-primary">Добавить
                    </button>
                </div>
            </div>
        )
    }
}
