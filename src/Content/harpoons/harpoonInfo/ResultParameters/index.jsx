import React from 'react';

import {priceFormat} from '../../../../services/utils';

export default class extends React.Component {

    getHarpoonSize() {
        const {membranes, services} = this.props;
        let harpoonSize = 0;
        for (const membrane of membranes) {
            harpoonSize += (Number(membrane.membrane.width) + membrane.membraneLength) * 2;
        }
        if (services.length) {
            for (const service of services) {
                if (service.service.type === 1) {
                    harpoonSize -= 2 * service.count;
                } else if (service.service.type === 2) {
                    harpoonSize += service.count;
                }
            }
        }
        return harpoonSize;
    }

    render() {
        const {resultHarpoonPrice} = this.props;
        return (
            <div>
                <div className="text-right">
                    <h4>Размер гарпуна: {this.getHarpoonSize()} м</h4>
                </div>
                <div className="text-right harpoon-result-price">
                    <h4>Итог: {priceFormat(resultHarpoonPrice)}</h4>
                </div>
            </div>
        )
    }
}