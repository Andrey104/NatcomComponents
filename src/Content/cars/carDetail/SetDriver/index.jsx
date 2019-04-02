import React from 'react';

import DialogWindow from '../../../../components/ModalWindow';
import {BaseApi} from '../../../../services/base';
import DriversList from '../../../drivers/driversList/DriversList'

class SetDriver extends React.Component {
    constructor(props) {
        super(props);
        const {car} = props;
        this.state = {
            selectedDriverId: car.driver ? car.driver.id : null
        };
    }

    render() {
        return (
            <div>
                <div className="modal-body">
                    <DriversList selectDriverForCar={this.selectDriverForCar}
                                 selectedDriverId={this.state.selectedDriverId}/>
                </div>
                <div className="modal-footer">
                    <button type="button"
                            onClick={this.props.close}
                            className="btn btn-secondary">Закрыть
                    </button>
                    <button type="submit"
                            onClick={this.handleSubmit}
                            disabled={this.getDisabledState()}
                            className="btn btn-primary">Установить
                    </button>
                </div>
            </div>
        )
    }

    selectDriverForCar = driverId => {
        this.setState({selectedDriverId: driverId});
    };

    handleSubmit = event => {
        event.preventDefault();
        this.setDriver({driver: this.state.selectedDriverId});
    };

    setDriver(driver) {
        const {car} = this.props;
        const baseApi = new BaseApi();
        baseApi
            .post(`cars/${car.id}/set_driver/`, driver)
            .then(() => this.props.successSetDriver())
            .catch(err => alert(err));
    }

    getDisabledState() {
        return !this.state.selectedDriverId
    }
}

export default DialogWindow(SetDriver);