import React from 'react';

import {priceFormat} from '../../../../services/utils';

export default class extends React.Component {

    getPrepayment = () => {
        const {harpoonsResultPrice, itemsPrepayment} = this.props;
        return harpoonsResultPrice + itemsPrepayment;
    };

    getResultPrice = () => {
        const {harpoonsResultPrice, itemsResultPrice, customPositionsResultPrice} = this.props;
        return harpoonsResultPrice + itemsResultPrice + customPositionsResultPrice;
    };

    render() {
        return (
            <div className="col-sm-12 text-right">
                <h4>Предоплата: {priceFormat(this.getPrepayment())}</h4>
                <h4>Итог: {priceFormat(this.getResultPrice())}</h4>
            </div>
        )
    }
}