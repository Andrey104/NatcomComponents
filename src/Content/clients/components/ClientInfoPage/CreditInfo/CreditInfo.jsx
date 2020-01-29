import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getClientCredit} from "../../../store/actions/clients";
import {priceFormat} from "../../../../../services/utils";

class CreditInfo extends Component {

    componentWillMount() {
        const {client} = this.props;
        this.props.getClientCredit(client.id);
    };

    render() {
        return (
            <div>
                Долг по заказам: {priceFormat(this.props.credit)} руб
            </div>
        )
    };
}

export default connect(state => ({
    credit: state.clients.credit,
}), {getClientCredit})(CreditInfo);