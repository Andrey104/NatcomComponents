import React from 'react';

import {orderStatuses} from '../../../../services/utils';

export default class extends React.Component {

    changeStatus = event => this.props.selectStatus(Number(event.target.value));

    render() {
        return (
            <div className="form-group">
                <select className="form-control"
                        onChange={this.changeStatus}
                        defaultValue={orderStatuses.length - 1}>
                    {orderStatuses.map((status, index) => (
                        <option value={index}
                                key={index}>{status}</option>
                    ))}
                </select>
            </div>
        )
    }
}