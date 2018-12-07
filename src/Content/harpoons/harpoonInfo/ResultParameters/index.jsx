import React from 'react';

import {priceFormat} from '../../../../services/utils';

export default class extends React.Component {

    render() {
        const {resultHarpoonPrice} = this.props;
        return (
            <div>
                <div className="text-right harpoon-result-price">
                    <h4>Итог: {priceFormat(resultHarpoonPrice)}</h4>
                </div>
            </div>
        )
    }
}