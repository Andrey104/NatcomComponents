import React from 'react';

export default class extends React.Component {
    defaultProduct;

    constructor(props) {
        super(props);
        const {product, harpoonProducts} = this.props;
        this.defaultProduct = product ? product : harpoonProducts[0].id;
    }

    handleChangeProduct = (event) => this.props.addProduct(Number(event.target.value));

    render() {
        const {harpoonProducts} = this.props;
        return (
            <div className="form-group row">
                <label className="col-sm-2 col-form-label">Гарпун</label>
                <div className="col-sm-10">
                    <select className="form-control"
                            onChange={this.handleChangeProduct}
                            defaultValue={this.defaultProduct}>
                        {harpoonProducts.map(product => (
                            <option value={product.id}
                                    key={product.id}>{product.name}</option>
                        ))}
                    </select>
                </div>
            </div>
        )
    }

}
