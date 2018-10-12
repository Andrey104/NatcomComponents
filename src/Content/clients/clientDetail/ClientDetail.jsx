import React from 'react';
import {connect} from 'react-redux';

import Loader from '../../../components/Loader';
import CustomPrices from './clientCustomPrices/CustomPrices';
import ClientInfo from '../clientInfo/ClientInfo';
import {getClient, editClient} from '../../../AC/clients';
import {openModalWindow, closeModalWindow} from '../../../AC/modal';
import {getPhoneWithMask, moneyFormat} from '../../../services/utils';
import {EDIT_CLIENT} from '../../../constans';

class ClientDetail extends React.Component {
    urlId;

    componentWillMount = () => {
        this.urlId = this.props.match.params.clientId;
        this.props.getClient(this.urlId);
    };

    editClient = client => this.props.editClient(this.urlId, client);

    closeDialog = () => this.props.closeModalWindow();

    getDialogWindow(client) {
        if (this.props.modal === EDIT_CLIENT) {
            return (
                <ClientInfo header={'Редактирование клиента'}
                            client={client}
                            handleSubmit={this.editClient}
                            close={this.closeDialog}/>
            );
        }
    }

    render() {
        const {client} = this.props;
        if (client.id !== Number(this.urlId)) {
            return (
                <div className="pre-loader-container">
                    <Loader/>
                </div>
            );
        }
        return (
            <div className="col-12">
                {this.getDialogWindow(client)}
                <h3>{client.first_name} {client.last_name}</h3>
                <div>Телефон 1: {getPhoneWithMask(client.phone1)}</div>
                <div>Телефон 2: {getPhoneWithMask(client.phone2)}</div>
                <div>{client.email}</div>
                <div>Баланс: {moneyFormat(client.balance)}</div>
                <button type="button"
                        onClick={() => this.props.openModalWindow(EDIT_CLIENT)}
                        className="btn btn-primary btn-sm">Редактировать
                </button>
                <CustomPrices clientId={client.id}/>
            </div>
        )
    }
}

// Написать селектор
export default connect((state) => ({
    client: state.clients.client,
    modal: state.modal.modal
}), {getClient, editClient, openModalWindow, closeModalWindow})(ClientDetail);