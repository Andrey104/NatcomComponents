import React from 'react';

import {moneyFormat} from '../../../../services/utils';

export default class extends React.Component {

    getPrepayment = () => {
        const {harpoonsResultPrice, itemsPrepayment} = this.props;
        return harpoonsResultPrice + itemsPrepayment;
    };

    getResultPrice = () => {
        const {harpoonsResultPrice, itemsResultPrice} = this.props;
        return harpoonsResultPrice + itemsResultPrice;
    };

    render() {
        return (
            <div className="col-sm-12 text-right">
                <h4>Предоплата: {moneyFormat(this.getPrepayment())}</h4>
                <h4>Итог: {moneyFormat(this.getResultPrice())}</h4>
            </div>
        )
    }
}