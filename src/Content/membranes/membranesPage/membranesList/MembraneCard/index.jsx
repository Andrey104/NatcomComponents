import React from 'react';

import history from '../../../../../history';

export default class extends React.Component {

    handleClick = membrane => () => history.push(`/membranes/${membrane.id}`);

    render() {
        const {membrane, number} = this.props;
        return (
            <tr onClick={this.handleClick(membrane)}>
                <td>{number}</td>
                <td>{membrane.name}</td>
                <td>{membrane.vendor_code}</td>
                <td>{membrane.color.description}</td>
                <td>{membrane.texture.description}</td>
            </tr>
        );
    }
}