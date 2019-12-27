import React from 'react';
import classNames from 'classnames/bind';
import {connect} from 'react-redux';

import Loader from '../../../../components/Loader/index';
import AddButton from '../../../../components/AddButton/index';
import ClientCard from './ClientCard/index';
import ClientInfo from '../../clientInfo/ClientInfo';
import InfiniteScrollOverride from '../../../../services/InfiniteScrollOverride';
import {getAllClients, getNextClients, addNewClient} from '../../../../AC/clients';
import {openModalWindow, closeModalWindow} from '../../../../AC/modal';
import {mapToArr} from '../../../../helpers';
import {ADD_NEW_CLIENT} from '../../../../constans';
import styles from './styles.css';
import ClientDetailModal from "../../clientDetail/clientDetailModal/ClientDetailModal";

let cx = classNames.bind(styles);

class ClientsList extends React.Component {
    selectedClientId;
    state = {
      clientDetailModalIsOpen: false
    };

    componentWillMount = () => this.props.getAllClients();

    loadClients = page => this.props.getNextClients(page);

    addNewClient = client => this.props.addNewClient(client);

    closeDialog = () => this.props.closeModalWindow();

    closeClientDetailModal = () => this.setState({clientDetailModalIsOpen: false});

    clientHandleClick = clientId => {
        this.selectedClientId = clientId;
        this.setState({clientDetailModalIsOpen: true})
    };

    getClientDetailModalWindow() {
        if (this.state.clientDetailModalIsOpen) {
            return (
                <ClientDetailModal clientId={this.selectedClientId} close={this.closeClientDetailModal}/>
            )
        }
    }

    getDialogWindow() {
        if (this.props.modal === ADD_NEW_CLIENT) {
            return (
                <ClientInfo header={'Новый клиент'}
                            handleSubmit={this.addNewClient}
                            close={this.closeDialog}/>
            )
        }
    }

    getAddClientButton() {
        let addButton = null;

            addButton = (
                <AddButton openAdd={() => this.props.openModalWindow(ADD_NEW_CLIENT)}/>
            );

        return addButton;
    }

    getBody(clients) {
        if (!clients.length) {
            return (
                <tr>
                    <td colSpan="3"
                        className="text-center">Нет клиентов
                    </td>
                </tr>
            )
        }
        return (clients.map((client, index) => (
                <ClientCard key={client.id}
                            addClient={this.props.addClient}
                            client={client}
                            handleClick={this.clientHandleClick}
                            clientModal = {true}/>
            )
        ));
    }

    getPageClasses = () => this.props.addClient ? 'dialog' : '';

    render() {
        let content;
        const {isLoading, clients, hasMoreClients} = this.props;
        if (isLoading && clients.length === 0) {
            content = (
                <div className="pre-loader-container">
                    <Loader/>
                </div>
            );
        }
         else {
            const loader = hasMoreClients ? <Loader/> : false;
            content = (
                    <div className={cx('col-12', this.getPageClasses())}>
                        <InfiniteScrollOverride
                            pageStart={1}
                            loadMore={this.loadClients}
                            hasMore={hasMoreClients}
                            useWindow={false}
                            isDialog={this.props.addClient}>
                            <div className="row">
                                <div className="col-12">
                                    <table className="table table-hover table-bordered">
                                        <thead className="thead">
                                        <tr>
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
            );
        }
        const dialogWindow = this.getDialogWindow();
        const clientDetailModalWindow = this.getClientDetailModalWindow();
         return (
             <div className="row">
                 {dialogWindow}
                 {clientDetailModalWindow}
                 {content}
             </div>
         );
    }
}

export default connect((state) => ({
    clients: mapToArr(state.clients.clients),
    isLoading: state.clients.isLoading,
    hasMoreClients: state.clients.hasMoreClients,
    modal: state.modal.modal
}), {
    getAllClients,
    getNextClients,
    openModalWindow,
    closeModalWindow,
    addNewClient
})(ClientsList);