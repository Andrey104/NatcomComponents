import React from 'react';

import {moneyFormat} from '../../services/utils';

export default class extends React.Component {

    getMembranePrice = membrane => {
        const membranePrice = Number(membrane.price || membrane.membrane.price);
        const membraneSquare = Number(membrane.square);
        return moneyFormat(membranePrice * membraneSquare);
    };

    getServicePrice = service => {
        const servicePrice = Number(service.price || service.service.price);
        const serviceCount = Number(service.count);
        return moneyFormat(servicePrice * serviceCount);
    };

    getHarpoonName(harpoon) {
        const harpoonsList = harpoon.membranes.map(membrane => (
            <div key={membrane.membrane.item}>
                <span>{membrane.membrane.name} ({this.getMembranePrice(membrane)})</span>
            </div>
        ));
        const servicesList = harpoon.services.map(service => (
            <div key={service.service.id}>
                <span>{service.service.name} ({this.getServicePrice(service)})</span>
            </div>
        ));
        return harpoonsList.concat(servicesList);
    }

    render() {
        const {harpoon} = this.props;
        return <td>{this.getHarpoonName(harpoon)}</td>
    }
}