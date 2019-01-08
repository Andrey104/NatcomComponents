import React from 'react';
import {connect} from 'react-redux';

import AddPaymentDialog from '../addPaymentDialog/AddPaymentDialog';
import {changeOrderStatus} from '../../../../AC/orders';
import {openModalWindow, closeModalWindow} from '../../../../AC/modal';
import {ADD_PAYMENT_IN_ORDER} from '../../../../constans';

class ChangeOrderStatus extends React.Component {
    changeUrl;
    buttonText;
    buttonDisable = false;

    setParams = (changeUrl, buttonText, buttonDisable) => {
        this.changeUrl = changeUrl;
        this.buttonText = buttonText;
        this.buttonDisable = buttonDisable;
    };

    getButtonParams = order => {
        const {status} = order;
        switch (status) {
            case 0: {
                this.setParams('confirm', 'Подтвердить заказ', false);
                break;
            }
            case 1: {
                if (order.payment_status > 0) {
                    this.setParams('assembly', 'На сборку', false);
                } else {
                    this.setParams('assembly', 'На сборку', true);
                }
                break;
            }
            case 2: {
                this.setParams('complete', 'Готов', false);
                break;
            }
            case 3: {
                if (order.payment_status > 1) {
                    this.setParams('sale', 'Выдан', false);
                } else {
                    this.setParams('sale', 'Выдан', true);
                }
                break;
            }
            case 4: {
                this.setParams(null, null, true);
            }
        }
    };

    close = () => this.props.closeModalWindow();

    handleSubmit = event => {
        event.preventDefault();
        const {order} = this.props;
        this.props.changeOrderStatus(this.changeUrl, order.id);
    };


    getStatusButton() {
        if (this.buttonText) {
            return (
                <button type="submit"
                        onClick={this.handleSubmit}
                        disabled={this.buttonDisable}
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
                {this.getStatusButton()}
            </span>
        )
    }
}

export default connect(state => ({
    modal: state.modal.modal
}), {changeOrderStatus, openModalWindow, closeModalWindow})(ChangeOrderStatus);