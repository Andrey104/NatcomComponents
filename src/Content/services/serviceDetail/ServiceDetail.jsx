import React from 'react';
import {connect} from 'react-redux';

import Loader from '../../../components/Loader';
import EditService from './EditService';
import DeleteService from './DeleteService'
import {getService} from '../../../AC/services';
import {serviceTypes} from '../../../constans';

class ServiceDetail extends React.Component {
    state = {
        openEditServiceDialog: false,
        openDeleteServiceDialog: false
    };

    componentWillMount = () => {
        const urlId = this.props.match.params.serviceId;
        this.props.getService(urlId);
    };

    editServiceDialogState = () => {
        this.setState({openEditServiceDialog: !this.state.openEditServiceDialog});
    };

    deleteServiceDialogState = () => {
        this.setState({openDeleteServiceDialog: !this.state.openDeleteServiceDialog});
    };

    successEditService = service => {
        this.props.getService(service.id);
        this.editServiceDialogState();
    };

    getEditServiceDialogWindow(service) {
        if (!this.state.openEditServiceDialog) return null;
        return <EditService header={'Редактирование услуги'}
                            successEditService={this.successEditService}
                            close={this.editServiceDialogState}
                            service={service}/>
    }

    getDeleteServiceDialogWindow(service) {
        if (!this.state.openDeleteServiceDialog) return null;
        return <DeleteService header={`Удаление услуги "${service.name}"`}
                              successDeleteService={() => this.props.history.push('/services')}
                              close={this.deleteServiceDialogState}
                              service={service}/>
    }

    render() {
        const {service, isLoading} = this.props;
        if (isLoading || !service) return <Loader/>;

        return (
            <div className="col-12">
                {this.getEditServiceDialogWindow(service)}
                {this.getDeleteServiceDialogWindow(service)}
                <h5><i>Название:</i> {service.name}</h5>
                <h5><i>Тип:</i> {serviceTypes[service.type - 1]}</h5>
                <h5><i>Стандартная цена:</i> {service.price_standard} руб.</h5>
                <h5><i>Хорошая цена:</i> {service.price_good} руб.</h5>
                <h5><i>Лучшая цена:</i> {service.price_best} руб.</h5>
                <button type="button"
                        onClick={this.editServiceDialogState}
                        className="btn btn-primary btn-sm">Редактировать
                </button>
                <button type="button"
                        onClick={this.deleteServiceDialogState}
                        className="btn btn-danger btn-sm">Удалить
                </button>
            </div>
        )
    }
}

export default connect((state) => ({
    service: state.services.service,
    isLoading: state.services.isLoading
}), {getService})(ServiceDetail);
