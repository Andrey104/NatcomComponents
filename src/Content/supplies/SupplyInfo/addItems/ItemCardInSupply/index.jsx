import React from 'react';

import {moneyFormat} from '../../../../../services/utils';

export default class extends React.Component {

    handleChangeItemParam = (event, index, state) => {
        const value = Number(event.target.value);
        if (!isFinite(value)) return;
        index--;
        this.props.handleChangeItemParam(value, index, state);
    };

    render() {
        const {item, number, itemPrice} = this.props;
        return (
            <tr>
                <td>{number}</td>
                <td>{item.item.name}</td>
                <td>
                    <input type="text"
                           value={item.purchasePrice}
                           className="form-control"
                           onChange={e => this.handleChangeItemParam(e, number, 'purchasePrice')}/>
                </td>
                <td>
                    <input type="text"
                           value={item.count}
                           className="form-control"
                           onChange={e => this.handleChangeItemParam(e, number, 'count')}/>
                </td>
                <td className="result-price-td">{moneyFormat(itemPrice)}</td>
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