import React from 'react'
import {connect} from 'react-redux';

import MembranesFilters from '../../../../../../components/MembranesFilters';
import MembranesList from './MembranesList';
import {mapToArr} from '../../../../../../helpers';
import {getAllClientMembranesWithStocks} from '../../../../../../AC/membranes';
import {getAllColors, getAllTextures} from '../../../../../../AC/parameters';

class MembranesPage extends React.Component {

    componentWillMount = () => {
        const {client, membranes, filters} = this.props;
        if (!membranes.length && !filters) {
            const url = `?client=${client.id}`;
            this.props.getAllColors();
            this.props.getAllTextures();
            this.props.getAllClientMembranesWithStocks(url);
        }
    };

    getFilterParams = params => {
        this.props.getAllClientMembranesWithStocks(params);
    };

    render() {
        const {colors, textures, membranes} = this.props;
        return (
            <div>
                <MembranesFilters client={this.props.client}
                                  colors={colors}
                                  textures={textures}
                                  getParams={this.getFilterParams}/>
                <MembranesList membranes={membranes}
                               getItemCount={this.props.getItemCount}
                               handleSubmit={this.props.handleSubmit}/>
            </div>
        )
    }
}

export default connect(state => ({
    membranes: mapToArr(state.membranes.entries),
    colors: mapToArr(state.parameters.colors),
    textures: mapToArr(state.parameters.textures),
    filters: state.membranes.filters
}), {getAllTextures, getAllColors, getAllClientMembranesWithStocks})(MembranesPage);