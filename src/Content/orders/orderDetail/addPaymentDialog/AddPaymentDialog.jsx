import React from 'react';
import {connect} from 'react-redux';

import DialogWindow from '../../../../components/DialogWindow';
import {addPaymentInOrder} from '../../../../AC/orders';

class AddPaymentDialog extends React.Component {
    error = true;

    constructor(props) {
        super(props);
        const {order} = this.props;
        let paymentSum = 0;
        for (const payment of order.payments) {
            paymentSum += Number(payment.sum);
        }
        this.paymentBalance = Number(order.sum) - paymentSum;
        this.state = {
            sum: 0,
        };
    }

    handleChangeSum = event => {
        const sum = Number(event.target.value);
        if (!isFinite(sum)) return;
        this.setState({sum});
    };

    handleSubmit = event => {
        event.preventDefault();
        const {order, addPaymentInOrder} = this.props;
        addPaymentInOrder(this.state, order.id);
    };

    getClasses() {
        if (this.state.sum > this.paymentBalance) {
            this.error = true;
            return 'form-control is-invalid'
        } else if (!this.state.sum) {
            this.error = true;
            return 'form-control';
        }
        this.error = false;
        return 'form-control is-valid'
    }

    render() {
        return (
            <div>
                <div className="modal-body text-left">
                    <div className="form-group">
                        <label htmlFor="sum">
                            Сумма (Максимально к оплате {this.paymentBalance} руб.)
                        </label>
                        <input type="text"
                               placeholder="Введите сумму"
                               value={this.state.sum}
                               onChange={this.handleChangeSum}
                               className={this.getClasses()}
                               id="sum"/>
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button"
                            onClick={this.props.close}
                            className="btn btn-secondary">Закрыть
                    </button>
                    <button type="submit"
                            onClick={this.handleSubmit}
                            disabled={this.error}
                            className="btn btn-primary">Добавить
                    </button>
                </div>
            </div>
        )
    }
}

export default DialogWindow(connect(null, {addPaymentInOrder})(AddPaymentDialog));