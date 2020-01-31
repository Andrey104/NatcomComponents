import React from 'react';
import {connect} from 'react-redux';

import SearchInput from '../../../components/SearchInput';
import OrdersList from './ordersList/OrdersList';
import OrderStatusSelect from './OrderStatusSelect';
import DatePickerInput from '../../../components/datePickers/DatePickerInput';
import {getDateForServer} from '../../../services/utils';
import {getAllOrders, setOrdersDate} from '../store/actions/orders';

class OrdersPage extends React.Component {
    searchText;
    status = null;
    date = new Date();

    searchOrders = text => {
        this.searchText = text;
        this.getFilterOrders();
    };

    selectStatus = status => {
        this.status = status === 5 ? null : status;
        this.getFilterOrders();
    };

    selectDate = date => {
        this.date = date ? date : null;
        this.getFilterOrders();
    };

    getFilterOrders = () => {
        let url = '';
        if (this.searchText) url += `text=${this.searchText}&`;
        if (this.status !== null) url += `status=${this.status}&`;
        if (this.date) url += `date=${getDateForServer(this.date)}&`;
        if (url) {
            url = '?' + url.slice(0, url.length - 1);
        }
        if (this.date) {
            this.props.setOrdersDate(getDateForServer(this.date));
        } else {
            this.props.setOrdersDate(null);
        }

        this.props.getAllOrders(url);

    };

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-12">
                        <div className="row">
                            <div className="col-6">
                                <SearchInput search={this.searchOrders}/>
                                <OrderStatusSelect selectStatus={this.selectStatus}/>
                            </div>
                            <div className="col-6">
                                <DatePickerInput selectDate={this.selectDate}/>
                            </div>
                        </div>
                    </div>
                </div>
                <OrdersList date={getDateForServer(this.date)}/>
            </div>
        )
    }
}

export default connect(null, {getAllOrders, setOrdersDate})(OrdersPage)