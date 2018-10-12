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

let cx = classNames.bind(styles);

class ClientsList extends React.Component {

    componentWillMount = () => this.props.getAllClients();

    loadClients = page => this.props.getNextClients(page);

    addNewClient = client => this.props.addNewClient(client);

    closeDialog = () => this.props.closeModalWindow();

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
        if (!this.props.addClient) {
            addButton = (
                <div className="col-2">
                    <AddButton openAdd={() => this.props.openModalWindow(ADD_NEW_CLIENT)}/>
                </div>
            );
        }
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
                            number={++index}
                            addClient={this.props.addClient}
                            client={client}/>
            )
        ));
    }

    getPageClasses = () => this.props.addClient ? 'dialog' : '';

    render() {
        const {isLoading, clients, hasMoreClients} = this.props;
        if (isLoading && clients.length === 0) {
            return (
                <div className="pre-loader-container">
                    <Loader/>
                </div>
            );
        }
        const loader = hasMoreClients ? <Loader/> : false;
        const dialogWindow = this.getDialogWindow();
        return (
            <div className="row">
                {dialogWindow}
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
                                    <thead className="thead-light">
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">ФИО</th>
                                        <th scope="col">Телефон</th>
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