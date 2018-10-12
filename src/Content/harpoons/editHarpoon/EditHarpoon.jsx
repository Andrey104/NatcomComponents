import React from 'react';
import {connect} from 'react-redux';

import HarpoonInfo from '../harpoonInfo/HarpoonInfo';
import {saveHarpoon, editHarpoon} from '../../../AC/harpoons';
import {getNewHarpoon, objectIsEmpty} from '../../../services/utils';

class EditHarpoon extends React.Component {
    membranesPrice;
    servicesPrice;
    backUrl;

    constructor(props) {
        super(props);
        const {harpoon} = this.props;
        const urlId = this.props.match.params.harpoonId;
        this.backUrl = `/harpoons/${urlId}`;
        this.checkHarpoon(harpoon, urlId);
        const newHarpoon = {};
        newHarpoon.services = this.getServices(harpoon);
        newHarpoon.servicesPrice = this.servicesPrice;
        newHarpoon.membranes = this.getMembranes(harpoon);
        newHarpoon.membranesPrice = this.membranesPrice;
        newHarpoon.files = this.getFiles(harpoon);
        newHarpoon.product = harpoon.harpoon_product.id;
        newHarpoon.comment = harpoon.comment;
        this.props.saveHarpoon({harpoon: newHarpoon, client: harpoon.client});
    }

    checkHarpoon = harpoon => {
        if (objectIsEmpty(harpoon)) {
            this.props.history.replace(this.backUrl);
        }
    };

    getServices = harpoon => {
        const {services} = harpoon;
        this.servicesPrice = 0;
        return services.map(harpoonService => {
            const service = harpoonService.service;
            service.price = Number(harpoonService.price);
            const count = Number(harpoonService.count);
            const servicePrice = service.price * count;
            this.servicesPrice += servicePrice;
            return {
                service,
                count,
                servicePrice
            };
        })
    };

    getMembranes = harpoon => {
        const {membranes} = harpoon;
        this.membranesPrice = 0;
        return membranes.map(harpoonMembrane => {
            const membrane = harpoonMembrane.membrane;
            membrane.price = Number(harpoonMembrane.price);
            const membraneLength = Number(harpoonMembrane.count);
            const square = Number(harpoonMembrane.square);
            const membranePrice = membrane.price * square;
            this.membranesPrice += membranePrice;
            return {
                membrane,
                membraneLength,
                square,
                membranePrice
            };
        });
    };

    getFiles = harpoon => {
        const {files} = harpoon;
        return files.map(harpoonFile => {
            const arr = harpoonFile.file.split('/');
            const file = arr[arr.length - 1];
            return {
                id: harpoonFile.id,
                file
            }
        })
    };

    handleSubmit = harpoon => {
        const newHarpoon = getNewHarpoon(harpoon);
        this.props.editHarpoon(this.props.harpoon.id, newHarpoon);
    };

    render() {
        return (
            <HarpoonInfo handleSubmit={this.handleSubmit}
                         backUrl={this.backUrl}/>
        )
    }
}

export default connect(state => ({
    harpoon: state.harpoons.harpoon
}), {saveHarpoon, editHarpoon})(EditHarpoon);