import React from 'react';
import {connect} from 'react-redux';

import AssembliesList from './assembliesList/AssembliesList';
import SearchAndDateFilters from '../../../components/SearchAndDateFilters/SearchAndDateFilters';
import {getAllAssemblies} from '../../../AC/assemblies';

class AssembliesPage extends React.Component {

    getFilterParams = params => this.props.getAllAssemblies(params);

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-12">
                        <SearchAndDateFilters getFilterParams={this.getFilterParams}/>
                    </div>
                    <div className="col-12">
                        <AssembliesList/>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(null, {getAllAssemblies})(AssembliesPage)