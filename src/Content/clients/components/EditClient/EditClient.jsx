import React, {Component} from 'react';
import {connect} from 'react-redux';
import {deleteClientFromStore, editClient, getClient} from "../../store/actions/clients";
import ClientEditingPage from '../ClientEditingPage/ClientEditingPage';
import Loader from '../../../../components/Loader';

class EditClient extends Component {

    componentDidMount() {
        const urlId = this.props.match.params.clientId;
        if (urlId) this.props.getClient(urlId);
    };

    handleSubmit = client => this.props.editClient(this.props.client.id, client);

    render() {
        if (!Object.keys(this.props.client).length) {
            return (
                <div className="pre-loader-container">
                    <Loader />
                </div>
            );
        }
        return (
            <ClientEditingPage client={this.props.client}
                               handleSubmit={this.handleSubmit}/>
        )
    };

    componentWillUnmount = () => this.props.deleteClientFromStore();
}

export default connect(state => ({
    client: state.clients.client
}), {getClient, editClient, deleteClientFromStore})(EditClient);