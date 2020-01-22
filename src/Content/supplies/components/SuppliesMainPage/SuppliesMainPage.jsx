import React, {Component} from 'react';
import {connect} from 'react-redux';

import SuppliesList from './SuppliesList/SuppliesList';
import SearchAndDateFilters from '../../../../components/SearchAndDateFilters/SearchAndDateFilters';
import {setSuppliesFilter} from '../../store/actions/supplies';

class SuppliesMainPage extends Component {

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-12">
                        <SearchAndDateFilters setFilter={this.props.setSuppliesFilter}/>
                    </div>
                    <div className="col-12">
                        <SuppliesList/>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(null, {setSuppliesFilter})(SuppliesMainPage)