import React, {Component} from 'react';

import {getDate, priceFormat} from '../../../../../services/utils';
import history from '../../../../../history';

export default class SupplyCard extends Component {

    handleClick = supplyId => () => history.push(`/supplies/${supplyId}`);

    getSupplyStatus(supply) {
        if (supply.draft === true) return "Черновик";

        else return "Проведена";
    }

    render() {
        const {supply} = this.props;
        return (
            <tr onClick={this.handleClick(supply.id)}>
                <td>{supply.id}</td>
                <td>{this.getSupplyStatus(supply)}</td>
                <td>{supply.supplier.name}</td>
                <td>{getDate(supply.date)}</td>
                <td>{priceFormat(supply.cost)}</td>
            </tr>
        );
    }
}