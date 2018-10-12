import React from 'react';

export default class extends React.Component {

    constructor(props) {
        super(props);
        const {stocks, stock} = this.props;
        const defaultStock = stock ? stock : stocks[0].id;
        this.state = {
            stock: defaultStock,
        };
    }

    selectStock = event => {
        const {stocks} = this.props;
        const stockId = Number(event.target.value);
        const stock = stocks.find(stockArr => (stockArr.id === stockId));
        this.props.addStock(stock);
    };

    render() {
        const {stocks} = this.props;
        return (
            <div className="form-group row">
                <label className="col-sm-2 col-form-label">Склад</label>
                <div className="col-sm-10">
                    <select className="form-control"
                            onChange={this.selectStock}
                            defaultValue={this.state.stock}>
                        {stocks.map(stock => (
                            <option value={stock.id}
                                    key={stock.id}>{stock.name}</option>
                        ))}
                    </select>
                </div>
            </div>
        )
    }
}