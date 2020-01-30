import React, {Component} from 'react';
import {connect} from 'react-redux';
import {addNewClient, deleteClientFromStore} from '../../store/actions/clients';
import ClientEditingPage from "../ClientEditingPage/ClientEditingPage";

class AddNewClient extends Component {

    handleSubmit = client => {
        if (this.props.addClient) {
            this.props.addNewClient(client, false);
            this.props.addClient(client);
        }

        else this.props.addNewClient(client);
    };

    render() {
        return <ClientEditingPage handleSubmit={this.handleSubmit}/>
    };

    componentWillUnmount = () => this.props.deleteClientFromStore();
}

export default connect(null, {addNewClient, deleteClientFromStore})(AddNewClient);