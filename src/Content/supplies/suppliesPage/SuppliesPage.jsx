import React from 'react';
import {connect} from 'react-redux';

import SuppliesList from './suppliesList/SuppliesList';
import SearchAndDateFilters from '../../../components/SearchAndDateFilters';
import {getAllSupplies} from '../../../AC/supplies';

class SuppliesPage extends React.Component {

    getFilterParams = params => this.props.getAllSupplies(params);

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-12">
                        <SearchAndDateFilters getFilterParams={this.getFilterParams}/>
                    </div>
                    <div className="col-12">
                        <SuppliesList/>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(null, {getAllSupplies})(SuppliesPage)