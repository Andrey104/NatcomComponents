import React from 'react';

import DialogWindow from '../../../../components/ModalWindow';
import CarInfo from '../../CarInfo';
import {BaseApi} from '../../../../services/base';

class EditCar extends React.Component {
    baseApi = new BaseApi();

    handleSubmit = editCar => {
        this.baseApi
            .put(`cars/${editCar.id}/`, editCar)
            .then((res) => this.props.successEditCar(res.data))
            .catch(err => alert(err));
    };


    render() {
        return (
            <CarInfo handleSubmit={this.handleSubmit}
                     car={this.props.car}
                     close={this.props.close}/>
        )
    }
}

export default DialogWindow(EditCar);