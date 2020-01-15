import React, {Component} from 'react';
import {getItemName, priceFormat} from '../../../../../services/utils';
//import PriceInput from '../../../../../components/PriceInput/PriceInput';

export default class extends Component {

    handleChangeItemParam = (event, index, state) => {
        let value = (event.target.value);
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
                       step="0.01"
                       onChange={e => this.handleChangeItemParam(e, number, 'purchase_price')}/>
            </td>
                <td>
                    <input type="number"
                           value={item.count || ''}
                           className="form-control"
                           step="0.01"
                           onChange={e => this.handleChangeItemParam(e, number, 'count')}/>
                </td>
                {/*<td>*/}
                {/*    <PriceInput value={item.purchase_price || ''}*/}
                {/*                number={number}*/}
                {/*                state={'purchase_price'}*/}
                {/*                placeholder='Введите цену'*/}
                {/*                handleChangeItemParam={this.props.handleChangeItemParam}/>*/}
                {/*</td>*/}
                {/*<td>*/}
                {/*    <PriceInput value={item.count || ''}*/}
                {/*                number={number}*/}
                {/*                state={'count'}*/}
                {/*                placeholder='Введите кол-во'*/}
                {/*                handleChangeItemParam={this.props.handleChangeItemParam}/>*/}
                {/*</td>*/}
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