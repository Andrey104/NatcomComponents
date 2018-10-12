import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import {connect} from 'react-redux';

import Loader from '../../../../components/Loader/index';
import AddButton from '../../../../components/AddButton/index';
import ServiceCard from './ServiceCard/index';
import AddNewService from './AddNewService/index';
import {getAllServices, getNextServices} from '../../../../AC/services';
import {mapToArr} from '../../../../helpers';

class ServicesList extends React.Component {
    state = {
        openAddServiceDialog: false
    };

    pageNumber = 1;

    componentWillMount = () => this.props.getAllServices();

    loadServices = page => this.props.getNextServices(page);

    getBody(services) {
        if (!services.length) return (
            <tr>
                <td colSpan='6'>Вы еще не добавили ни одной услуги</td>
            </tr>
        );

        let number = 1;
        return services.map((service) => (
                <ServiceCard key={service.id}
                             number={number++}
                             service={service}/>
            )
        );
    }

    getDialogWindow() {
        if (!this.state.openAddServiceDialog) return null;
        return <AddNewService header={'Новая услуга'}
                              successAddService={this.successAddService}
                              close={this.addServiceDialogState}/>
    }

    addServiceDialogState = () => {
        this.setState({openAddServiceDialog: !this.state.openAddServiceDialog});
    };

    successAddService = () => {
        this.props.getAllServices();
        this.addServiceDialogState();
        this.pageNumber = 1;
    };

    render() {
        const {isLoading, services, hasMoreServices} = this.props;
        if (isLoading && !services.length) {
            return (
                <div>
                    <Loader/>
                </div>
            );
        }

        return (
            <div className="row">
                {this.getDialogWindow()}
                <div className='col-12'>
                    <InfiniteScroll
                        loadMore={this.loadServices}
                        hasMore={hasMoreServices}
                        useWindow={false}
                        loader={<Loader key={0}/>}>
                        <div className="row">
                            <div className="col-12">
                                <table className="table table-hover table-bordered">
                                    <thead className="thead-light">
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Название</th>
                                        <th scope="col">Тип</th>
                                        <th scope="col">Цена стандартная</th>
                                        <th scope="col">Цена хорошая</th>
                                        <th scope="col">Цена лучшая</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {this.getBody(services)}
                                    </tbody>
                                </table>
                            </div>
                            <AddButton openAdd={this.addServiceDialogState}/>
                        </div>
                    </InfiniteScroll>
                </div>
            </div>
        );
    }
}

export default connect((state) => ({
    services: mapToArr(state.services.entries),
    isLoading: state.services.isLoading,
    hasMoreServices: state.services.hasMoreEntries
}), {getAllServices, getNextServices})(ServicesList);
