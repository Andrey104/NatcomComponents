import React from 'react';
import {NavLink} from 'react-router-dom';
import {getPhoneWithMask, priceFormat} from "../../services/utils";
import history from '../../history';
import ClientPaymentDialog from '../../components/payment/ClientPaymentDialog'
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {openPaymentAddClientModal} from "../../AC/payments";

class OrderClientCard extends React.Component {

    static propTypes = {
        client: PropTypes.object,
        order: PropTypes.object,
    };

    constructor(props) {
        super(props);
    }

    handleBalanceTopUpClick = (event) => {
        event.preventDefault();
        const {client, order} = this.props;
        this.props.openPaymentAddClientModal({
            client: client,
            order: order
        });
    };

    handleAboutClientClick = (event) => {
        event.preventDefault();
        const {client} = this.props;
        history.push(`/clients/${client.id}`);
    };

    render() {
        const {client, isClientsPage} = this.props;
        return (
            <div className="c-card">
                <h5>{client.first_name} {client.last_name}</h5>


                <div className="row">
                    <div className="col-md-6">
                        <div className="row">
                            <div className="col-12">
                                <div>{getPhoneWithMask(client.phone1)}</div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                {!isClientsPage ? <button className="btn btn-sm btn-primary"
                                                          onClick={this.handleAboutClientClick}>На страницу
                                    клиента</button> : null}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="row">
                            <div className="col-12">
                                <div>Баланс: {priceFormat(client.balance)}</div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <button className="btn btn-sm btn-primary"
                                        onClick={this.handleBalanceTopUpClick}>Пополнить баланс
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default connect((state) => ({}), {openPaymentAddClientModal})(OrderClientCard);