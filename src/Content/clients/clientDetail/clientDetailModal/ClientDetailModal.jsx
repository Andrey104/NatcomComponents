import React from 'react';
import ClientDetail from '../ClientDetail';
import ModalWindow from '../../../../components/ModalWindow/index';

class ClientDetailModal extends React.Component {
    render() {
        return (
            <div className="modal-body">
                <ClientDetail clientId = {this.props.clientId}/>
            </div>
        )
    }
}

export default ModalWindow(ClientDetailModal);