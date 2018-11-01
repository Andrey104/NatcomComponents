import React from 'react';
import classNames from 'classnames/bind';

import AddItemForOrder from './addItemForOrder/AddItemForOrder';
import TableResultRow from '../../../../components/TableResultRow/index';
import {moneyFormat, countFormat} from '../../../../services/utils';
import styles from './styles.css';

let cx = classNames.bind(styles);

export default class extends React.Component {
    resultPrice = 0;
    resultPrepayment = 0;
    items = [];
    openAddItemDialog = false;

    constructor(props) {
        super(props);
        const {items} = this.props;
        this.items = items;
        this.getResultPrice();
    }

    addProductsState = () => {
        this.openAddItemDialog = !this.openAddItemDialog;
        this.props.dialogWindowState();
    };

    selectedProducts = (item, stocks, currentStock) => {
        const coincidence = this.items.find(itemArr => (
            itemArr.item.item === item.item
        ));
        if (coincidence) {
            let arr = [];
            arr.push(coincidence.currentStock);
            coincidence.stocks = arr;
            stocks = stocks.filter(stock => stock.stock.id !== coincidence.currentStock.stock.id);
            currentStock = stocks[0];
        }
        this.items.push({item, stocks, currentStock});
        this.addProductsState();
    };

    handleChangeStock = (event, index) => {
        const stockId = Number(event.target.value);
        const selectedStock = this.items[index];
        selectedStock.currentStock = selectedStock.stocks.find(stock => (
            stock.stock.id === stockId
        ));
        this.addItems(index);
    };

    handleChangeCount = (event, index) => {
        const inputValue = Number(event.target.value);
        if (!isFinite(inputValue)) return;
        this.items[index].count = inputValue;
        this.getResultPrice();
        this.addItems(index);
    };

    addItems = index => {
        this.checkMaxCount(index);
        this.props.addItems(this.items, this.resultPrice, this.resultPrepayment);
    };

    checkMaxCount = index => {
        const item = this.items[index];
        const {in_way, reserve} = item.currentStock;
        const resultCount = item.currentStock.count + in_way - reserve;
        item.error = item.count > resultCount;
    };

    getResultPrice = () => {
        this.resultPrice = 0;
        this.resultPrepayment = 0;
        for (const item of this.items) {
            if (item.count) {
                const itemPrice = item.item.price * item.count;
                this.resultPrice += itemPrice;
                if (item.item.requires_prepayment)
                    this.resultPrepayment += itemPrice;
            }
        }
    };

    removeItemFromList = deleteItem => {
        if (deleteItem.stocks.length === 1) {
            const deleteItemCurrentStock = deleteItem.currentStock;
            this.items = this.items.filter(itemArr => {
                const itemArrKey = itemArr.item.item + itemArr.currentStock.stock.name;
                const deleteItemKey = deleteItem.item.item + deleteItemCurrentStock.stock.name;
                if (itemArrKey !== deleteItemKey) {
                    return itemArr;
                }
            });
            this.items = this.items.map(itemArr => {
                if (itemArr.item.item === deleteItem.item.item) {
                    itemArr.stocks.push(deleteItemCurrentStock);
                }
                return itemArr;
            });
        } else {
            this.items = this.items.filter(item => (
                item.item.item !== deleteItem.item.item)
            );
        }
        this.getResultPrice();
        this.props.addItems(this.items, this.resultPrice, this.resultPrepayment);
    };

    // Этот код отвечает за модалку с товарами
    getDialogWindow() {
        let dialogWindow = null;
        if (this.openAddItemDialog) {
            dialogWindow = <AddItemForOrder header={'Добавить товары'}
                                            stock={this.props.stock}
                                            client={this.props.client}
                                            currentItems={this.items}
                                            selectedProducts={this.selectedProducts}
                                            close={this.addProductsState}/>
        }
        return dialogWindow;
    }

    getCheckMaxCount(index) {
        const currentItem = this.items[index];
        if (currentItem.error || currentItem.count === 0) {
            return 'is-invalid';
        } else if (currentItem.count)
            return 'is-valid';
    }

    getItems() {
        const {items} = this.props;
        this.items = items;
        return (this.items.map((item, index) => (
            <tr key={item.item.item + item.currentStock.stock.name}>
                <th scope="row">{index + 1}</th>
                <td>{item.item.name}</td>
                <td>{
                    <select className="form-control"
                            onChange={e => this.handleChangeStock(e, index)}
                            defaultValue={item.currentStock.stock.id}>
                        {item.stocks.map(stock => (
                            <option key={stock.stock.id}
                                    value={stock.stock.id}>{stock.stock.name}</option>
                        ))}
                    </select>
                }</td>
                <td>{moneyFormat(item.item.price)}</td>
                <td>{countFormat(item.currentStock.count)}</td>
                <td><input type="text"
                           name="name"
                           value={item.count || 0}
                           className={cx('form-control', this.getCheckMaxCount(index))}
                           onChange={e => this.handleChangeCount(e, index)}/>
                </td>
                <td>
                    <button type="button"
                            onClick={() => this.removeItemFromList(item)}
                            className="btn btn-danger btn-sm">Удалить
                    </button>
                </td>
            </tr>
        )));
    }

    getItemsTable() {
        let itemsTable;
        if (this.items.length > 0) {
            itemsTable = (
                <table className="table table-bordered">
                    <thead className="thead-light">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Название</th>
                        <th scope="col">Склад</th>
                        <th scope="col">Цена</th>
                        <th scope="col">Количество на складе</th>
                        <th scope="col">Количество</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.getItems()}
                    <TableResultRow columnCount={6}
                                    resultPrice={this.resultPrice}/>
                    </tbody>
                </table>
            )
        } else {
            itemsTable = <h3 className="text-center">Товары не выбраны</h3>;
        }
        return itemsTable;
    }

    render() {
        const dialogWindow = this.getDialogWindow();
        const itemsTable = this.getItemsTable();
        return (
            <div className="col-12">
                {dialogWindow}
                <button type="button"
                        onClick={this.addProductsState}
                        className="btn btn-primary btn-sm">Добавить товар
                </button>
                {itemsTable}
            </div>
        )
    }
}