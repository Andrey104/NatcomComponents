import React from 'react';
import {connect} from 'react-redux';

import PaymentsList from './paymentsList/PaymentsList';
import SearchAndDateFilters from '../../../components/SearchAndDateFilters';
import {getAllPayments} from '../../../AC/payments';

class PaymentsPage extends React.Component {

    getFilterParams = params => this.props.getAllPayments(params);

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-12">
                        <SearchAndDateFilters getFilterParams={this.getFilterParams}/>
                    </div>
                    <div className="col-12">
                        <PaymentsList/>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(null, {getAllPayments})(PaymentsPage)