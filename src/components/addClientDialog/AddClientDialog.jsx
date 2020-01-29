import React from 'react';
import {connect} from 'react-redux';

import DialogWindow from '../ModalWindow';
import SearchInput from '../SearchInput';
import ClientsList from '../../Content/clients/components/ClientsMainPage/ClientsList/ClientsList';
import {getClients} from '../../Content/clients/store/actions/clients';

class AddClientDialog extends React.Component {

    searchClients = search => this.props.getClients(null, search, true); //TODO проверить косячок

    render() {
        return (
            <div className="modal-body">
                <SearchInput search={this.searchClients}/>
                <ClientsList addClient={this.props.addClient}/>
            </div>
        )
    }
}

export default DialogWindow(connect(null, {getClients})(AddClientDialog));