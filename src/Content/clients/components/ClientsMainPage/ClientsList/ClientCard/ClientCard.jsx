import React, {Component} from 'react';
import {getPhoneWithMask, priceFormat} from '../../../../../../services/utils';
import history from '../../../../../../history';
import './ClientCard.css';

export default class extends Component {

    handleClick = clientId => history.push(`/clients/${clientId}`);

    clickOnCard = client => () => {
        if (this.props.addClient) this.props.addClient(client);

        else this.handleClick(client.id);
    };

    render() {
        const {client, number} = this.props;

        let clientBalanceClass;
        client.orders_credit > 1 ? clientBalanceClass = "negative-balance" : clientBalanceClass = "name-column";

        return (
            <tr onClick={this.clickOnCard(client)}
                className="hover-element">
                <td className="non-display-item">{number}</td>
                <td className={clientBalanceClass}>{client.first_name} {client.last_name}</td>
                <td className="phone-column">{getPhoneWithMask(client.phone1)}</td>
                <td className="phone-column">{priceFormat(client.orders_credit)}</td>
            </tr>
        )
    }
}