import React, {Component} from 'react';
import AddNewClient from '../AddNewClient';
import ModalWindow from '../../../../../components/ModalWindow';

class AddNewClientModalWindow extends Component {
    render() {
        return (
            <div className="modal-body">
                <AddNewClient addClient={this.props.addClient}/>
            </div>
        )
    }
}

export default ModalWindow(AddNewClientModalWindow);