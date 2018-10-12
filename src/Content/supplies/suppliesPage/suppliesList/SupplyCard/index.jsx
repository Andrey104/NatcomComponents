import React from 'react';

import {getDate, moneyFormat} from '../../../../../services/utils';
import history from '../../../../../history';

export default class extends React.Component {

    handleClick = supplyId => () => history.push(`/supplies/${supplyId}`);

    render() {
        const {supply, number} = this.props;
        return (
            <tr onClick={this.handleClick(supply.id)}>
                <td>{number}</td>
                <td>{supply.supplier.name}</td>
                <td>{supply.document}</td>
                <td>{getDate(supply.date)}</td>
                <td>{moneyFormat(supply.cost)}</td>
            </tr>
        );
    }
}