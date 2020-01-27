import React, {Component} from 'react';

import {priceFormat, countFormat, getItemName, getArea, getItemArticle} from '../../../../../services/utils';
import history from '../../../../../history';
import {ITEM_MEMBRANE, ITEM_PRODUCT} from "../../../../../constans";

export default class ItemCardInSupply extends Component {

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
        const {item, number} = this.props;
        const itemUrl = item.item.color
            ? `/membranes/${item.item.id}`
            : `/products/${item.item.id}`;
        return (
            <tr onClick={() => history.push(itemUrl)}>
               <td data-label="№ товара: ">{number}</td>
               <td data-label="Артикул: ">{getItemArticle(item)}</td>
               <td data-label="Название: ">{getItemName(item)}</td>
               <td data-label="Количество: ">{countFormat(item.count)} {getArea(item)}</td>
               <td data-label="Цена: ">{priceFormat(item.purchase_price)}</td>
               <td data-label="Итог: ">{priceFormat(this.getItemPrice(item))}</td>
            </tr>
        )
    }
}