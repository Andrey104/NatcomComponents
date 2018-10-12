import React from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames/bind';
import {NavLink} from 'react-router-dom'

import Loader from '../../../components/Loader';
import EditCar from './EditCar';
import SetDriver from './SetDriver'
import {getCar} from '../../../AC/cars';
import styles from './styles.css';

let cx = classNames.bind(styles);

class CarDetail extends React.Component {
    state = {
        openEditCarDialog: false,
        openSetDriverDialog: false
    };

    componentWillMount = () => {
        const urlId = this.props.match.params.carId;
        this.props.getCar(urlId);
    };

    editCarDialogState = () => {
        this.setState({openEditCarDialog: !this.state.openEditCarDialog});
    };

    setDriverDialogState = () => {
        this.setState({openSetDriverDialog: !this.state.openSetDriverDialog});
    };

    successEditCar = car => {
        this.props.getCar(car.id);
        this.editCarDialogState();
    };

    getDialogWindow(car) {
        let dialogWindow = null;
        if (this.state.openEditCarDialog) {
            dialogWindow = <EditCar header={'Редактирование машины'}
                                    successEditCar={this.successEditCar}
                                    close={this.editCarDialogState}
                                    car={car}/>
        }
        return dialogWindow;
    }

    getSetDriverDialogWindow(car) {
        if (!this.state.openSetDriverDialog) return null;
        return <SetDriver header={'Установить водителя'}
                          successSetDriver={this.successSetDriver}
                          close={this.setDriverDialogState}
                          car={car}/>
    }

    successSetDriver = () => {
        const carId = this.props.match.params.carId;
        this.props.getCar(carId);
        this.setDriverDialogState();
    };

    render() {
        const {car, isLoading} = this.props;
        if (isLoading || !car) {
            return (
                <div className={cx('pre-loader-container')}>
                    <Loader/>
                </div>
            );
        }

        return (
            <div className="col-12">
                {this.getDialogWindow(car)}
                {this.getSetDriverDialogWindow(car)}
                <h5><i>Название:</i> {car.name}</h5>
                <h5><i>Номер:</i> {car.number}</h5>
                <div>{this.getDriver()}</div>
                <button type="button"
                        onClick={this.editCarDialogState}
                        className="btn btn-primary btn-sm">Редактировать
                </button>
                <button type="button"
                        onClick={this.setDriverDialogState}
                        className="btn btn-primary btn-sm">Установить водителя
                </button>
            </div>
        )
    }

    getDriver() {
        const {driver} = this.props.car;
        if (!driver) return 'Водитель не установлен';

        return (
            <div>
                <h5>
                    <i>Водитель: </i>
                    <NavLink to={`/drivers/${driver.id}`}>
                        {driver.first_name + ' ' + driver.last_name}
                    </NavLink>
                </h5>
            </div>
        )
    }
}

export default connect((state) => ({
    car: state.cars.car,
    isLoading: state.cars.isLoading
}), {getCar})(CarDetail);
