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
                <td data-label="№ ">
                    <div className="number-block">
                        <img className="circle-button"
                             src="/public/remove.svg"
                             onClick={() => this.props.removeItemFromList(number)}>
                        </img>
                        {number}
                    </div>
                </td>
                <td data-label="Название: ">{getItemName(item)}</td>
                <td data-label="Цена пред. закупки: ">{item.item.price_in} р</td>
                <td data-label="Цена закупки: ">
                    <input type="number"
                           value={item.purchase_price || ''}
                           className="form-control"
                           onChange={e => this.handleChangeItemParam(e, number, 'purchase_price')}/>
                </td>
                <td data-label="Кол-во: ">
                    <input type="number"
                           value={item.count || ''}
                           className="form-control right"
                           onChange={e => this.handleChangeItemParam(e, number, 'count')}/>
                </td>
                <td data-label="Итог: " className="result-price-td">{priceFormat(itemPrice)} руб</td>
            </tr>
        )
    }
}