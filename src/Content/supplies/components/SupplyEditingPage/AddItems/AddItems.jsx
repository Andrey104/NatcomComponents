import React, {Component} from 'react';
import {connect} from 'react-redux';

import {mapToObj} from "../../../../../helpers";
import AddItemsDialog from '../../../../../components/addItemsDialog/AddItemsDialog';
import ItemCardInSupply from './ItemCardInSupply/ItemCardInSupply';
import TableResultRow from '../../../../../components/TableResultRow';
import {openModalWindow, closeModalWindow} from '../../../../../AC/modal';
import {ITEM_MEMBRANE, ITEM_PRODUCT, OPEN_ADD_ITEMS} from '../../../../../constans';

class AddItems extends Component {
    resultPrice;

    constructor(props) {
        super(props);
        const {items} = this.props;
        this.state = {items};
    };

    selectedItems = (item) => {
        let newItem = {
            item: mapToObj(item),
            count: 0,
            purchase_price: 0
        };
        let items = this.state.items;
        items.push(newItem);

        this.setState({items: items});
        this.props.selectedItems(this.state.items);
        this.closeDialog();
    };

    closeDialog = () => this.props.closeModalWindow();

    handleChangeItemParam = (value, index, state) => {
        const currentItems = this.state.items;
        currentItems[index][state] = Number(value);

        this.setState({items: currentItems}, () => {
            this.props.selectedItems(this.state.items);
        });
    };

    removeItemFromList = itemIndex => {
        const newItems = this.state.items.filter(item => (
            this.state.items.indexOf(item) !== (itemIndex - 1)
        ));
        this.setState({items: newItems}, () => {
            this.props.selectedItems(this.state.items)
        });
    };

    getDialogWindow() {
        const {modal} = this.props;
        if (modal === OPEN_ADD_ITEMS) {
            return (
                <AddItemsDialog header={'Добавить товары'}
                                items={this.props.items}
                                selectedItems={this.selectedItems}
                                close={this.closeDialog}/>
            )
        }
    };

    getItemPrice(inItem) {
        let item = inItem.item;
        if (item.type === ITEM_PRODUCT) {
            return inItem.count * inItem.purchase_price;
        }
        if (item.type === ITEM_MEMBRANE) {
            return inItem.count * inItem.purchase_price * item.width;
        }
    };

    getItems() {
        this.resultPrice = 0;
        return this.state.items.map((item, index) => {
            const itemPrice = this.getItemPrice(item);
            this.resultPrice += itemPrice;
            return (
                <ItemCardInSupply key={item.item.id + item.item.name + index}
                                  item={item}
                                  number={++index}
                                  itemPrice={itemPrice}
                                  handleChangeItemParam={this.handleChangeItemParam}
                                  removeItemFromList={this.removeItemFromList}/>
            )
        });
    }

    getItemsTable() {
        if (this.state.items.length) {
            return (
                <div className="mobile-table-container">
                    <table className="table table-bordered">
                        <thead className="thead-light">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Название</th>
                            <th scope="col">Пред. цена закупки</th>
                            <th scope="col">Закупочная цена</th>
                            <th scope="col">Количество</th>
                            <th scope="col">Итог</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.getItems()}
                        <TableResultRow columnCount={6}
                                        resultPrice={this.resultPrice}/>
                        </tbody>
                    </table>
                </div>
            )
        }
    }

    render() {
        return (
            <div>
                {this.getDialogWindow()}
                <button type="button"
                        onClick={() => this.props.openModalWindow(OPEN_ADD_ITEMS)}
                        className="btn btn-success btn-sm">Добавить товары
                </button>
                {this.getItemsTable()}
            </div>
        )
    }
}

export default connect(state => ({
    modal: state.modal.modal
}), {openModalWindow, closeModalWindow})(AddItems);