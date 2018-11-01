import React from 'react';

import history from '../../../../../history';
import {units} from '../../../../../constans';
import {checkPrepayment} from '../../../../../services/utils';
import styles from './styles.css';
import connect from "react-redux/es/connect/connect";

export default class ProductCard extends React.Component {

    handleClick = productId => () => history.push(`/products/${productId}`);

    // findStockById(element, index, array) {
    //     if (element.id === this.props.stock) {
    //         return element;
    //     } else {
    //         return false;
    //     }
    // }

    render() {
        const {product} = this.props;
        return (
            <tr onClick={this.handleClick(product.id)}>
                <td>{product.vendor_code}</td>
                <td>{product.name}</td>
                <td>{product.stocks[0].count} ({units[product.unit - 1]})</td>
                <td>{product.price_standard}</td>
            </tr>
        )
    }

}
