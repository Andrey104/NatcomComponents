import React from 'react';
import {connect} from 'react-redux';

import AddItemsDialog from '../../../../components/addItemsDialog/AddItemsDialog';
import ItemCardInSupply from './ItemCardInSupply/index';
import TableResultRow from '../../../../components/TableResultRow/index';
import {openModalWindow, closeModalWindow} from '../../../../AC/modal';
import {OPEN_ADD_ITEMS} from '../../../../constans';

class AddItems extends React.Component {
    resultPrice;

    constructor(props) {
        super(props);
        const {items} = this.props;
        this.state = {items};
    }

    selectedItems = items => {
        let newItems = items.map(item => ({
            item,
            count: 0,
            purchasePrice: 0
        }));
        newItems = newItems.concat(this.state.items);
        this.setState({items: newItems}, () => {
            this.props.selectedItems(this.state.items)
        });
        this.closeDialog();
    };

    closeDialog = () => this.props.closeModalWindow();

    handleChangeItemParam = (value, index, state) => {
        const currentItems = this.state.items;
        currentItems[index][state] = value;
        this.setState({items: currentItems}, () => {
            this.props.selectedItems(this.state.items);
        });
    };

    removeItemFromList = item => {
        const newItems = this.state.items.filter(itemArr => (
            itemArr.item.item !== item.item.item
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

    getItems() {
        this.resultPrice = 0;
        return this.state.items.map((item, index) => {
            const itemPrice = item.count * item.purchasePrice;
            this.resultPrice += itemPrice;
            return (
                <ItemCardInSupply key={item.item.item}
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
                <table className="table table-bordered">
                    <thead className="thead-light">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Название</th>
                        <th scope="col">Закупочная цена</th>
                        <th scope="col">Количество</th>
                        <th scope="col">Итог</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.getItems()}
                    <TableResultRow columnCount={5}
                                    resultPrice={this.resultPrice}/>
                    </tbody>
                </table>
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