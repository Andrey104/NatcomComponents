import React from 'react';

import history from '../../../../../history';
import {harpoonStatuses, moneyFormat, getDate} from '../../../../../services/utils';

export default class extends React.Component {

    handleClick = harpoon => () => history.push(`/harpoons/${harpoon.id}`);

    render() {
        const {harpoon, number} = this.props;
        return (
            <tr onClick={this.handleClick(harpoon)}>
                <td scope="row">{number}</td>
                <td>{harpoon.client.first_name} {harpoon.client.last_name}</td>
                <td>{moneyFormat(harpoon.sum)}</td>
                <td>{getDate(harpoon.auto_date)}</td>
                <td>{harpoonStatuses[harpoon.status]}</td>
            </tr>
        );
    }
}