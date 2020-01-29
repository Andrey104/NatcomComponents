import React from 'react';
import {connect} from 'react-redux';

import AddClientDialog from '../../../../components/addClientDialog/AddClientDialog';
import ClientInfo from '../../../clients/components/ClientEditingPage/ClientEditingPage';
import {addNewClient} from '../../../clients/store/actions/clients';
import {openModalWindow, closeModalWindow} from '../../../../AC/modal';
import {OPEN_ADD_CLIENT} from '../../../../constans';
import {ADD_NEW_CLIENT} from '../../../clients/store/constantsClient';
import './styles.css';

class AddClient extends React.Component {
    client;

    constructor(props) {
        super(props);
        const {client} = this.props;
        this.client = client ? client : null;
    }

    selectClient = client => {
        this.client = client;
        this.closeDialog();
        this.props.addClient(client);
    };

    addNewClient = client => this.props.addNewClient(client, false);

    closeDialog = () => this.props.closeModalWindow();

    getDialogWindow() {
        const {modal} = this.props;
        if (modal === OPEN_ADD_CLIENT) {
            return (
                <AddClientDialog header={'Добавить клиента'}
                                 addClient={this.selectClient}
                                 close={this.closeDialog}/>
            )
        } else if (modal === ADD_NEW_CLIENT) {
            return (
                <ClientInfo header={'Новый клиент'}
                            handleSubmit={this.addNewClient}
                            close={this.closeDialog}/>
            )
        }
    }

    getCurrentClient() {
        if (this.client) {
            const {first_name, last_name} = this.client;
            return <div>{first_name} {last_name}</div>;
        } else {
            return <div>Нажмите для выбора</div>
        }
    };

    render() {
        return (
            <tr>
                {this.getDialogWindow()}
                <th>Клиент</th>
                <td className="add-client-cell"
                    onClick={() => this.props.openModalWindow(OPEN_ADD_CLIENT)}>
                    {this.getCurrentClient()}
                </td>
            </tr>
        )
    }
}

export default connect(state => ({
    modal: state.modal.modal
}), {addNewClient, openModalWindow, closeModalWindow})(AddClient);