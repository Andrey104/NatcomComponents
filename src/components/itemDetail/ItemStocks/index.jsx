import React from 'react';

import {countFormat} from '../../../services/utils';

export default class extends React.Component {


    getBody() {
        const {stocks} = this.props;
        return stocks.map(itemStock => (
            <tr key={itemStock.id}>
                <td>{itemStock.stock.name}</td>
                <td>{countFormat(itemStock.count)}</td>
                <td>{countFormat(itemStock.reserve)}</td>
                <td>{countFormat(itemStock.in_way)}</td>
            </tr>
        ));
    }

    render() {
        return (
            <div>
                <table className="item-stocks-table">
                    <thead className = "plan-list-table-header">
                    <tr className="plan-list-table-headers">
                        <th>Склад</th>
                        <th>Количество</th>
                        <th>Резерв</th>
                        <th>Перевозка</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.getBody()}
                    </tbody>
                </table>
            </div>
        );
    }
}