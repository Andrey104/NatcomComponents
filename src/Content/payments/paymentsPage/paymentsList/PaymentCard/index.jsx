import React from 'react';

import {getDate, priceFormat, paymentTypes} from '../../../../../services/utils';

export default class extends React.Component {

    render() {
        const {payment, number} = this.props;
        return (
            <tr>
                <td>{number}</td>
                <td>{payment.client.first_name} {payment.client.last_name}</td>
                <td>{getDate(payment.auto_date)}</td>
                <td>{paymentTypes[payment.payment_type - 1]}</td>
                <td>{priceFormat(payment.sum)}</td>
            </tr>
        )
    }

}