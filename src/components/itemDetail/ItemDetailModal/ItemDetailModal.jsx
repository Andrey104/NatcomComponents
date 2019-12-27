import React from 'react';
import ModalWindow from '../../../components/ModalWindow/index';
import ItemDetail from "../ItemDetail";

class ItemDetailModal extends React.Component {
    render() {
        return (
            <div className="modal-body">
                <ItemDetail itemId={this.props.itemId} itemType={this.props.itemType}/>
            </div>
        )
    }
}

export default ModalWindow(ItemDetailModal)

