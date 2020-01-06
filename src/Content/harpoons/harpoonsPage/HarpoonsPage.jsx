import React from 'react';
import {connect} from 'react-redux';

import HarpoonsList from './harpoonsList/HarpoonsList';
import SearchAndDateFilters from '../../../components/SearchAndDateFilters/SearchAndDateFilters';
import {getAllHarpoons} from '../../../AC/harpoons';

class HarpoonsPage extends React.Component {

    getFilterParams = params => this.props.getAllHarpoons(params);

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-12">
                        <SearchAndDateFilters getFilterParams={this.getFilterParams}/>
                    </div>
                    <div className="col-12">
                        <HarpoonsList/>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(null, {getAllHarpoons})(HarpoonsPage)