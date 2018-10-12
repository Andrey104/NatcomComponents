import React from 'react';

import {units} from "../../../../../constans";

export default class TransferRequestItem extends React.Component {
    render() {
        const {item} = this.props;
        return (
            <table className="table table-hover table-bordered">
                <thead className="thead-light">
                    <tr>
                        <th scope="col">Название</th>
                        <th scope="col">Артикул</th>
                        <th scope="col">Ед. измерения</th>
                    </tr>
                </thead>
                <tbody>
                    <tr onClick={this.clickOnCard(item)}>
                        <td>{item.name}</td>
                        <td>{item.vendor_code}</td>
                        <td>{units[item.unit]}</td>
                    </tr>
                </tbody>
            </table>
        )
    }

    clickOnCard = (item) => () => {
        const url = item.requires_prepayment !== undefined ? '/products' : '/membranes';
        this.props.history.push(`${url}/${item.id}`)
    }
}
