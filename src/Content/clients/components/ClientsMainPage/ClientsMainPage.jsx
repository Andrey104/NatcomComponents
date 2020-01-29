import React, {Component} from 'react';
import {connect} from 'react-redux';

import SearchInput from '../../../../components/SearchInput';
import ClientsList from './ClientsList/ClientsList';
import {setClientsFilter} from '../../store/actions/clients';

class ClientsMainPage extends Component {

    searchClients = text => this.props.setClientsFilter(text);

    render() {
        return (
            <div className="row">
                <div className="col-12">
                    <div className="row align-items-center">
                        <div className="col-12">
                            <SearchInput search={this.searchClients}/>
                        </div>
                    </div>
                </div>
                <div className="col-12">
                    <ClientsList/>
                </div>
            </div>
        )
    };
}

export default connect(null, {setClientsFilter})(ClientsMainPage)