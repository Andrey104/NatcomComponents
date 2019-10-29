import React from 'react';

import {getPhoneWithMask} from '../../../../../services/utils';
import history from '../../../../../history';

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
        return (
            <tr onClick={this.handleClick(client)}
                className="hover-element">
                <td className="name-column">{client.first_name} {client.last_name}</td>
                <td className="phone-column">{getPhoneWithMask(client.phone1)}</td>
            </tr>
        )
    }
}