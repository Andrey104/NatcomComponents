import React from 'react';

import DialogWindow from '../../../../components/DialogWindow';
import DriverInfo from '../../DriverInfo';
import {BaseApi} from '../../../../services/base';

class AddNewDriver extends React.Component {
    baseApi = new BaseApi();

    handleSubmit = newDriver => {
        this.baseApi
            .post(`drivers/`, newDriver)
            .then(() => this.props.successAddDriver())
            .catch(err => alert(err));
    };


    render() {
        return (
            <DriverInfo handleSubmit={this.handleSubmit}
                        close={this.props.close}/>
        )
    }
}

export default DialogWindow(AddNewDriver);