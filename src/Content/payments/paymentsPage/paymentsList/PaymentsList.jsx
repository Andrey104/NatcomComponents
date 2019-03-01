import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import {connect} from 'react-redux';

import Loader from '../../../../components/Loader/index';
import AddButton from '../../../../components/AddButton/index';
import PaymentCard from './PaymentCard/index';
import InfiniteScrollOverride from '../../../../services/InfiniteScrollOverride';
import {getAllPayments, getNextPayments} from '../../../../AC/payments';
import {mapToArr} from '../../../../helpers';
import history from '../../../../history';

class PaymentsList extends React.Component {

    componentWillMount = () => this.props.getAllPayments(this.props.date, this.props.searchText);

    loadPayments = page => this.props.getNextPayments(this.props.nextPage, this.props.date, this.props.searchText);

    addNewPayment = () => history.push('/payments/add_payment');

    getBody(payments) {
        let paymentsList;
        if (payments.length !== 0) {
            paymentsList = payments.map((payment, index) => (
                <PaymentCard key={payment.id}
                             number={++index}
                             payment={payment}/>
            ));
        } else {
            paymentsList = (
                <tr>
                    <td colSpan='5'>Нет оплат</td>
                </tr>
            );
        }
        return paymentsList;
    }

    render() {
        const {isLoading, payments, hasMorePayments} = this.props;
        if (isLoading && payments.length === 0) {
            return (
                <div className="pre-loader-container">
                    <Loader/>
                </div>
            );
        }
        const loader = hasMorePayments ? <Loader/> : false;
        return (
            <div className="row">
                <div className="col-12">
                    <InfiniteScrollOverride
                        pageStart={1}
                        loadMore={this.loadPayments}
                        hasMore={hasMorePayments}
                        useWindow={false}>
                        <div className="row">
                            <div className="col-12">
                                <table className="table table-bordered">
                                    <thead className="thead-light">
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Клиент</th>
                                        <th scope="col">Дата</th>
                                        <th scope="col">Тип</th>
                                        <th scope="col">Сумма</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {this.getBody(payments)}
                                    </tbody>
                                </table>
                                {loader}
                                <AddButton openAdd={this.addNewPayment}/>
                            </div>
                        </div>
                    </InfiniteScrollOverride>
                </div>
            </div>
        )
    }
}

export default connect((state) => ({
    payments: mapToArr(state.payments.payments),
    isLoading: state.payments.isLoading,
    hasMorePayments: state.payments.hasMorePayments,
    nextPage: state.payments.nextPageNumber,
    date: state.payments.date,
    searchText: state.payments.searchText
}), {getAllPayments, getNextPayments})(PaymentsList);