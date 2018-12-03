import React from 'react';
import PropTypes from 'prop-types';

import {getMembraneName, priceFormat} from '../../services/utils';
import {getMembrane} from "../../AC/membranes";

export default class extends React.Component {

    static propTypes = {
        harpoon: PropTypes.object
    };

    getMembranePositionSum = membrane => {
        const membranePrice = Number(membrane.price || membrane.membrane.price);
        const membraneSquare = Number(membrane.square);
        return priceFormat(membranePrice * membraneSquare);
    };

    getServicePositionSum = service => {
        const servicePrice = Number(service.price || service.service.price);
        const serviceCount = Number(service.count);
        return priceFormat(servicePrice * serviceCount);
    };

    getHarpoonName(harpoon) {
        const harpoonsList = harpoon.membranes.map(membrane => (
            <div key={membrane.membrane.item}>
                <span>{getMembraneName(membrane)}*{membrane.count} [{membrane.square}м²] = {this.getMembranePositionSum(membrane)} руб</span>
            </div>
        ));
        const servicesList = harpoon.services.map(service => (
            <div key={service.service.id}>
                <span>{service.service.name} [{service.count} {service.service.unit}] = {this.getServicePositionSum(service)} руб</span>
            </div>
        ));
        return harpoonsList.concat(servicesList);
    }

    render() {
        const {harpoon} = this.props;
        return <td>{this.getHarpoonName(harpoon)}</td>
    }
}