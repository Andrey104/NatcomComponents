import React from 'react';
import styles from './styles.css';
import {countFormat, priceFormat} from "../../../services/utils";

export default class extends React.Component {
    getSecondPrice() {
        const {membrane, selectMode, harpoonMode} = this.props;
        let price = null;

        if (selectMode) {
            price = null;
        } else {
            price = membrane.price_good_harpoon
        }

        if (price) {
            return (<td>{price}</td>)
        } else {
            return price
        }
    }

    getMainPrice() {
        const {membrane, selectMode, client,  harpoonMode} = this.props;
        let price = '';
        if (selectMode) {
            if (client){
                price = membrane.price
            } else {
                price = membrane.price_good
            }
        } else {
            price = membrane.price_good
        }
        return price
    }

    render() {
        const {membrane, selectMode, harpoonMode, handleClick} = this.props;
        if (harpoonMode && !membrane.can_harpoon) {
            return (
                <tr className="not-harpoon">
                    <td>{membrane.vendor_code}</td>
                    <td>{membrane.texture.description} {membrane.color.description} {membrane.name} ({membrane.width})
                    </td>
                    <td>{countFormat(membrane.stocks[0].count - membrane.stocks[0].reserve)}</td>
                    <td>{this.getMainPrice()}</td>
                    {this.getSecondPrice()}
                </tr>
            );
        }
        return (
            <tr onClick={handleClick(membrane)}>
                <td>{membrane.vendor_code}</td>
                <td>{membrane.texture.description} {membrane.color.description} {membrane.name} ({membrane.width})</td>
                <td>{countFormat(membrane.stocks[0].count - membrane.stocks[0].reserve)}</td>
                <td>{this.getMainPrice()}</td>
                {this.getSecondPrice()}
            </tr>
        );
    }
}