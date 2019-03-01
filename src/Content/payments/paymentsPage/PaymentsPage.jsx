import React from 'react';
import {connect} from 'react-redux';

import PaymentsList from './paymentsList/PaymentsList';
import SearchAndDateFilters from '../../../components/SearchAndDateFilters';
import {getAllPayments, setFilterParams} from '../../../AC/payments';

class PaymentsPage extends React.Component {

    setFilterParams = (date, searchText) => {
        this.props.setFilterParams(date, searchText);
        this.props.getAllPayments(date, searchText);
    };

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-12">
                        <SearchAndDateFilters setFilterParams={this.setFilterParams}/>
                    </div>
                    <div className="col-12">
                        <PaymentsList/>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect((state) => ({}), {getAllPayments, setFilterParams})(PaymentsPage);