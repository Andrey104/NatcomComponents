import React from 'react';

import history from '../../../../../history';

export default class extends React.Component {

    handleClick = membrane => () => history.push(`/membranes/${membrane.id}`);

    render() {
        const {membrane, number} = this.props;
        return (
            <tr onClick={this.handleClick(membrane)}>
                <td>{membrane.vendor_code}</td>
                <td>{membrane.texture.description} {membrane.color.description} {membrane.name}</td>
                <td>{membrane.stocks[0].count}</td>
                <td>{membrane.price_standard}</td>
                <td>{membrane.price_standard_harpoon}</td>
            </tr>
        );
    }
}