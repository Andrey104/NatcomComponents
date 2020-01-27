import React, {Component} from 'react';
import {getDate, priceFormat} from '../../../../../../services/utils';
import history from '../../../../../../history';

export default class SupplyCard extends Component {

    handleClick = supplyId => () => history.push(`/supplies/${supplyId}`);

    getSupplyStatus(supply) {
        if (supply.draft === true) return "Черновик";

        else return "Проведена";
    }

    render() {
        const {supply} = this.props;
        return (
            <tr onClick={this.handleClick(supply.id)} className="hover-over-table">
                <td data-label="№: ">{supply.id}</td>
                <td data-label="Статус: ">{this.getSupplyStatus(supply)}</td>
                <td data-label="Поставщик: ">{supply.supplier.name}</td>
                <td data-label="Дата: ">{getDate(supply.date)}</td>
                <td data-label="Сумма: ">{priceFormat(supply.cost)}</td>
            </tr>
        );
    }
}