import React from 'react';

import {getPhoneWithMask} from '../../../../../services/utils';
import history from '../../../../../history';
import '../styles.css';
import {priceFormat} from "../../../../../services/utils";

export default class extends React.Component {

    handleClick = client => () => {
        if (this.props.addClient) {
            this.props.addClient(client);
        } else {
            this.props.handleClick(client.id);
        }
    };

    render() {
        const {client, number} = this.props;
        console.log(client);
        let clientBalanceClass;
        client.orders_credit > 1 ? clientBalanceClass = "negative-balance" : clientBalanceClass = "name-column";
        return (
            <tr onClick={this.handleClick(client)}
                className="hover-element">
                <td className={clientBalanceClass}>{client.first_name} {client.last_name}</td>
                <td className="phone-column">{getPhoneWithMask(client.phone1)}</td>
                <td className="phone-column">{priceFormat(client.orders_credit)}</td>
            </tr>
        )
    }
}