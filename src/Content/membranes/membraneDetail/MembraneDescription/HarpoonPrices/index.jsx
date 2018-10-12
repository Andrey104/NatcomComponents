import React from 'react';

import {moneyFormat} from '../../../../../services/utils';
import './styles.css';

export default class extends React.Component {
    render() {
        const {membrane} = this.props;
        if (!membrane.can_harpoon) return null;
        return (
            <div className="prices-container">
                <h6>Цены для гарпуна</h6>
                <div className="prices-names">
                    <div>Цена стандартная</div>
                    <div>Цена средняя</div>
                    <div>Цена лучшая</div>
                </div>
                <div className="prices">
                    <div>{moneyFormat(membrane.price_standard_harpoon)}</div>
                    <div>{moneyFormat(membrane.price_good_harpoon)}</div>
                    <div>{moneyFormat(membrane.price_best_harpoon)}</div>
                </div>
            </div>
        )
    }
}