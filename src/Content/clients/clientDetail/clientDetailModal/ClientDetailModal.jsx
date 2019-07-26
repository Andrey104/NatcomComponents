import React from 'react';
import ClientDetail from '../ClientDetail';
import ModalWindow from '../../../../components/ModalWindow/index';

class ClientDetailModal extends React.Component {
    render() {
        return (
            <ClientDetail clientId = {this.props.clientId}/>
        )
    }
}

export default ModalWindow(ClientDetailModal);