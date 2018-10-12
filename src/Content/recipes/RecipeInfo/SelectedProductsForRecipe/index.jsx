import React from 'react';

export default class SelectedProductsForRecipe extends React.Component {
    render() {
        return (
            <div className='col-6'>
                <h4>{this.props.title}</h4>
                {this.getProducts()}
                <button type="button"
                        onClick={this.props.addProductState}
                        className="btn btn-success">Добавить
                </button>
            </div>
        )
    }

    getProducts() {
        const {products} = this.props;
        if (!products) return null;

        return products.map((item, index) => {
            const {product} = item;
            return (
                <div key={product.id}>
                    <div>{product.name} - {product.vendor_code}</div>
                    <div className="form-group">
                        <label>Количество товара</label>
                        <input className="form-control"
                               value={item.count}
                               onChange={(e) => this.props.handleChangeCount(e, index)}/>
                    </div>
                </div>
            )
        })
    }
}