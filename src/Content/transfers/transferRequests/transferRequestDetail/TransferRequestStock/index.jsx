import React from 'react';

import StockCard from '../../../../stocks/stocksList/StockCard'

export default class TransferRequestStock extends React.Component {
    render() {
        return (
            <table className="table table-hover table-bordered">
                <thead className="thead-light">
                    <tr>
                        <th scope="col">Название</th>
                        <th scope="col">Адрес</th>
                        <th scope="col">Статус</th>
                    </tr>
                </thead>
                <tbody>
                    <StockCard stock={this.props.stock}
                               history={this.props.history}/>
                </tbody>
            </table>
        )
    }
}
