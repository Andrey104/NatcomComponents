import React from 'react';
import {connect} from 'react-redux';

import Loader from '../../../components/Loader';
import StockInfo from '../stockInfo/StockInfo';
import {editStock, getStockDetail} from '../../../AC/stocks';
import {openModalWindow, closeModalWindow} from '../../../AC/modal';
import {EDIT_STOCK} from '../../../constans';
import styles from './styles.css';
import {checkMainStock} from "../../../services/utils";

class StockDetail extends React.Component {
    urlId;

    componentWillMount = () => {
        this.urlId = this.props.match.params.stockId;
        this.props.getStockDetail(this.urlId);
    };

    editStock = stock => this.props.editStock(this.urlId, stock);

    closeDialog = () => this.props.closeModalWindow();

    getDialogWindow() {
        const {modal, stock} = this.props;
        if (modal === EDIT_STOCK) {
            return (
                <StockInfo header={'Редактирование склада'}
                           handleSubmit={this.editStock}
                           close={this.closeDialog}
                           stock={stock}/>
            );
        }
    }

    render() {
        const {stock} = this.props;
        if (stock.id !== Number(this.urlId)) {
            return (
                <div className="pre-loader-container">
                    <Loader/>
                </div>
            );
        }
        return (
            <div>
                {this.getDialogWindow()}
                <table className="table table-bordered">
                    <tbody>
                    <tr>
                        <th className="name-col">Название</th>
                        <td>{stock.name}</td>
                    </tr>
                    <tr>
                        <th>Адрес</th>
                        <td>{stock.address}</td>
                    </tr>
                    <tr>
                        <th>Статус</th>
                        <td>{checkMainStock(stock.main)}</td>
                    </tr>
                    </tbody>
                </table>
                <button type="button"
                        onClick={() => this.props.openModalWindow(EDIT_STOCK)}
                        className="btn btn-primary btn-sm">Редактировать
                </button>
            </div>
        )
    }
}

export default connect((state) => ({
    stock: state.stocks.stock,
    modal: state.modal.modal
}), {getStockDetail, editStock, openModalWindow, closeModalWindow})(StockDetail);