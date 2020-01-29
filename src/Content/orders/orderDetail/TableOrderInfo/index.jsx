import React from 'react';

import TableResultRow from '../../../../components/TableResultRow';
import HarpoonName from '../../../../components/HarpoonName';
import {priceFormat, countFormat, getUnit, getPositionSumPriceNotInItem, getArea} from '../../../../services/utils';
import history from '../../../../history';
import {ITEM_MEMBRANE, ITEM_PRODUCT, units} from "../../../../constans";

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
                            <td>{priceFormat(item.count)} {getUnit(item)}{getArea(item)}</td>
                            <td>{priceFormat(item.price)} руб</td>
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

    getCustomPositions(order) {
        if (order.custom_positions) {
            const orderListLength = this.orderList.length + 1;
            const custom_positions = order.custom_positions.map((position, index) => (
                <tr key={position.id + index}
                    onClick={() => history.push(`/harpoons/${position.id}`)}>
                    <th scope="row">{index + orderListLength}</th>
                    <td>ДОП</td>
                    <td>{position.name}</td>
                    <td>{countFormat(position.count)} {units[position.unit]}</td>
                    <td>{priceFormat(position.price)} руб</td>
                    <td>{priceFormat(position.price * position.count)} руб</td>
                </tr>
            ));
            this.orderList = this.orderList.concat(custom_positions);
        }
    }


    getTable(order) {
        this.orderList = [];
        this.getItems(order);
        this.getHarpoons(order);
        this.getCustomPositions(order);
    }

    render() {
        const {order} = this.props;
        this.getTable(order);
        return (
            <div className="c-card">
                <div className="row">
                    <div className='col-12'>
                        <h5>Содержимое заказа</h5>
                    </div>
                </div>
                <br/>
                <div className="row">
                    <div className='col-12'>
                        <table className="table table-bordered table-hover">
                            <thead className="thead-light">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Артикул</th>
                                <th scope="col">Название</th>
                                <th scope="col">Количество</th>
                                <th scope="col">Цена</th>
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
                </div>


            </div>
        )
    }
}