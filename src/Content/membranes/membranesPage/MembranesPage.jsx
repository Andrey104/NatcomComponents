import React from 'react';
import {connect} from 'react-redux';

import SearchInput from '../../../components/SearchInput';
import MembranesList from './membranesList/MembranesList';
import Loader from '../../../components/Loader';
import MembranesFilters from '../../../components/MembranesFilters';
import {getAllMembranes} from '../../../AC/membranes';
import {getAllColors, getAllTextures} from '../../../AC/parameters';
import {mapToArr} from '../../../helpers';

class MembranesPage extends React.Component {

    componentWillMount = () => {
        this.props.getAllColors();
        this.props.getAllTextures();
    };

    getParams = params => this.props.getAllMembranes(params);

    render() {
        const {colors, textures} = this.props;
        return (
            <div>
                <div className="row">
                    <div className="col-12">
                        <MembranesFilters colors={colors}
                                          textures={textures}
                                          getParams={this.getParams}/>
                    </div>
                </div>
                <MembranesList/>
            </div>
        )
    }
}

export default connect((state) => ({
    colors: mapToArr(state.parameters.colors),
    textures: mapToArr(state.parameters.textures),
}), {getAllColors, getAllTextures, getAllMembranes})(MembranesPage)