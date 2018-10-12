import React from 'react';
import {connect} from 'react-redux';

import SearchInput from '../../../components/SearchInput';
import ClientsList from './clientsList/ClientsList';
import {getAllClients} from '../../../AC/clients';

class ClientsPage extends React.Component {
    searchText;

    searchClients = text => {
        this.searchText = text;
        this.getFilterClients();
    };

    getFilterClients = () => {
        let url = '';
        if (this.searchText) url += `text=${this.searchText}&`;
        if (url) {
            url = '?' + url.slice(0, url.length - 1);
        }
        this.props.getAllClients(url);
    };

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-12">
                        <div className="row align-items-center">
                            <div className="col-6">
                                <SearchInput search={this.searchClients}/>
                            </div>
                        </div>
                    </div>
                    <div className="col-12">
                        <ClientsList/>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(null, {getAllClients})(ClientsPage)