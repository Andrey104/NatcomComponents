import React from 'react';

import {priceFormat, countFormat, getItemName, getArea} from '../../../../services/utils';
import history from '../../../../history';
import {ITEM_MEMBRANE, ITEM_PRODUCT} from "../../../../constans";

export default class extends React.Component {

    getItemPrice(inItem) {
        let item = inItem.item;
        if (item.type === ITEM_PRODUCT) {
            return inItem.count * inItem.purchase_price;
        }
        if (item.type === ITEM_MEMBRANE) {
            return inItem.count * inItem.purchase_price * item.width;
        }
    }
    render() {
        const {item, number, itemPrice} = this.props;
        const itemUrl = item.item.color
            ? `/membranes/${item.item.id}`
            : `/products/${item.item.id}`;
        return (
            <tr onClick={() => history.push(itemUrl)}>
               <td>{number}</td>
               <td>{getItemName(item)}</td>
               <td>{countFormat(item.count)} {getArea(item)}</td>
               <td>{priceFormat(item.purchase_price)}</td>
               <td>{priceFormat(this.getItemPrice(item))}</td>
            </tr>
        )
    }
}