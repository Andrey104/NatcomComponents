import React, {Component} from 'react';
import {connect} from 'react-redux';

import DialogWindow from '../ModalWindow';
import ClientsMainPage from "../../Content/clients/components/ClientsMainPage/ClientsMainPage";
import {deleteClientsFromStore} from '../../Content/clients/store/actions/clients';

class AddClientDialog extends Component {

    render() {
        return (
            <div className="modal-body">
                <ClientsMainPage addClient={this.props.addClient}
                                 isDialog={true}/>
            </div>
        )
    };
    componentWillUnmount = () => this.props.deleteClientsFromStore();
}

export default DialogWindow(connect(null, {deleteClientsFromStore})(AddClientDialog));