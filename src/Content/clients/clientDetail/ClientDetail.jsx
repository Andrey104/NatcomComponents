import React from 'react';
import {connect} from 'react-redux';

import Loader from '../../../components/Loader';
import ClientInfo from '../clientInfo/ClientInfo';
import CreditInfo from '../CreditInfo/';
import {getClient, editClient} from '../../../AC/clients';
import {openModalWindow, closeModalWindow} from '../../../AC/modal';
import {getPhoneWithMask, priceFormat} from '../../../services/utils';
import {EDIT_CLIENT} from '../../../constans';
import OrdersList from "../../orders/ordersPage/ordersList/OrdersList";
import OrderClientCard from '../../../components/OrderClientCard'

class ClientDetail extends React.Component {
    urlId;

    componentWillMount = () => {
        this.props.clientId ? this.urlId = this.props.clientId : this.urlId = this.props.match.params.clientId;
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

    updateClient = () => {
        console.log('---updateClient');
        setTimeout( this.props.getClient, 100, this.urlId)
       ;
    };

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
            <div className="row">
                {this.getDialogWindow(client)}
                <div className="col-md-6">
                    <h3>{client.first_name} {client.last_name}</h3>
                    <div>Телефон 1: {getPhoneWithMask(client.phone1)}</div>
                    <div>Телефон 2: {getPhoneWithMask(client.phone2)}</div>
                    <div>{client.email}</div>
                    <div>Баланс: {priceFormat(client.balance)}</div>
                </div>
                <div className="col-md-6">
                    <OrderClientCard
                        isClientsPage = {true}
                        client={client}
                        update={this.updateClient}/>
                </div>
                <div className="col-12">
                    <button type="button"
                            onClick={() => this.props.openModalWindow(EDIT_CLIENT)}
                            className="btn btn-primary btn-sm">Редактировать
                    </button>
                    {/*<CustomPrices clientId={client.id}/>*/}
                    <CreditInfo client={client}/>
                    <OrdersList client={client}/>
                </div>
            </div>
        )
    }
}

// Написать селектор
export default connect((state) => ({
    client: state.clients.client,
    modal: state.modal.modal
}), {getClient, editClient, openModalWindow, closeModalWindow})(ClientDetail);