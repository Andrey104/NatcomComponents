import React from 'react';

import {userTypes} from '../../../../services/utils';
import history from '../../../../history';

export default class extends React.Component {

    handleClick = user => () => history.push(`/users/${user.id}`);

    render() {
        const {user, number} = this.props;
        return (
            <tr onClick={this.handleClick(user)}>
                <td scope="row">{number}</td>
                <td>{user.username}</td>
                <td>{user.first_name} {user.last_name}</td>
                <td>{userTypes[user.type]}</td>
                <td>{user.stock.name}</td>
            </tr>
        );
    }
}