import React from 'react';

import './styles.css';

export default class extends React.Component {

    getProducts() {
        const {products} = this.props;
        if (products.length > 0) {
            return products.map(product => (
                <tr key={product.item}
                    onClick={this.props.handleSubmit(product)}>
                    <td>{product.name}</td>
                    <td>{product.vendor_code}</td>
                    <td>{product.price} руб.</td>
                    <td>{this.props.getItemCount(product)}</td>
                </tr>
            ))
        }
    }

    render() {
        const {products} = this.props;
        if (!products.length) return null;
        return (
            <table className="table table-bordered table-hover">
                <thead>
                <tr>
                    <th scope="col">Название</th>
                    <th scope="col">Артикул</th>
                    <th scope="col">Цена</th>
                    <th scope="col">Количество</th>
                </tr>
                </thead>
                <tbody>
                {this.getProducts()}
                </tbody>
            </table>
        )
    }
}