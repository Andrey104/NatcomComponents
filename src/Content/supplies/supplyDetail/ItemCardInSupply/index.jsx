import React from 'react';

import {priceFormat, countFormat} from '../../../../services/utils';
import history from '../../../../history';

export default class extends React.Component {
    render() {
        const {item, number, itemPrice} = this.props;
        const itemUrl = item.item.color
            ? `/membranes/${item.item.id}`
            : `/products/${item.item.id}`;
        return (
            <tr onClick={() => history.push(itemUrl)}>
               <td>{number}</td>
               <td>{item.item.name}</td>
               <td>{countFormat(item.count)}</td>
               <td>{priceFormat(item.purchase_price)}</td>
               <td>{priceFormat(itemPrice)}</td>
            </tr>
        )
    }
}