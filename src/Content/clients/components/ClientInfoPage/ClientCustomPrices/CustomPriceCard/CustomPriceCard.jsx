import React from 'react';

import {priceFormat} from '../../../../../../services/utils';

export default class extends React.Component {
    render() {
        const {item, number} = this.props;
        return (
            <tr>
                <td>{number}</td>
                <td>{item.item.name}</td>
                <td>{priceFormat(item.price)}</td>
                <td>
                    <button type="button"
                            onClick={() => this.props.openEditDialog(item)}
                            className="btn btn-dark btn-sm">Редактировать
                    </button>
                    <button type="button"
                            onClick={() => this.props.removeCustomPrice(item.id)}
                            className="btn btn-danger btn-sm">Удалить
                    </button>
                </td>
            </tr>
        )
    }
}