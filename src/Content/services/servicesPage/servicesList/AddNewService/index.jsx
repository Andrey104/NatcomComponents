import React from 'react';

import DialogWindow from '../../../../../components/ModalWindow/index';
import ServiceInfo from '../../../ServiceInfo/index';
import {BaseApi} from '../../../../../services/base';

class AddNewService extends React.Component {
    render() {
        return (
            <ServiceInfo handleSubmitService={this.handleSubmitService}
                         close={this.props.close}/>
        )
    }

    handleSubmitService = newService => {
        const baseApi = new BaseApi();
        baseApi
            .post(`services/`, newService)
            .then(() => this.props.successAddService())
            .catch(err => alert(err));
    };
}

export default DialogWindow(AddNewService);