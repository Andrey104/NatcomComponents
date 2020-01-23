import React, {Component} from 'react';
import {getItemName, priceFormat} from '../../../../../../services/utils';

export default class extends Component {

    handleChangeItemParam = (event, index, state) => {
        let value = (event.target.value);
        let priceBest = Number(this.props.item.item.price_best);
        value.replace(',', '.');
        index--;
        this.props.handleChangeItemParam(value, index, state);
    };

    render() {
        const {item, number, itemPrice} = this.props;
        return (
            <tr>
                <td>{number}</td>
                <td>{getItemName(item)}</td>
                <td>{item.item.price_in} р</td>
                <td>
                <input type="number"
                       value={item.purchase_price || ''}
                       className="form-control"
                       onChange={e => this.handleChangeItemParam(e, number, 'purchase_price')}/>
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
                            onClick={() => this.props.removeItemFromList(number)}
                            className="btn btn-danger btn-sm">Удалить
                    </button>
                </td>
            </tr>
        )
    }
}