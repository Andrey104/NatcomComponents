import React from 'react';
import {connect} from 'react-redux';
import ClientPaymentDialog from "../../components/payment/ClientPaymentDialog";
import {closeModalWindow} from "../../AC/modal";
import {PAYMENT_CLIENT_ADD_MODAL} from "../../constans";

class Modals extends React.Component {

    constructor(props) {
        super(props);
    }

    getModal(modal) {
        if (modal === PAYMENT_CLIENT_ADD_MODAL) {
            return (
                <ClientPaymentDialog header={'Пополнить баланс'}
                                     client={this.props.paymentAddData.client}
                                     order={this.props.paymentAddData.order}
                                     close={this.closeClientModal}/>
            )
        }
    }

    closeClientModal = () => {
        this.props.closeModalWindow();
    };

    render() {
        return (
            <div>
                {this.getModal(this.props.modal)}
            </div>
        )
    }
}

export default connect((state) => ({
    modal: state.modal.modal,
    paymentAddData: state.payments.paymentAddData,
}), {closeModalWindow})(Modals)