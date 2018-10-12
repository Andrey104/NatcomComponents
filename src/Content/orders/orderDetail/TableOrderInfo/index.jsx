import React from 'react';

import TableResultRow from '../../../../components/TableResultRow';
import HarpoonName from '../../../../components/HarpoonName';
import {moneyFormat, countFormat} from '../../../../services/utils';
import history from '../../../../history';

export default class extends React.Component {
    orderList;

    getItems(order) {
        if (order.items) {
            const orderListLength = this.orderList.length + 1;
            const items = order.items.map((item, index) => {
                    const itemUrl = item.item.color
                        ? `/membranes/${item.item.id}`
                        : `/products/${item.item.id}`;
                    return (
                        <tr key={item.item.item}
                            onClick={() => history.push(itemUrl)}>
                            <th scope="row">{index + orderListLength}</th>
                            <td>{item.item.name}</td>
                            <td>{moneyFormat(item.price)}</td>
                            <td>{countFormat(item.count)}</td>
                        </tr>
                    )
                }
            );
            this.orderList = this.orderList.concat(items);
        }
    }

    getHarpoons(order) {
        if (order.harpoons) {
            const orderListLength = this.orderList.length + 1;
            const harpoons = order.harpoons.map((harpoon, index) => (
                <tr key={harpoon.id}
                    onClick={() => history.push(`/harpoons/${harpoon.id}`)}>
                    <th scope="row">{index + orderListLength}</th>
                    <HarpoonName harpoon={harpoon}/>
                    <td>{moneyFormat(harpoon.sum)}</td>
                    <td className="text-center">-</td>
                </tr>
            ));
            this.orderList = this.orderList.concat(harpoons);
        }
    }

    getTable(order) {
        this.orderList = [];
        this.getItems(order);
        this.getHarpoons(order);
    }

    render() {
        const {order} = this.props;
        this.getTable(order);
        return (
            <div className="col-12">
                <h5>Содержимое заказа</h5>
                <table className="table table-bordered table-hover">
                    <thead className="thead-light">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Название</th>
                        <th scope="col">Цена</th>
                        <th scope="col">Количество</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.orderList}
                    <TableResultRow columnCount={4}
                                    resultPrice={order.sum}/>
                    </tbody>
                </table>
            </div>
        )
    }
}