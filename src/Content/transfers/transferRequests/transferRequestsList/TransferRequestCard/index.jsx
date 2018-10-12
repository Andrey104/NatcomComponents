import React from 'react';

import {TRANSFER_REQUEST_HARPOON, transferRequestType} from "../../../../../constans";
import './styles.css';

export default class TransferRequestCard extends React.Component {
    render() {
        const {transferRequest, number} = this.props;
        return (
            <tr onClick={this.clickOnCard(transferRequest.id)}
                className='transfer-requests-list__card'>
                <td scope="row" className='transfer-requests-list__card__td__id_fixed-width'>{number}</td>
                <td className='transfer-requests-list__card__td__type_fixed-width'>{this.getTransferRequestType()}</td>
                <td className='transfer-requests-list__card__td__item_fixed-width'>
                    {this.getTransferRequestName()}
                </td>
                <td className='transfer-requests-list__card__td__count_fixed_width'>
                    {this.getTransferRequestCount()}
                </td>
                <td className='transfer-requests-list__card__td__stock_fixed_width'>
                    {transferRequest.request.destination_stock.name}
                </td>
            </tr>
        )
    }

    getTransferRequestType() {
        const {transferRequest} = this.props;
        return transferRequestType[transferRequest.type]
    }

    getTransferRequestName() {
        const {transferRequest} = this.props;
        const {request} = transferRequest;
        if (transferRequest.type === TRANSFER_REQUEST_HARPOON) return `Гарпун ${request.harpoon.id}`;
        return request.item.name;
    }

    getTransferRequestCount() {
        const {transferRequest} = this.props;
        const {request} = transferRequest;
        return request.count ? request.count : 1;
    }

    clickOnCard = (objectId) => () => {
        this.props.history.push(`/transfer_requests/${objectId}`)
    };
}
