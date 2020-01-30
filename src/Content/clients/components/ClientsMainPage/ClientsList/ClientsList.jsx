import React, {Component} from 'react';
import {connect} from 'react-redux';
import history from "../../../../../history";

import Loader from '../../../../../components/Loader';
import AddButton from '../../../../../components/AddButton';
import ClientCard from './ClientCard/ClientCard';
import InfiniteScrollOverride from '../../../../../services/InfiniteScrollOverride';
import {getClients} from '../../../store/actions/clients';
import {openModalWindow} from "../../../../../AC/modal";
import {ADD_NEW_CLIENT} from "../../../store/constantsClient";
import {mapToArr} from '../../../../../helpers';
import './ClientsList.css';

class ClientsList extends Component {

    componentDidMount = () => this.props.getClients(null, this.props.filter, true);

    loadClients = () => {
        const {isLoading, nextPageNumber} = this.props;
        if (isLoading) return;
        this.props.getClients(nextPageNumber, this.props.filter, false);
    };

    addNewClient = () => history.push('/clients/add_client');

    getBody(clients) {
        if (!clients.length) return (
            <tr>
                <td colSpan="3" className="text-center">Нет клиентов</td>
            </tr>
        );
        return clients.map((client, index) => (
                <ClientCard key={client.id}
                            number={++index}
                            addClient={this.props.addClient}
                            client={client}/>
                )
        );
    };

    getAddClientButton = () => {
        return this.props.addClient
            ? <AddButton openAdd={() => this.props.openModalWindow(ADD_NEW_CLIENT)}/>
            : <AddButton openAdd={this.addNewClient}/>
    };

    render() {
        const {isLoading, clients, hasMoreClients} = this.props;
        const loader = hasMoreClients ? <Loader/> : false;
        if (isLoading && !clients.length) {
            return (
                <div className="pre-loader-container">
                    <Loader/>
                </div>
            );
        }
        return (
            <div className="row">
                <div className='col-12'>
                    <InfiniteScrollOverride
                        loadMore={this.loadClients}
                        hasMore={hasMoreClients}
                        useWindow={false}
                        isDialog={this.props.isDialog}
                        className="scroll">
                        <div className="row">
                            <div className="col-12 mobile-table-container">
                                <table className="table table-hover table-bordered">
                                    <thead className="thead">
                                        <tr>
                                            <th scope="col" className="non-display-item">№</th>
                                            <th scope="col name-column">ФИО</th>
                                            <th scope="col phone-column">Телефон</th>
                                            <th scope="col phone-column">Долг</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.getBody(clients)}
                                    </tbody>
                                </table>
                                {loader}
                            </div>
                            {this.getAddClientButton()}
                        </div>
                    </InfiniteScrollOverride>
                </div>
            </div>
        );
    }
}

export default connect((state) => ({
    clients: mapToArr(state.clients.clients),
    filter: state.clients.filter,
    isLoading: state.clients.isLoading,
    hasMoreClients: state.clients.hasMoreClients,
    nextPageNumber: state.clients.nextPageNumber
}), {getClients, openModalWindow})(ClientsList);