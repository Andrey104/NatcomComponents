import React from 'react';
import classNames from 'classnames/bind';

import AddItemForOrder from './addItemForOrder/AddItemForOrder';
import TableResultRow from '../../../../components/TableResultRow/index';
import {priceFormat, countFormat, getUnit, getPositionSum} from '../../../../services/utils';
import styles from './styles.css';
import {ITEM_MEMBRANE, ITEM_PRODUCT, units} from "../../../../constans";

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
            stocks = stocks;
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
        var inputValue = (event.target.value);
        inputValue.replace(',', '.');
        // if (!isFinite(inputValue)) return;
        this.items[index].count = Number(inputValue);
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
        let itemPrice;
        for (const item of this.items) {
            if (item.count) {
                if (item.item.type === ITEM_PRODUCT) {
                    itemPrice = item.item.price * item.count;
                }
                if (item.item.type === ITEM_MEMBRANE) {
                    itemPrice = item.item.price * item.count * item.item.width;
                }
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

    getDialogWindow() {
        let dialogWindow = null;
        if (this.openAddItemDialog) {
            dialogWindow = <AddItemForOrder header={'Добавить товары'}
                                            stock={this.props.stock}
                                            client={this.props.client}
                                            currentItems={this.items}
                                            selectedProducts={this.selectedProducts}
                                            returnChecked={this.props.returnChecked}
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

    getItemName(inItem) {
        let item = inItem.item;
        if (item.type === ITEM_PRODUCT) {
            return (<td>{item.name}</td>);
        }
        if (item.type === ITEM_MEMBRANE) {
            return (<td>{item.texture.description} {item.color.description} {item.name} ({item.width})</td>);
        }
    }

    getSelectStock(item, index) {
        return (
            <td>
                <select onChange={e => this.handleChangeStock(e, index)}
                        defaultValue={1}>
                    {item.stocks.map(stock => (
                        <option key={stock.stock.id}
                                value={stock.stock.id}>{stock.stock.name}</option>
                    ))}
                </select>
            </td>
        )
    }

    getArea(inItem, index) {
        let item = inItem.item;
        if (item.type === ITEM_PRODUCT) {
            return null;
        }
        if (item.type === ITEM_MEMBRANE) {
            if (inItem.count) {
                return (<div>({(inItem.count * item.width).toFixed(2)}) м²</div>);
            } else {
                return <div>({(0).toFixed(2)}) м²</div>;
            }
        }
    }

    getItemPrice(inItem) {
        let item = inItem.item;
        if (item.type === ITEM_PRODUCT) {
            return (<td>{item.price} руб/{getUnit(inItem)}</td>);
        }
        if (item.type === ITEM_MEMBRANE) {
            return (<td>{item.price} руб/м²</td>);
        }
    }


    getItems() {
        const {items} = this.props;
        this.items = items;
        return (this.items.map((item, index) => (
                <tr key={item.item.id + item.item.name + index}>
                    <th scope="row">
                        <div className="number-block">
                            <img className="del-button"
                                 src="/public/remove.svg"
                                 onClick={() => this.removeItemFromList(item)}>
                            </img>
                            {index + 1}
                        </div>
                    </th>
                    <td>{item.item.vendor_code}</td>
                    {this.getSelectStock(item, index)}
                    {this.getItemName(item)}
                    <td>{item.currentStock.count}</td>
                    {this.getItemPrice(item)}
                    <td>
                        <div className="input-count">
                            <input type="number"
                                   name="name"
                                   value={item.count}
                                   className={cx('count-input', this.getCheckMaxCount(index))}
                                   onChange={e => this.handleChangeCount(e, index)}/>{getUnit(item)}
                        </div>
                        {this.getArea(item, index)}
                    </td>
                    <td>{getPositionSum(item, index)}</td>
                </tr>
            )
        ));
    }

    getItemsTable() {
        let itemsTable;
        let tableBody;
        if (this.items.length > 0) {
            tableBody = (
                <tbody>
                {this.getItems()}
                <TableResultRow columnCount={8}
                                resultPrice={this.resultPrice}/>
                </tbody>
            );
        } else {
            tableBody = (
                <tbody>
                <tr>
                    <td colSpan='8'>Товары не выбранны</td>
                </tr>
                </tbody>
            );
        }
        itemsTable = (
            <div className="table-responsive">
                <table className="table table-bordered">
                    <thead className="thead-light">
                    <tr>
                        <th scope="col">№</th>
                        <th scope="col">Артикул</th>
                        <th scope="col">Склад</th>
                        <th scope="col">Наименование</th>
                        <th scope="col">В наличии</th>
                        <th scope="col">Цена</th>
                        <th scope="col">Кол-во</th>
                        <th scope="col">Стоимость</th>
                    </tr>
                    </thead>
                    {tableBody}
                </table>
            </div>
        );
        return itemsTable;
    }

    render() {
        const dialogWindow = this.getDialogWindow();
        const itemsTable = this.getItemsTable();
        return (
            <div className="col-12">
                {dialogWindow}
                <h6>Товары и полотна</h6>
                {itemsTable}
                <button type="button"
                        onClick={this.addProductsState}
                        className="btn btn-primary btn-sm">Добавить
                </button>
            </div>
        )
    }
}