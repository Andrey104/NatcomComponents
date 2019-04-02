import React from 'react';

import DialogWindow from '../../../../components/ModalWindow';
import CarInfo from '../../CarInfo';
import {BaseApi} from '../../../../services/base';

class AddNewCar extends React.Component {
    baseApi = new BaseApi();

    handleSubmit = newCar => {
        this.baseApi
            .post(`cars/`, newCar)
            .then(() => this.props.successAddCar())
            .catch(err => alert(err));
    };


    render() {
        return (
            <CarInfo handleSubmit={this.handleSubmit}
                     close={this.props.close}/>
        )
    }
}

export default DialogWindow(AddNewCar);