import React from 'react';
import {connect} from 'react-redux';

import SearchInput from '../SearchInput';
import SelectParameters from '../SelectParameters';
import {saveMembranesFilters} from '../../AC/membranes';

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

    searchMembranes = text => {
        this.searchText = text;
        this.getFilterMembranes();
    };

    selectColor = colorId => {
        this.color = colorId === -1 ? null : colorId;
        this.getFilterMembranes();
    };

    selectTexture = textureId => {
        this.texture = textureId === -1 ? null : textureId;
        this.getFilterMembranes();
    };

    selectHarpoon = event => {
        this.harpoon = event.target.checked;
        this.getFilterMembranes();
    };

    getFilterMembranes = () => {
        let url = '';
        if (this.searchText) url += `text=${this.searchText}&`;
        if (this.color) url += `color=${this.color}&`;
        if (this.texture) url += `texture=${this.texture}&`;
        if (this.harpoon) url += `harpoon=${this.harpoon}&`;
        if (this.props.client) url += `client=${this.props.client.id}&`;
        if (url) {
            url = '?' + url.slice(0, url.length - 1);
        }
        this.props.getParams(url);
    };
    render() {
        const {textures, colors} = this.props;
        if (!colors.length || !textures.length) {
            return null;
        }
        return (
            <div className="row align-items-center">
                <div className="col-6">
                    <SearchInput search={this.searchMembranes}
                                 defaultValue={this.searchText}/>
                    <div className="form-group form-check">
                        <input type="checkbox"
                               defaultChecked={this.harpoon}
                               className="form-check-input"
                               onChange={this.selectHarpoon}
                               id="harpoon"/>
                        <label className="form-check-label"
                               htmlFor="harpoon">Как гарпун</label>
                    </div>
                </div>
                <div className="col-6">
                    <SelectParameters colors={colors}
                                      textures={textures}
                                      defaultColor={this.color}
                                      defaultTexture={this.texture}
                                      selectColor={this.selectColor}
                                      selectTexture={this.selectTexture}/>
                </div>
            </div>
        )
    }

    componentWillUnmount() {
        const filters = {
            searchText: this.searchText,
            color: this.color,
            texture: this.texture,
            harpoon: this.harpoon
        };
        this.props.saveMembranesFilters(filters);
    }
}

export default connect(state => ({
    filters: state.membranes.filters
}), {saveMembranesFilters})(MembranesFilters)