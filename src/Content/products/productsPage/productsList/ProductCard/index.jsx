import React from 'react';

import history from '../../../../../history';
import {units} from '../../../../../constans';
import {checkPrepayment} from '../../../../../services/utils';

export default class extends React.Component {

    handleClick = productId => () => history.push(`/products/${productId}`);

    render() {
        const {product, number} = this.props;
        return (
            <tr onClick={this.handleClick(product.id)}>
                <td>{number}</td>
                <td>{product.name}</td>
                <td>{product.vendor_code}</td>
                <td>{units[product.unit - 1]}</td>
                <td>{checkPrepayment(product.requires_prepayment)}</td>
            </tr>
        )
    }
}