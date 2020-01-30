import React, {Component} from 'react';
import {connect} from 'react-redux';
import history from "../../../../history";

import Loader from '../../../../components/Loader';
import CreditInfo from './CreditInfo/CreditInfo';
import {getClient} from '../../store/actions/clients';
import {getPhoneWithMask, priceFormat} from '../../../../services/utils';
import OrdersList from "../../../orders/ordersPage/ordersList/OrdersList";
import OrderClientCard from '../../../../components/OrderClientCard';
import './ClientInfoPage.css';

class ClientInfoPage extends Component {
    urlId;

    componentWillMount = () => {
        this.urlId = this.props.match.params.clientId;
        this.props.getClient(this.urlId);
    };

    render() {
        const {client, order} = this.props;
        if (client.id !== Number(this.urlId)) {
            return (
                <div className="pre-loader-container">
                    <Loader/>
                </div>
            );
        }
        return (
            <div className="row">
                <div className="col-md-6">
                    <h3>{client.first_name} {client.last_name}</h3>
                    <div>Телефон 1: {getPhoneWithMask(client.phone1)}</div>
                    <div>Телефон 2: {getPhoneWithMask(client.phone2)}</div>
                    <div>{client.email}</div>
                    <div>Баланс: {priceFormat(client.balance)}</div>
                </div>
                <div className="col-md-6">
                    <OrderClientCard
                        isClientsPage={true}
                        order={order}
                        client={client}/>
                </div>
                <div className="col-12">
                    <button type="button"
                            onClick={() => history.push(`/clients/${this.urlId}/edit`)}
                            className="btn btn-primary btn-sm">Редактировать
                    </button>
                    <CreditInfo client={client}/>
                    <div className="order-list-block">
                        <OrdersList client={client}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect((state) => ({
    client: state.clients.client
}), {getClient})(ClientInfoPage);