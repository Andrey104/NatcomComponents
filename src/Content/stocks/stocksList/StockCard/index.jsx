import React from 'react';

import {checkMainStock} from '../../../../services/utils';

export default class extends React.Component {

    handleClick = stockId => () => {
        this.props.history.push(`/stocks/${stockId}`);
    };

    render() {
        const {stock} = this.props;
        return (
            <tr onClick={this.handleClick(stock.id)}
                className="hover-element">
                <td>{stock.name}</td>
                <td>{stock.address}</td>
                <td>{checkMainStock(stock.main)}</td>
            </tr>
        )
    }
}