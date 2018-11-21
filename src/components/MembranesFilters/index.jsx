import React from 'react';
import {connect} from 'react-redux';

import SearchInput from '../SearchInput';
import SelectParameters from '../SelectParameters';
import {getAllMembranes, saveMembranesFilters} from '../../AC/membranes';
import {mapToArr} from "../../helpers";
import {getAllColors, getAllTextures} from "../../AC/parameters";

class MembranesFilters extends React.Component {
    searchText = '';
    color;
    texture;
    harpoon = false;

    constructor(props) {
        super(props);
        const {filters} = this.props;
        if (filters) {
            this.searchText = filters.searchText;
            this.color = filters.color;
            this.texture = filters.texture;
            this.harpoon = filters.harpoon;
        }
    }

    componentDidMount() {
        this.props.getAllColors();
        this.props.getAllTextures();
    }

    searchMembranes = text => {
        this.searchText = text;
        this.updateFilters();
    };

    selectColor = colorId => {
        this.color = colorId === -1 ? null : colorId;
        this.updateFilters();
    };

    selectTexture = textureId => {
        this.texture = textureId === -1 ? null : textureId;
        this.updateFilters();
    };

    render() {
        const {textures, colors} = this.props;
        return (
            <div>

                <div className="row">
                    <div className="col">
                        <SearchInput search={this.searchMembranes}
                                     defaultValue={this.searchText}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <SelectParameters colors={colors}
                                          textures={textures}
                                          defaultColor={this.color}
                                          defaultTexture={this.texture}
                                          selectColor={this.selectColor}
                                          selectTexture={this.selectTexture}/>
                    </div>
                </div>
            </div>
        )
    }

    updateFilters() {
        const filters = {
            searchText: this.searchText,
            color: this.color,
            texture: this.texture,
            harpoon: this.harpoon
        };
        this.props.saveMembranesFilters(filters);
        this.props.getAllMembranes(filters, this.props.storeClient);
    }
}

export default connect(state => ({
    filters: state.membranes.filters,
    colors: mapToArr(state.parameters.colors),
    textures: mapToArr(state.parameters.textures),
    storeClient: state.products.client,
}), {
    saveMembranesFilters,
    getAllMembranes,
    getAllTextures,
    getAllColors
})(MembranesFilters)