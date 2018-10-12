import React from 'react';
import {connect} from 'react-redux';

import OrderInfo from '../orderInfo/OrderInfo';
import {getAllStocks} from '../../../AC/stocks';
import {addNewOrder} from '../../../AC/orders';
import {mapToArr} from '../../../helpers';

class AddNewOrder extends React.Component {

    componentWillMount = () => this.props.getAllStocks();

    handleSubmit = order => this.props.addNewOrder(order);

    render() {
        const {stocks} = this.props;
        return (
            <div>
                <OrderInfo stocks={stocks}
                           handleSubmit={this.handleSubmit}/>
            </div>
        )
    }

}

export default connect(state => ({
    stocks: mapToArr(state.stocks.stocks)
}), {getAllStocks, addNewOrder})(AddNewOrder);