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
            <div className="col-12">
                <table className="table table-bordered">
                    <thead className="thead-light">
                    <tr>
                        <th scope="col">Склад</th>
                        <th scope="col">Количество</th>
                        <th scope="col">Резерв</th>
                        <th scope="col">Перевозка</th>
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