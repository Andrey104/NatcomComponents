import React from 'react';

import {units} from '../../../../constans';

export default class extends React.Component {

    getCheckBoxValue = (currentItems, productItem) => {
        const checkProduct = currentItems.find(item => item.item.item === productItem);
        return !!checkProduct;
    };

    handleSelectProduct = (event, product) => {
        this.props.handleSelectItems(product, Boolean(event.target.checked))
    };

    getProducts() {
        const {products, currentItems} = this.props;
        if (products.length > 0) {
            return products.map(product => (
                <tr key={product.item}>
                    <td>{product.name}</td>
                    <td>{product.vendor_code}</td>
                    <td>{units[product.unit - 1]} руб.</td>
                    <td>
                        <input type="checkbox"
                               defaultChecked={this.getCheckBoxValue(currentItems, product.item)}
                               onChange={e => this.handleSelectProduct(e, product)}/>
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
                    <th scope="col">Ед. изм.</th>
                    <th scope="col">Выбор</th>
                </tr>
                </thead>
                <tbody>
                {this.getProducts()}
                </tbody>
            </table>
        )
    }
}