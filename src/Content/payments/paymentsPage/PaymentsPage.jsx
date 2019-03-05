import React from 'react';
import {connect} from 'react-redux';

import PaymentsList from './paymentsList/PaymentsList';
import SearchAndDateFilters from '../../../components/SearchAndDateFilters';
import {getAllPayments, setFilterParams, setTypeFilterParams} from '../../../AC/payments';
import {getDateForServer, paymentTypes} from "../../../services/utils";

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
        this.type = type;
        this.updateFiltersAndLoadData();
    };

    updateFiltersAndLoadData() {
        this.props.setFilterParams(this.date, this.searchText, this.type);
        this.props.getAllPayments(this.date, this.searchText, this.type)
    }

    getTypeSelector() {
        return (
            <div>
                <label>Тип оплаты</label>
                <select className="form-control"
                        defaultValue={1}
                        onChange={this.typeChange}>
                    <option value="1">{paymentTypes[0]}</option>
                    <option value="2">{paymentTypes[1]}</option>
                    <option value="3">{paymentTypes[2]}</option>
                </select>
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
                    <div className="col-12">
                        <PaymentsList/>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect((state) => ({
}), {
    getAllPayments,
    setFilterParams
})(PaymentsPage);