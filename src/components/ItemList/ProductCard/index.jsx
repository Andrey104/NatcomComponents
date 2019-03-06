import React from 'react';

import history from '../../../history';
import {units} from '../../../constans';
import {countFormat} from "../../../services/utils";


export default class ProductCard extends React.Component {

    render() {
        const {product, selectMode, client, handleClick} = this.props;
        let price = '';
        if (selectMode) {
            if (client){
                price = product.price
            } else {
                price = product.price_good
            }
        } else {
            price = product.price_good
        }
        return (
            <tr onClick={handleClick(product)}>
                <td>{product.vendor_code}</td>
                <td>{product.name}</td>
                <td>{countFormat(product.stocks[0].count - product.stocks[0].reserve)} ({units[product.unit - 1]})</td>
                <td>{price}</td>
            </tr>
        )
    }

}
