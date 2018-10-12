import React from 'react';

export default class InputAndOutputProducts extends React.Component {
    render() {
        const {obj} = this.props;

        return (
                <div className='row'>
                    <div className='col-6'>
                        <h5>Входные товары</h5>
                        {this.getProducts(obj.input_products)}
                    </div>
                    <div className='col-6'>
                        <h5>Выходные товары</h5>
                        {this.getProducts(obj.output_products)}
                    </div>
                </div>
        )
    }

    getProducts(items) {
        return items.map(item => {
            const {product} = item;
            return (
                <div key={product.id}>{product.name} - {item.count}</div>
            )
        })
    }
}