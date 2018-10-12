import React from 'react';

import DialogWindow from '../DialogWindow';
import StocksList from '../../Content/stocks/stocksList/StocksList';

class AddStocksDialog extends React.Component {
    stocks = [];

    handleSelectStock = (event, stock) => {
        if (event.target.checked) {
            this.stocks.push(stock);
        } else {
            this.stocks = this.stocks.filter(
                (arrStock) => arrStock.id !== stock.id
            )
        }
    };

    handleSubmit = event => {
        event.preventDefault();
        this.props.addStocks(this.stocks);
    };

    close = () => this.props.close();

    render() {
        return (
            <div>
                <div className="modal-body">
                    <StocksList handleSelectStock={this.handleSelectStock}/>
                </div>
                <div className="modal-footer">
                    <button type="button"
                            onClick={this.close}
                            className="btn btn-secondary">Закрыть
                    </button>
                    <button type="submit"
                            onClick={this.handleSubmit}
                            className="btn btn-primary">Добавить
                    </button>
                </div>
            </div>
        )
    }
}

export default DialogWindow(AddStocksDialog);