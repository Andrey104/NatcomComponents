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

    getMembraneNamePrint(inMembrane) {
        const membrane = inMembrane.membrane;

        return (
            <p className="font-weight-bold">
                <div className="membrane-params">{membrane.texture.description} {membrane.color.description}</div>
                <div className="membrane-name"> {membrane.name} </div>
                <div className="membrane-params"> ({membrane.width})</div>
                <div className="membrane-params"> *{inMembrane.count} </div>
            </p>
        );
    }

    getHarpoonName(harpoon) {
        const harpoonsList = harpoon.membranes.map((membrane, index) => (
            <div key={membrane.membrane.id + index + membrane.membrane.name}>
                <span>{this.getMembraneNamePrint(membrane)} == [{membrane.square}м²]</span>
            </div>
        ));
        const servicesList = harpoon.services.map(service => (
            <div key={service.service.id}>
                <span>{service.service.name} [{service.count} {service.service.unit}]</span>
            </div>
        ));
        return harpoonsList.concat(servicesList);
    }

    render() {
        const {harpoon} = this.props;
        return <td>
            <p className="font-weight-bold"><h5>Гарпун:</h5> {this.getHarpoonName(harpoon)}</p>
        </td>
    }
}