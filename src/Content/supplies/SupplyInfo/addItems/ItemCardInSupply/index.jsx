import React from 'react';

import {getItemName, priceFormat} from '../../../../../services/utils';

export default class extends React.Component {

    handleChangeItemParam = (event, index, state) => {
        var value = (event.target.value);
        value.replace(',', '.');
        // if (!isFinite(value)) return;
        index--;
        this.props.handleChangeItemParam(value, index, state);
    };

    render() {
        const {item, number, itemPrice} = this.props;
        console.log(item);
        return (
            <tr>
                <td>{number}</td>
                <td>{getItemName(item)}</td>
                <td>{item.item.price_in} р</td>
                <td>
                    <input type="number"
                           value={item.purchasePrice || ''}
                           className="form-control"
                           onChange={e => this.handleChangeItemParam(e, number, 'purchasePrice')}/>
                </td>
                <td>
                    <input type="number"
                           value={item.count || ''}
                           className="form-control"
                           onChange={e => this.handleChangeItemParam(e, number, 'count')}/>
                </td>
                <td className="result-price-td">{priceFormat(itemPrice)} руб</td>
                <td>
                    <button type="button"
                            onClick={() => this.props.removeItemFromList(item)}
                            className="btn btn-danger btn-sm">Удалить
                    </button>
                </td>
            </tr>
        )
    }
}