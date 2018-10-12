import React from 'react';
import {connect} from 'react-redux';

import SearchInput from '../../../components/SearchInput';
import ServicesList from './servicesList/ServicesList';
import {getAllServices} from '../../../AC/services';

class ServicesPage extends React.Component {
    searchText;

    searchServices = text => {
        this.searchText = text;
        this.getFilterServices();
    };

    getFilterServices = () => {
        let url = '';
        if (this.searchText) url += `text=${this.searchText}&`;
        if (url) {
            url = '?' + url.slice(0, url.length - 1);
        }
        this.props.getAllServices(url);
    };

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-12">
                        <div className="row align-items-center">
                            <div className="col-6">
                                <SearchInput search={this.searchServices}/>
                            </div>
                        </div>
                    </div>
                    <div className="col-12">
                        <ServicesList/>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(null, {getAllServices})(ServicesPage)