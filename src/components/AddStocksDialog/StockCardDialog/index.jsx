import React from 'react';

import {checkMainStock} from '../../../services/utils';

export default class extends React.Component {

    handleSelectStock = (event, stock) => this.props.handleSelectStock(event, stock);

    render() {
        const {stock} = this.props;
        return (
            <tr>
                <td>{stock.name}</td>
                <td>{stock.address}</td>
                <td>{checkMainStock(stock.main)}</td>
                <td>
                    <input type="checkbox"
                           onChange={e => this.handleSelectStock(e, stock)}/>
                </td>
            </tr>
        )
    }
}