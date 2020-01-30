import React from 'react';

import TableResultRow from '../../../../components/TableResultRow';
import HarpoonName from '../../../../components/HarpoonName';
import {priceFormat, countFormat, getUnit, getPositionSumPriceNotInItem, getArea} from '../../../../services/utils';
import history from '../../../../history';
import {ITEM_MEMBRANE, ITEM_PRODUCT, units} from "../../../../constans";

class TableOrderInfo extends React.Component {
    orderList;

    getItemName(inItem) {
        let item = inItem.item;
        if (item.type === ITEM_PRODUCT) {
            return (<td data-label="Название: ">{item.name}</td>);
        }
        if (item.type === ITEM_MEMBRANE) {
            return (<td data-label="Название: ">{item.texture.description} {item.color.description} {item.name} ({item.width})</td>);
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
                            <th data-label="№: " scope="row">{index + orderListLength}</th>
                            <td data-label="Артикул: ">{item.item.vendor_code}</td>
                            {this.getItemName(item)}
                            <td data-label="Количество: ">{priceFormat(item.count)} {getUnit(item)}{getArea(item)}</td>
                            <td data-label="Цена: ">{priceFormat(item.price)} руб</td>
                            <td data-label="Стоимость: ">{getPositionSumPriceNotInItem(item)} руб</td>
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
                    <th data-label="№: " scope="row">{index + orderListLength}</th>
                    <td data-label="Артикул: ">Г {harpoon.id}</td>
                    <HarpoonName harpoon={harpoon}/>
                    <td data-label="Количество: " className="text-center">-</td>
                    <td data-label="Цена: " className="text-center">-</td>
                    <td data-label="Стоимость: ">{priceFormat(harpoon.sum)} руб</td>
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
                    <th data-label="№: " scope="row">{index + orderListLength}</th>
                    <td data-label="Артикул: ">ДОП</td>
                    <td data-label="Название: ">{position.name}</td>
                    <td data-label="Количество: ">{countFormat(position.count)} {units[position.unit]}</td>
                    <td data-label="Цена: ">{priceFormat(position.price)} руб</td>
                    <td data-label="Стоимость: ">{priceFormat(position.price * position.count)} руб</td>
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
            <div>
                <div className="row">
                    <div className='col-12'>
                        <h5>Содержимое заказа</h5>
                    </div>
                </div>
                <br/>
                <div className="row">
                    <div className='col-12'>
                        <div className="mobile-table-container">
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


            </div>
        )
    }
}

export default TableOrderInfo