import React from 'react';

export default class extends React.Component {

    handleChangeItemStocks = (event, index) => {
        const name = event.target.name;
        const value = event.target.value;
        this.props.addItemStocks(value, index, name);
    };

    getStocks(stocks) {
        return stocks.map((stock, index) => (
                <tr key={stock.id}>
                    <td>{stock.name}</td>
                    <td>
                        <input type="text"
                               name="min_count"
                               onChange={e => this.handleChangeItemStocks(e, index)}
                               className="form-control"/>
                    </td>
                    <td>
                        <input type="text"
                               name="desired_count"
                               onChange={e => this.handleChangeItemStocks(e, index)}
                               className="form-control"/>
                    </td>
                </tr>
            )
        )
    }

    getBody() {
        const {stocks} = this.props;
        if (stocks.length) {
            return (
                <table className="table table-bordered">
                    <thead className="thead-light">
                    <tr>
                        <th>Склад</th>
                        <th>Минимальное количество</th>
                        <th>Ожидаемое количество</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.getStocks(stocks)}
                    </tbody>
                </table>
            )
        }
    }

    render() {
        return (
            <div>
                {this.getBody()}
            </div>
        )
    }
}