import React from 'react';

import DialogWindow from '../../../../components/DialogWindow';
import ServiceInfo from '../../ServiceInfo';
import {BaseApi} from '../../../../services/base';

class EditService extends React.Component {
    render() {
        return (
            <ServiceInfo handleSubmitService={this.handleSubmitService}
                         close={this.props.close}
                         service={this.props.service}/>
        )
    }

    handleSubmitService = service => {
        const baseApi = new BaseApi();
        baseApi
            .put(`services/${service.id}/`, service)
            .then((res) => this.props.successEditService(res.data))
            .catch(err => alert(err));
    };
}

export default DialogWindow(EditService);