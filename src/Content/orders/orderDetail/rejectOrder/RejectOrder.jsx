import React from 'react';
import {connect} from 'react-redux';

import ConfirmDialog from '../../../../components/confirmDialog/ConfirmDialog';
import {rejectOrder} from '../../../../AC/orders';
import {openModalWindow, closeModalWindow} from '../../../../AC/modal';
import {REJECT_ORDER} from '../../../../constans';

class RejectOrder extends React.Component {

    close = () => this.props.closeModalWindow();

    handleSubmit = () => {
        const {order} = this.props;
        this.props.rejectOrder(order.id)
    };

    getDialogWindow() {
        if (this.props.modal === REJECT_ORDER) {
            return (
                <ConfirmDialog header={'Отмена заказа'}
                               confirmText={'Вы действительно хотите отменить заказ?'}
                               handleSubmit={this.handleSubmit}
                               close={this.close}/>
            )
        }
    }

    getRejectButton() {
        const {order} = this.props;
        if (order.status !== 4) {
            return (
                <button type="button"
                        onClick={() => this.props.openModalWindow(REJECT_ORDER)}
                        className="btn btn-danger btn-sm detail-btn">Отменить
                </button>
            )
        }
    }

    render() {
        const DialogWindow = this.getDialogWindow();
        return (
            <span>
                {DialogWindow}
                {this.getRejectButton()}
            </span>
        )
    }
}

export default connect(state => ({
    modal: state.modal.modal
}), {openModalWindow, closeModalWindow, rejectOrder})(RejectOrder);