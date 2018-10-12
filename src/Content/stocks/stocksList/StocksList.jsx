import React from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames/bind';

import StockCard from './StockCard';
import StockCardDialog from '../../../components/AddStocksDialog/StockCardDialog';
import StockInfo from '../stockInfo/StockInfo';
import AddButton from '../../../components/AddButton';
import Loader from '../../../components/Loader';
import {getAllStocks, addNewStock} from '../../../AC/stocks';
import {openModalWindow, closeModalWindow} from '../../../AC/modal';
import {getStocksSelector} from '../../../selectors/stocksSelector';
import {ADD_NEW_STOCK} from '../../../constans';
import styles from './styles.css';

let cx = classNames.bind(styles);

class StocksList extends React.Component {

    componentWillMount = () => this.props.getAllStocks();

    addNewStock = stock => this.props.addNewStock(stock);

    closeDialog = () => this.props.closeModalWindow();

    getPageClasses = () => this.props.handleSelectStock ? 'dialog' : 'main-page';

    getDialogWindow() {
        const {modal} = this.props;
        if (modal === ADD_NEW_STOCK) {
            return (
                <StockInfo header={'Новый склад'}
                           handleSubmit={this.addNewStock}
                           close={this.closeDialog}/>
            )
        }
    }

    getAddButton() {
        if (!this.props.handleSelectStock) {
            return (
                <AddButton openAdd={() => this.props.openModalWindow(ADD_NEW_STOCK)}/>
            );
        }
    }

    getBody(stocks) {
        if (!this.props.handleSelectStock) {
            return stocks.map(stock =>
                <StockCard key={stock.id}
                           stock={stock}
                           history={this.props.history}/>
            );
        } else {
            return stocks.map(stock =>
                <StockCardDialog key={stock.id}
                                 stock={stock}
                                 handleSelectStock={this.props.handleSelectStock}/>
            );
        }
    }

    render() {
        const {isLoading, stocks} = this.props;
        if (isLoading || !stocks) {
            return (
                <div className="pre-loader-container">
                    <Loader/>
                </div>
            );
        }
        return (
            <div className="row">
                {this.getDialogWindow()}
                <div className={cx('col-12', this.getPageClasses())}>
                    <div className="row">
                        <div className="col-12">
                            <table className="table table-hover table-bordered">
                                <thead className="thead-light">
                                <tr>
                                    <th scope="col">Название</th>
                                    <th scope="col">Адрес</th>
                                    <th scope="col">Статус</th>
                                    {this.props.handleSelectStock ? <th scope="col">Выбор</th> : null}
                                </tr>
                                </thead>
                                <tbody>
                                {this.getBody(stocks)}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {this.getAddButton()}
                </div>
            </div>
        );
    }
}

export default connect((state) => ({
    stocks: getStocksSelector(state),
    isLoading: state.stocks.isLoading,
    modal: state.modal.modal
}), {
    getAllStocks,
    openModalWindow,
    closeModalWindow,
    addNewStock
})(StocksList);