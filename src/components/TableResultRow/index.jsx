import React from 'react';

import {moneyFormat} from '../../services/utils';
import './styles.css';

export default class extends React.Component {
    render() {
        const {resultPrice, columnCount} = this.props;
        return (
            <tr>
                <td colSpan={columnCount}
                    className="result-price text-right">Сумма: {(resultPrice)}руб!!!
                </td>
            </tr>
        )
    }
}