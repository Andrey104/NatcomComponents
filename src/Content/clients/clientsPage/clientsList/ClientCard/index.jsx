import React from 'react';

import {getPhoneWithMask} from '../../../../../services/utils';
import history from '../../../../../history';

export default class extends React.Component {

    handleClick = client => () => {
        if (this.props.addClient) {
            this.props.addClient(client);
        } else {
            history.push(`/clients/${client.id}`);
        }
    };

    render() {
        const {client, number} = this.props;
        return (
            <tr onClick={this.handleClick(client)}
                className="hover-element">
                <td>{number}</td>
                <td>{client.first_name} {client.last_name}</td>
                <td>{getPhoneWithMask(client.phone1)}</td>
            </tr>
        )
    }
}