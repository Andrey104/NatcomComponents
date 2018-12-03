import React from 'react';
import styles from './styles.css';

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
            price = membrane.price
        } else {
            price = membrane.price_standard
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
                    <td>{membrane.stocks[0].count}</td>
                    <td>{this.getMainPrice()}</td>
                    {this.getSecondPrice()}
                </tr>
            );
        }
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