import React from 'react';

import history from '../../../history';
import {units} from '../../../constans';


export default class ProductCard extends React.Component {

    render() {
        const {product, selectMode, handleClick} = this.props;
        let price = '';
        if (selectMode) {
            price = product.price
        } else {
            price = product.price_standard
        }
        return (
            <tr onClick={handleClick(product)}>
                <td>{product.vendor_code}</td>
                <td>{product.name}</td>
                <td>{product.stocks[0].count} ({units[product.unit - 1]})</td>
                <td>{price}</td>
            </tr>
        )
    }

}
