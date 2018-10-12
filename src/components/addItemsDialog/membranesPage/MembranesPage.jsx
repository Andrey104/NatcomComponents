import React from 'react'
import {connect} from 'react-redux';

import MembranesFilters from '../../MembranesFilters';
import MembranesList from './MembranesList';
import {getAllMembranes} from '../../../AC/membranes';
import {getAllColors, getAllTextures} from '../../../AC/parameters';
import {mapToArr} from '../../../helpers';

class MembranesPage extends React.Component {

    componentWillMount = () => {
        const {membranes} = this.props;
        if (!membranes.length) {
            this.props.getAllColors();
            this.props.getAllTextures();
            this.props.getAllMembranes();
        }
    };

    getFilterParams = params => this.props.getAllMembranes(params);

    render() {
        const {colors, textures, membranes} = this.props;
        return (
            <div>
                <MembranesFilters colors={colors}
                                  textures={textures}
                                  getParams={this.getFilterParams}/>
                <MembranesList currentItems={this.props.currentItems}
                               membranes={membranes}
                               handleSelectItems={this.props.handleSelectItems}/>
            </div>
        )
    }
}

export default connect(state => ({
    membranes: mapToArr(state.membranes.entries),
    colors: mapToArr(state.parameters.colors),
    textures: mapToArr(state.parameters.textures),
}), {getAllTextures, getAllColors, getAllMembranes})(MembranesPage);