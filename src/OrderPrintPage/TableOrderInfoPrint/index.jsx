import React from 'react';
import './styles.css';

import TableResultRow from '../../components/TableResultRow';
import HarpoonPrintName from '../HarpoonPrintName';
import {priceFormat, countFormat, getUnit, getPositionSumPriceNotInItem} from '../../services/utils';
import history from '../../history';
import {ITEM_MEMBRANE, ITEM_PRODUCT, units} from "../../constans";

export default class extends React.Component {
    orderList;

    getItemName(inItem) {
        let item = inItem.item;
        if (item.type === ITEM_PRODUCT) {
            return (<td><p className="font-weight-bold">{item.name}</p></td>);
        }
        if (item.type === ITEM_MEMBRANE) {
            return (
                <td>
                    <p className="font-weight-bold">
                        <div className="membrane-params">{item.texture.description} {item.color.description}</div>
                        <div className="membrane-name"> {item.name} </div>
                        <div className="membrane-params"> ({item.width}) </div>
                    </p>
                </td>);
        }
    }

    getItems(order) {
        if (order.items) {
            const orderListLength = this.orderList.length + 1;
            const items = order.items.map((item, index) => {
                    return (
                        <tr key={item.item.id + item.item.name + index}>
                            <th scope="row"><p className="font-weight-bold">{index + orderListLength}</p></th>
                            <td><p className="font-weight-bold">{item.item.vendor_code}</p></td>
                            {this.getItemName(item)}
                            <td><p className="font-weight-bold">{priceFormat(item.count)} {getUnit(item)}</p></td>
                            <td><p className="font-weight-bold">{priceFormat(item.price)} руб</p></td>
                            <td><p className="font-weight-bold">{getPositionSumPriceNotInItem(item)}</p></td>
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
                <tr key={harpoon.id + index}>
                    <th scope="row"><p className="font-weight-bold">{index + orderListLength}</p></th>
                    <td><p className="font-weight-bold">Г {harpoon.id}</p></td>
                    <HarpoonPrintName harpoon={harpoon}/>
                    <td className="text-center">-</td>
                    <td className="text-center">-</td>
                    <td><p className="font-weight-bold">{priceFormat(harpoon.sum)} руб</p></td>
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
                    <th scope="row"><p className="font-weight-bold">{index + orderListLength}</p></th>
                    <td><p className="font-weight-bold">ДОП</p></td>
                    <td><p className="font-weight-bold">{position.name}</p></td>
                    <td><p className="font-weight-bold">{countFormat(position.count)} {units[position.unit]}</p></td>
                    <td><p className="font-weight-bold">{priceFormat(position.price)} руб</p></td>
                    <td><p className="font-weight-bold">{priceFormat(position.price * position.count)} руб</p></td>
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
            <div className="row">
                <table className="table table-bordered">
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
        )
    }
}