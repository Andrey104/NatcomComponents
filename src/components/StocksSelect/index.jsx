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
            <tr>
                <th scope="row">Склад</th>
                <td>
                    <select className="form-control"
                            onChange={this.selectStock}
                            defaultValue={this.state.stock}>
                        {stocks.map(stock => (
                            <option value={stock.id}
                                    key={stock.id}>{stock.name}</option>
                        ))}
                    </select>
                </td>
            </tr>
        )
    }
}