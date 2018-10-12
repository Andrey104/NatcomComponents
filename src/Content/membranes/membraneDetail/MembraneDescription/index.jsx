import React from 'react';

import ItemPrices from '../../../../components/itemDetail/ItemPrices';
import HarpoonPrices from './HarpoonPrices';
import MembraneParameters from './MembraneParameters';

export default class extends React.Component {
    render() {
        const {membrane} = this.props;
        return (
            <div>
                <h3>{membrane.name}</h3>
                <h5>Артикул {membrane.vendor_code}</h5>
                <h5>Баркод {membrane.barcode}</h5>
                <ItemPrices item={membrane}/>
                <HarpoonPrices membrane={membrane}/>
                <MembraneParameters membrane={membrane}/>
            </div>
        )
    }
}