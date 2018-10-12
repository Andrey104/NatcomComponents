import React from 'react';

import {countFormat} from '../../../../services/utils';

export default class extends React.Component {

    getCheckBoxValue = (currentItems, productItem) => {
        const checkProduct = currentItems.find(item => item.item.item === productItem);
        return !!checkProduct;
    };

    handleSelectProduct = (event, product) => {
        this.props.handleSelectItems(product, Boolean(event.target.checked))
    };

    getMembranes() {
        const {membranes, currentItems} = this.props;
        if (membranes.length > 0) {
            return membranes.map(membrane => (
                <tr key={membrane.item}>
                    <td>{membrane.name}</td>
                    <td>{membrane.vendor_code}</td>
                    <td>{countFormat(membrane.width)}</td>
                    <td>
                        <input type="checkbox"
                               defaultChecked={this.getCheckBoxValue(currentItems, membrane.item)}
                               onChange={e => this.handleSelectProduct(e, membrane)}/>
                    </td>
                </tr>
            ))
        }
    }

    render() {
        return (
            <table className="table table-bordered table-hover">
                <thead className="thead-light">
                <tr>
                    <th scope="col">Название</th>
                    <th scope="col">Артикул</th>
                    <th scope="col">Ширина</th>
                    <th scope="col">Выбор</th>
                </tr>
                </thead>
                <tbody>
                {this.getMembranes()}
                </tbody>
            </table>
        )
    }
}