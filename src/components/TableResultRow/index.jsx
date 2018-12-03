import React from 'react';

import {priceFormat} from '../../services/utils';
import './styles.css';

export default class extends React.Component {
    render() {
        const {resultPrice, columnCount} = this.props;
        return (
            <tr>
                <td colSpan={columnCount}
                    className="result-price text-right">Сумма: {priceFormat(resultPrice)} руб
                </td>
            </tr>
        )
    }
}