import React from 'react';

import history from '../../../history';

export default class extends React.Component {
    getSecondPrice() {
        const {membrane, selectMode, harpoonMode} = this.props;
        let price = null;

        if (selectMode) {
            price = null;
        } else {
            price = membrane.price_standard_harpoon
        }

        if (price) {
            return (<td>{price}</td>)
        } else {
            return price
        }
    }

    getMainPrice() {
        const {membrane, selectMode, harpoonMode} = this.props;
        let price = '';
        if (selectMode) {
            if (harpoonMode) {
                price = membrane.price_harpoon //!!
            } else {
                price = membrane.price
            }
        } else {
            price = membrane.price_standard
        }
        return price
    }

    render() {
        const {membrane, selectMode, harpoonMode, handleClick} = this.props;

        return (
            <tr onClick={handleClick(membrane)}>
                <td>{membrane.vendor_code}</td>
                <td>{membrane.texture.description} {membrane.color.description} {membrane.name} ({membrane.width})</td>
                <td>{membrane.stocks[0].count}</td>
                <td>{this.getMainPrice()}</td>
                {this.getSecondPrice()}
            </tr>
        );
    }
}