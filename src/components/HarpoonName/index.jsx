import React from 'react';
import PropTypes from 'prop-types';

import {getMembraneName, getMembranePrice, priceFormat} from '../../services/utils';
import {getMembrane} from "../../AC/membranes";

export default class extends React.Component {

    static propTypes = {
        harpoon: PropTypes.object
    };

    getMembranePositionSum = membrane => {
        return getMembranePrice(membrane);
    };

    getServicePositionSum = service => {
        const servicePrice = Number(service.price || service.service.price);
        const serviceCount = Number(service.count);
        return priceFormat(servicePrice * serviceCount);
    };

    getHarpoonMembraneName(membrane, index) {
        if (membrane.membrane.real_area_calculation) {
            return (
                <span>{index + 1}) {getMembraneName(membrane)}*{membrane.count} [{membrane.real_area}м²]
                    = {this.getMembranePositionSum(membrane)} руб</span>
            );
        } else {
            return (
                <span>{index + 1}) {getMembraneName(membrane)}*{membrane.count} [{membrane.square}м²]
                    = {this.getMembranePositionSum(membrane)} руб</span>
            );
        }
    }

    getHarpoonName(harpoon) {
        const harpoonsList = harpoon.membranes.map((membrane, index) => (
            <div key={membrane.membrane.id + index + membrane.membrane.name}>
                {this.getHarpoonMembraneName(membrane, index)}
            </div>
        ));
        const servicesList = harpoon.services.map(service => (
            <div key={service.service.id}>
                <span>{service.service.name} [{service.count} {service.service.unit}]
                    = {this.getServicePositionSum(service)} руб</span>
            </div>
        ));
        return harpoonsList.concat(servicesList);
    }

    render() {
        const {harpoon} = this.props;
        return <td>{this.getHarpoonName(harpoon)}</td>
    }
}