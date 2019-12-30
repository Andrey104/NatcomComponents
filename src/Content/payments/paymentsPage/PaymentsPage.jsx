import React from 'react';
import {connect} from 'react-redux';

import PaymentsList from './paymentsList/PaymentsList';
import SearchAndDateFilters from '../../../components/SearchAndDateFilters/SearchAndDateFilters';
import {getAllPayments, getPaymentsSum, setFilterParams, setTypeFilterParams} from '../../../AC/payments';
import {getDateForServer, paymentTypes, priceFormat} from "../../../services/utils";

class PaymentsPage extends React.Component {

    date;
    searchText;
    type;

    constructor(props) {
        super(props);
        this.date = null;
        this.searchText = null;
        this.type = null;
    }

    setFilterParams = (date, searchText) => {
        date = getDateForServer(date);
        this.date = date;
        this.searchText = searchText;
        this.updateFiltersAndLoadData();
    };

    typeChange = (event) => {
        const type = event.target.value;
        if (type === "0") {
            this.type = null;
        } else {
            this.type = type;
        }
        this.updateFiltersAndLoadData();
    };

    updateFiltersAndLoadData() {
        this.props.setFilterParams(this.date, this.searchText, this.type);
        this.props.getAllPayments(this.date, this.searchText, this.type);
        this.props.getPaymentsSum(this.date, this.type);
    }

    getTypeSelector() {
        return (
            <div>
                <label>Тип оплаты</label>
                <select className="form-control"
                        defaultValue={0}
                        onChange={this.typeChange}>
                    <option value="0">Все</option>
                    <option value="1">{paymentTypes[0]}</option>
                    <option value="2">{paymentTypes[1]}</option>
                    <option value="3">{paymentTypes[2]}</option>
                </select>
            </div>
        );
    }

    getPaymentsStatisticsCard() {
        return (
            <div className="card">
                <div className="card-body">
                    <div className="row">
                        <div className="col-12">
                            <p>Сумма: {priceFormat(this.props.paymentsStat.sum)}</p>
                            <p>Наличные: {priceFormat(this.props.paymentsStat.cash)}</p>
                            <p>Карта: {priceFormat(this.props.paymentsStat.no_cash)}</p>
                            <p>Терминал: {priceFormat(this.props.paymentsStat.terminal)}</p>
                            <p>Натком: {priceFormat(this.props.paymentsStat.natcom)}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-12">
                        <SearchAndDateFilters setFilterParams={this.setFilterParams}/>
                    </div>
                    <div className="col-md-6">
                        {this.getTypeSelector()}
                        <br/>
                    </div>
                    <div className="col-md-6">
                        {this.getPaymentsStatisticsCard()}
                    </div>

                    <div className="col-12">
                        <hr/>
                        <PaymentsList/>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect((state) => ({
    paymentsStat: state.payments.paymentStatistics
}), {
    getAllPayments,
    setFilterParams,
    getPaymentsSum
})(PaymentsPage);