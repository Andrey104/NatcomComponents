import React from 'react';

export default class extends React.Component {

    selectStock = event => this.props.selectStock(Number(event.target.value));

    getStocksForSelect = () => {
        const {products, stock} = this.props;
        const stocks = products[0].stocks;
        return stocks.filter(arrStock => arrStock.stock.id === stock || arrStock.stock.main);
    };

    render() {
        const {products} = this.props;
        if (!products.length) return null;
        const stocksForSelect = this.getStocksForSelect();
        return (
            <div>
                <label>Склад</label>
                <select className="form-control"
                        onChange={this.selectStock}
                        defaultValue={stocksForSelect[0].stock.id}>
                    {stocksForSelect.map(stock => (
                        <option value={stock.stock.id}
                                key={stock.stock.id}>{stock.stock.name}</option>
                    ))}
                </select>
            </div>
        )
    }
}