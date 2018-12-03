import React from 'react';

import {priceFormat} from '../../../services/utils';
import './styles.css';

export default class extends React.Component {
    render() {
        const {item} = this.props;
        return (
            <div className="prices-container">
                <h6>Цены</h6>
                <div className="prices-names">
                    <div>Цена стандартная</div>
                    <div>Цена средняя</div>
                    <div>Цена лучшая</div>
                </div>
                <div className="prices">
                    <div>{priceFormat(item.price_standard)}</div>
                    <div>{priceFormat(item.price_good)}</div>
                    <div>{priceFormat(item.price_best)}</div>
                </div>
            </div>
        )
    }
}