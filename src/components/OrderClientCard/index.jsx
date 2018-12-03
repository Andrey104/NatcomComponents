import React from 'react';
import {NavLink} from 'react-router-dom';
import {getPhoneWithMask, priceFormat} from "../../services/utils";
import history from '../../history';
import ClientPaymentDialog from '../../components/payment/ClientPaymentDialog'
import PropTypes from 'prop-types';

class OrderClientCard extends React.Component {

    static propTypes = {
        client: PropTypes.object,
        update: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.state = {
            paymentDialogIsOpen: false,
        };
    }


    handleBalanceTopUpClick = () => {
        this.setState({
            paymentDialogIsOpen: true
        });
    };

    handleAboutClientClick = () => {
        const {client} = this.props;
        history.push(`/clients/${client.id}`);
    };

    closePaymentDialog = () => {
        this.setState({
            paymentDialogIsOpen: false
        });
        this.props.update();
    };

    getDialogWindow() {
        let dialogWindow = null;
        if (this.state.paymentDialogIsOpen) {
            dialogWindow = <ClientPaymentDialog header={'Пополнить баланс'}
                                                client={this.props.client}
                                                close={this.closePaymentDialog}/>
        }
        return dialogWindow;
    }

    render() {
        const {client} = this.props;
        return (
            <div className="card">
                {this.getDialogWindow()}
                <div>{client.first_name} {client.last_name}</div>
                <div>{getPhoneWithMask(client.phone1)}</div>
                <div>Баланс: {priceFormat(client.balance)}</div>
                <button onClick={this.handleBalanceTopUpClick}>Пополить баланс</button>
                <button onClick={this.handleAboutClientClick}>На страницу клиента</button>
            </div>
        )
    }
}

export default (OrderClientCard);