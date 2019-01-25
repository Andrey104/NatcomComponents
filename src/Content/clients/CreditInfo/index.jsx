import React from 'react';
import {connect} from 'react-redux';
import {getClientCredit} from "../../../AC/clients";
import {priceFormat} from "../../../services/utils";


class CreditInfo extends React.Component {

    componentWillMount() {
        const {client} = this.props;
        this.props.getClientCredit(client.id);
    }

    render() {
        return (
            <div>
                Долг по заказам: {priceFormat(this.props.credit)} руб
            </div>
        )
    }
}
export default connect((state) => ({
    credit: state.clients.credit,
}), {getClientCredit})(CreditInfo);