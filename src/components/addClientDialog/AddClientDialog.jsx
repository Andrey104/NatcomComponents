import React from 'react';
import {connect} from 'react-redux';

import DialogWindow from '../DialogWindow';
import SearchInput from '../SearchInput';
import ClientsList from '../../Content/clients/clientsPage/clientsList/ClientsList';
import {getAllClients} from '../../AC/clients';

class AddClientDialog extends React.Component {

    searchClients = search => this.props.getAllClients(`?text=${search}`);

    render() {
        return (
            <div className="modal-body">
                <SearchInput search={this.searchClients}/>
                <ClientsList addClient={this.props.addClient}/>
            </div>
        )
    }
}

export default DialogWindow(connect(null, {getAllClients})(AddClientDialog));