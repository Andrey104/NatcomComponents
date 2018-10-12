import React from 'react';
import {connect} from 'react-redux';

import Loader from '../../../../components/Loader';
import {getTransferRequest} from '../../../../AC/transferRequests';
import {TRANSFER_REQUEST_HARPOON, transferRequestType} from "../../../../constans";
import TransferRequestStock from "./TransferRequestStock";
import TransferRequestItem from "./TransferRequestItem";

class TransferRequestDetail extends React.Component {
    componentWillMount = () => {
        const urlId = this.props.match.params.transferRequestId;
        this.props.getTransferRequest(urlId);
    };

    render() {
        const {transferRequest, isLoading} = this.props;
        if (isLoading || !transferRequest) return <Loader/>;

        return (
            <div className="col-12">
                <h5><i>Тип: </i>{this.getTransferRequestType()}</h5>
                <h5><i>Количество: </i>{this.getTransferRequestCount()}</h5>
                <h5><i>Склад назначения:</i></h5>
                <TransferRequestStock stock={transferRequest.request.destination_stock}
                                      history={this.props.history}/>
                <h5><i>
                    {transferRequest.type === TRANSFER_REQUEST_HARPOON ? 'Гарупун' : 'Товар'}:
                </i></h5>
                {this.getItemOrHarpoon()}
            </div>
        )
    }

    getTransferRequestType() {
        const {transferRequest} = this.props;
        return transferRequestType[transferRequest.type]
    }

    getTransferRequestCount() {
        const {transferRequest} = this.props;
        const {request} = transferRequest;
        return request.count ? request.count : 1;
    }

    getItemOrHarpoon() {
        const {transferRequest} = this.props;
        const {request} = transferRequest;
        if (transferRequest.type === TRANSFER_REQUEST_HARPOON) {
            return null
        }
        else {
            return <TransferRequestItem item={request.item}
                                        history={this.props.history}/>
        }
    }
}

export default connect((state) => ({
    transferRequest: state.transferRequests.transferRequest,
    isLoading: state.transferRequests.isLoading
}), {getTransferRequest})(TransferRequestDetail);
