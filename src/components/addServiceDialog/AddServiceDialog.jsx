import React from 'react';
import {connect} from 'react-redux';

import DialogWindow from '../DialogWindow';
import Loader from '../Loader';
import {getAllServices} from '../../AC/services';
import {mapToArr} from '../../helpers';
import {priceFormat} from '../../services/utils';
import {serviceTypes} from '../../constans';
import './styles.css';

class AddServiceDialog extends React.Component {

    state = {
        error: ''
    };

    componentWillMount = () => {
        const {client, getAllServices} = this.props;
        getAllServices(`?client=${client.id}`);
    };

    handleClick = currentService => () => {
        const {currentServices} = this.props;
        const coincidence = currentServices.find(service => (
            service.service.id === currentService.id)
        );
        if (coincidence) {
            this.setState({error: `Услуга '${currentService.name}' уже добавлена`});
        } else {
            this.props.selectedService(currentService);
        }
    };

    getServices(services) {
        return services.map(service => (
                <tr key={service.id}
                    onClick={this.handleClick(service)}>
                    <td>{service.name}</td>
                    <td>{serviceTypes[service.type - 1]}</td>
                    <td>{priceFormat(service.price)}</td>
                </tr>
            )
        )
    }

    getError() {
        if (this.state.error) {
            return (
                <div className="alert alert-warning">{this.state.error}</div>
            )
        }
    }

    render() {
        const {services, isLoading} = this.props;
        if (services.length === 0 || isLoading) {
            return <Loader/>
        }
        return (
            <div className="modal-body content">
                <table className="table table-bordered table-hover">
                    <thead>
                    <tr>
                        <th scope="col">Название</th>
                        <th scope="col">Тип</th>
                        <th scope="col">Цена</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.getServices(services)}
                    </tbody>
                </table>
                {this.getError()}
            </div>
        )
    }
}

export default DialogWindow(connect((state) => ({
    services: mapToArr(state.services.entries),
    isLoading: state.services.isLoading
}), {getAllServices})(AddServiceDialog));