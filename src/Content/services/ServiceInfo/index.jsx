import React from 'react';

import {serviceTypes} from '../../../constans';

export default class ServiceInfo extends React.Component {
    constructor(props) {
        super(props);
        const {service} = props;

        if (service) {
            this.state = service;
        } else {
            this.state = {
                name: '',
                type: 1,
                price_standard: '',
                price_good: '',
                price_best: ''
            };
        }
    }

    handleChangeServiceState(event, state) {
        this.setState({[state]: event.target.value});
    }

    handleChangeServiceType = event => {
        this.setState({type: event.target.value});
    };

    handleSubmit = event => {
        event.preventDefault();
        const newService = this.state;
        this.props.handleSubmitService(newService);
    };

    getDisabledState() {
        return !this.state.name || !this.state.type || !this.state.price_standard ||
            !this.state.price_good || !this.state.price_best;
    }

    render() {
        return (
            <div>
                <div className="modal-body">
                    <div className="form-group">
                        <label>Название</label>
                        <input type="text"
                               value={this.state.name}
                               placeholder="Введите название услуги"
                               onChange={(e) => this.handleChangeServiceState(e, 'name')}
                               className="form-control"/>
                    </div>
                    <div className="form-group">
                        <label>Тип</label>
                        <select className="form-control"
                                onChange={this.handleChangeServiceType}
                                value={this.state.type}>
                            {serviceTypes.map((service, index) => (
                                <option value={++index} key={index}>{service}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Стандартная цена</label>
                        <input type="text"
                               value={this.state.price_standard}
                               placeholder="Введите цену"
                               onChange={(e) => this.handleChangeServiceState(e, 'price_standard')}
                               className="form-control"/>
                    </div>
                    <div className="form-group">
                        <label>Хорошая цена</label>
                        <input type="text"
                               value={this.state.price_good}
                               placeholder="Введите цену"
                               onChange={(e) => this.handleChangeServiceState(e, 'price_good')}
                               className="form-control"/>
                    </div>
                    <div className="form-group">
                        <label>Лучшая цена</label>
                        <input type="text"
                               value={this.state.price_best}
                               placeholder="Введите цену"
                               onChange={(e) => this.handleChangeServiceState(e, 'price_best')}
                               className="form-control"/>
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button"
                            onClick={this.props.close}
                            className="btn btn-secondary">Закрыть
                    </button>
                    <button type="submit"
                            onClick={this.handleSubmit}
                            disabled={this.getDisabledState()}
                            className="btn btn-primary">
                        {this.props.service ? 'Редактировать' : 'Добавить'}
                    </button>
                </div>
            </div>
        )
    }
}
