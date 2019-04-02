import React from 'react';

import DialogWindow from '../../../../components/ModalWindow';
import DriverInfo from '../../DriverInfo';
import {BaseApi} from '../../../../services/base';

class EditDriver extends React.Component {
    baseApi = new BaseApi();

    handleSubmit = editDriver => {
        this.baseApi
            .put(`drivers/${editDriver.id}/`, editDriver)
            .then((res) => this.props.successEditDriver(res.data))
            .catch(err => alert(err));
    };


    render() {
        return (
            <DriverInfo handleSubmit={this.handleSubmit}
                        driver={this.props.driver}
                        close={this.props.close}/>
        )
    }
}

export default DialogWindow(EditDriver);