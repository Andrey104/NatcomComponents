import React from 'react';

export default class CarInfo extends React.Component {
    constructor(props) {
        super(props);
        const {car} = props;

        if (car) {
            this.state = car;
        } else {
            this.state = {
                name: '',
                number: ''
            };
        }
    }

    handleChangeCarState(event, state) {
        this.setState({[state]: event.target.value});
    }

    handleSubmit = event => {
        event.preventDefault();
        const newCar = this.state;
        this.props.handleSubmit(newCar);
    };

    close = () => this.props.close();

    getDisabledState() {
        return !this.state.name || !this.state.number;
    }

    render() {
        return (
            <div>
                <div className="modal-body">
                    <div className="form-group">
                        <label>Название</label>
                        <input type="text"
                               defaultValue={this.state.name}
                               placeholder="Введите название машины"
                               onChange={(e) => this.handleChangeCarState(e, 'name')}
                               className="form-control"/>
                    </div>
                    <div className="form-group">
                        <label>Номер</label>
                        <input type="text"
                               defaultValue={this.state.number}
                               placeholder="Введите номер машины"
                               onChange={(e) => this.handleChangeCarState(e, 'number')}
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
