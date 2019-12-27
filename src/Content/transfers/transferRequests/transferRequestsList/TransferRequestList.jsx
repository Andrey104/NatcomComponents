import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import {connect} from 'react-redux';

import Loader from '../../../../components/Loader';
import TransferRequestCard from './TransferRequestCard';
import {getAllTransferRequests, getNextTransferRequests} from '../../../../AC/transferRequests';
import {mapToArr} from '../../../../helpers';

class TransferRequestList extends React.Component {
    componentWillMount = () => this.props.getAllTransferRequests();

    loadTransferRequests = page => this.props.getNextTransferRequests(page);

    getBody(transferRequests) {
        if (!transferRequests.length) return (
            <tr>
                <td colSpan='6'>У вас нет запросов на перевозку</td>
            </tr>
        );

        let number = 1;
        return transferRequests.map((transferRequest) => (
                <TransferRequestCard key={transferRequest.id}
                                     number={number++}
                                     history={this.props.history}
                                     transferRequest={transferRequest}/>
            )
        );
    }

    render() {
        const {isLoading, transferRequests, hasMoreTransferRequests} = this.props;
        if (isLoading && !transferRequests.length) {
            return (
                <div>
                    <Loader/>
                </div>
            );
        }

        return (
            <div className="row">
                <div className='col-12'>
                    <InfiniteScroll
                        pageStart={1}
                        loadMore={this.loadTransferRequests}
                        hasMore={hasMoreTransferRequests}
                        useWindow={false}
                        loader={<Loader key={0}/>}>
                        <div className="row">
                            <div className="col-12">
                                <table className="table table-hover table-bordered">
                                    <thead className="thead">
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Тип</th>
                                        <th scope="col">Товар</th>
                                        <th scope="col">Количество</th>
                                        <th scope="col">Куда</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {this.getBody(transferRequests)}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </InfiniteScroll>
                </div>
            </div>
        );
    }
}

export default connect((state) => ({
    transferRequests: mapToArr(state.transferRequests.entries),
    isLoading: state.transferRequests.isLoading,
    hasMoreTransferRequests: state.transferRequests.hasMoreEntries
}), {getAllTransferRequests, getNextTransferRequests})(TransferRequestList);
