import React from 'react';

import TableResultRow from '../../../../components/TableResultRow';
import HarpoonName from '../../../../components/HarpoonName';
import {priceFormat, countFormat, getUnit, getPositionSumPriceNotInItem, getArea} from '../../../../services/utils';
import history from '../../../../history';
import {ITEM_MEMBRANE, ITEM_PRODUCT} from "../../../../constans";

export default class extends React.Component {
    orderList;

    getItemName(inItem) {
        let item = inItem.item;
        if (item.type === ITEM_PRODUCT) {
            return (<td>{item.name}</td>);
        }
        if (item.type === ITEM_MEMBRANE) {
            return (<td>{item.texture.description} {item.color.description} {item.name} ({item.width})</td>);
        }
    }

    getItems(order) {
        if (order.items) {
            const orderListLength = this.orderList.length + 1;
            const items = order.items.map((item, index) => {
                    const itemUrl = item.item.color
                        ? `/membranes/${item.item.id}`
                        : `/products/${item.item.id}`;
                    return (
                        <tr key={item.item.id + item.item.name + index}
                            onClick={() => history.push(itemUrl)}>
                            <th scope="row">{index + orderListLength}</th>
                            <td>{item.item.vendor_code}</td>
                            {this.getItemName(item)}
                            <td>{priceFormat(item.price)} руб</td>
                            <td>{priceFormat(item.count)} {getUnit(item)}{getArea(item)}</td>
                            <td>{getPositionSumPriceNotInItem(item)} руб</td>
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
                <tr key={harpoon.id + index}
                    onClick={() => history.push(`/harpoons/${harpoon.id}`)}>
                    <th scope="row">{index + orderListLength}</th>
                    <td>Г {harpoon.id}</td>
                    <HarpoonName harpoon={harpoon}/>
                    <td className="text-center">-</td>
                    <td className="text-center">-</td>
                    <td>{priceFormat(harpoon.sum)} руб</td>
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
                        <th scope="col">Артикул</th>
                        <th scope="col">Название</th>
                        <th scope="col">Цена</th>
                        <th scope="col">Количество</th>
                        <th scope="col">Стоимость</th>

                    </tr>
                    </thead>
                    <tbody>
                    {this.orderList}
                    <TableResultRow columnCount={6}
                                    resultPrice={order.sum}/>
                    </tbody>
                </table>
            </div>
        )
    }
}