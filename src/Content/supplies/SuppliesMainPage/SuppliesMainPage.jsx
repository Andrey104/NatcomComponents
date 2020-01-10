import React, {Component} from 'react';
import {connect} from 'react-redux';

import SuppliesList from './suppliesList/SuppliesList';
import SearchAndDateFilters from '../../../components/SearchAndDateFilters/SearchAndDateFilters';
import {setSuppliesFilter} from '../../../AC/supplies';

class SuppliesMainPage extends Component {

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-12">
                        <SearchAndDateFilters setFilter = {this.props.setSuppliesFilter}/>
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