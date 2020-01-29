import React from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames/bind';

import Loader from '../../../../../components/Loader';
import AddCustomPrices from './AddCustomPrices/AddCustomPrices';
import AddItemsDialog from '../../../../../components/addItemsDialog/AddItemsDialog';
import CustomPriceCard from './CustomPriceCard/CustomPriceCard';
import EditCustomPrice from './EditCustomPrice/EditCustomPrice';
import {getCustomPrices, deleteCustomPrice, editCustomPrice} from '../../../../../AC/customPrices';
import {openModalWindow, closeModalWindow} from '../../../../../AC/modal';
import {deleteItemsFromStore} from '../../../../../AC/items';
import {getUniqueElementsArr} from '../../../../../services/utils';
import {mapToArr} from '../../../../../helpers';
import {OPEN_ADD_ITEMS, EDIT_CUSTOM_PRICE} from '../../../../../constans';
import styles from './CustomPrices.scss';

let cx = classNames.bind(styles);

class CustomPrices extends React.Component {
    customPrices;
    clientId;
    editItem;

    state = {
        items: []
    };

    componentWillMount = () => {
        this.clientId = this.props.clientId;
        this.props.getCustomPrices(this.clientId);
    };

    selectedItems = items => {
        this.props.closeModalWindow();
        let itemsArr = getUniqueElementsArr(items, this.state.items);
        itemsArr = itemsArr.map(item => ({item: item, price: 0}));
        itemsArr = itemsArr.concat(this.state.items);
        this.setState({items: itemsArr});
    };

    selectedItemsState = items => {
        const newItems = JSON.parse(JSON.stringify(items));
        this.setState({items: newItems});
    };

    openEditDialog = item => {
        this.editItem = item;
        this.props.openModalWindow(EDIT_CUSTOM_PRICE);
    };

    editCustomPrice = price => {
        this.props.editCustomPrice(this.clientId, this.editItem.id, price)
    };

    removeCustomPrice = itemId => this.props.deleteCustomPrice(this.clientId, itemId);

    getDialogWindow() {
        const {modal} = this.props;
        if (modal === OPEN_ADD_ITEMS) {
            return (
                <AddItemsDialog header={'Выбор товара'}
                                items={this.state.items}
                                selectedItems={this.selectedItems}
                                close={this.props.closeModalWindow}/>
            )
        } else if (modal === EDIT_CUSTOM_PRICE) {
            return (
                <EditCustomPrice header={'Редактирование цены'}
                                 editItem={this.editItem}
                                 handleSubmit={this.editCustomPrice}
                                 close={this.props.closeModalWindow}/>
            )
        }
    }

    getAddCustomPrices(customPrices) {
        if (this.state.items.length)
            return (
                <AddCustomPrices items={this.state.items}
                                 currentCustomPrices={customPrices}
                                 selectedItemsState={this.selectedItemsState}
                                 clientId={this.clientId}/>
            )
    }

    getBody(customPrices) {
        if (customPrices.length > 0) {
            this.customPrices = customPrices.map((itemPrice, index) => {
                return (
                    <CustomPriceCard key={itemPrice.item.item}
                                     number={++index}
                                     item={itemPrice}
                                     removeCustomPrice={this.removeCustomPrice}
                                     openEditDialog={this.openEditDialog}/>
                )
            })
        } else {
            this.customPrices = <tr>
                <td colSpan="3">Нет кастомных цен</td>
            </tr>;
        }
    }

    render() {
        const {prices, isLoading} = this.props;
        if (isLoading || !prices) {
            return (
                <div className={cx('pre-loader-container')}>
                    <Loader/>
                </div>
            );
        }
        this.getBody(prices);
        const dialogWindow = this.getDialogWindow();
        return (
            <div className="row">
                <div className="col-12">
                    {dialogWindow}
                    <button type="button"
                            onClick={() => this.props.openModalWindow(OPEN_ADD_ITEMS)}
                            className="btn btn-primary btn-sm">Добавить особые цены
                    </button>
                    {this.getAddCustomPrices(prices)}
                    <table className="table table-hover table-bordered">
                        <thead className="thead-light">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Наименование</th>
                            <th scope="col">Цена</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.customPrices}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

    componentWillUnmount = () => this.props.deleteItemsFromStore();
}

export default connect((state) => ({
    prices: mapToArr(state.customPrices.prices),
    isLoading: state.customPrices.isLoading,
    modal: state.modal.modal
}), {
    getCustomPrices,
    openModalWindow,
    closeModalWindow,
    deleteCustomPrice,
    editCustomPrice,
    deleteItemsFromStore
})(CustomPrices);
