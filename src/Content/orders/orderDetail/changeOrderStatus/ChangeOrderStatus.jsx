import React from 'react';
import {connect} from 'react-redux';

import AddPaymentDialog from '../addPaymentDialog/AddPaymentDialog';
import {changeOrderStatus} from '../../../../AC/orders';
import {openModalWindow, closeModalWindow} from '../../../../AC/modal';
import {ADD_PAYMENT_IN_ORDER} from '../../../../constans';

class ChangeOrderStatus extends React.Component {
    changeUrl;
    buttonText;

    getParams = (changeUrl, buttonText) => {
        this.changeUrl = changeUrl;
        this.buttonText = buttonText;
    };

    getButtonParams = order => {
        const {status} = order;
        switch (status) {
            case 0: {
                this.getParams('confirm', 'Подтвердить заказ');
                break;
            }
            case 1: {
                if (order.payment_status > 0) {
                    this.getParams('assembly', 'На сборку');
                }
                break;
            }
            case 2: {
                this.getParams('complete', 'Готов');
                break;
            }
            case 3: {
                this.getParams('sale', 'Продан');
                break;
            }
        }
    };

    close = () => this.props.closeModalWindow();

    handleSubmit = event => {
        event.preventDefault();
        const {order} = this.props;
        this.props.changeOrderStatus(this.changeUrl, order.id);
    };

    getDialogWindow(order) {
        if (this.props.modal === ADD_PAYMENT_IN_ORDER) {
            return (
                <AddPaymentDialog header={'Новая оплата'}
                                  order={order}
                                  close={this.close}/>
            )
        }
    }

    getPaymentButton(order) {
        if (order.status !== 0 && order.payment_status !== 2) {
            return (
                <button type="button"
                        onClick={() => this.props.openModalWindow(ADD_PAYMENT_IN_ORDER)}
                        className="btn btn-primary btn-sm detail-btn">Добавить оплату
                </button>
            )
        }
    }

    getStatusButton() {
        if (this.buttonText) {
            return (
                <button type="submit"
                        onClick={this.handleSubmit}
                        className="btn btn-success btn-sm detail-btn">{this.buttonText}
                </button>
            )
        }
    }

    render() {
        const {order} = this.props;
        this.getButtonParams(order);
        return (
            <span>
                {this.getDialogWindow(order)}
                {this.getStatusButton()}
                {this.getPaymentButton(order)}
            </span>
        )
    }
}

export default connect(state => ({
    modal: state.modal.modal
}), {changeOrderStatus, openModalWindow, closeModalWindow})(ChangeOrderStatus);