import React from 'react';
import {connect} from 'react-redux';

import {addCustomPrices} from '../../../../../AC/customPrices';

class AddCustomPrices extends React.Component {
    items = [];
    error = false;

    handleChangeItemPrice = (event, index) => {
        const price = Number(event.target.value);
        if (!isFinite(price)) return;
        this.items[index].price = price;
        this.props.selectedItemsState(this.items);
    };

    handleSubmit = () => {
        const {clientId, addCustomPrices} = this.props;
        const items = this.items.map(itemArr => (
            {item: itemArr.item.item, price: itemArr.price}
        ));
        addCustomPrices(clientId, {items});
        this.props.selectedItemsState([]);
    };

    removeItemFromList = deleteItem => {
        const newItems = this.items.filter(itemArr => itemArr.item.item !== deleteItem.item);
        this.props.selectedItemsState(newItems);
    };

    matchesCheck() {
        const {currentCustomPrices} = this.props;
        this.error = false;
        for (const price of currentCustomPrices) {
            for (const itemArr of this.items) {
                if (itemArr.item.item === price.item.item) {
                    this.error = true;
                    return (
                        <span className="error-text">
                            Нельзя добавить несколько особых цен на один и тот же товар.
                        </span>
                    )
                }
            }
        }
    }

    checkFormValid() {
        for (const item of this.items) {
            if (item.price === 0)
                return true;
        }
        return false;
    }

    getBody() {
        return this.items.map((itemArr, index) => (
                <tr key={itemArr.item.item}>
                    <td>{index + 1}</td>
                    <td>{itemArr.item.name}</td>
                    <td className="form-group">
                        <input className="form-control"
                               placeholder="Введите цену"
                               onChange={e => this.handleChangeItemPrice(e, index)}/>
                    </td>
                    <td>
                        <button type="button"
                                onClick={() => this.removeItemFromList(itemArr.item)}
                                className="btn btn-danger btn-sm detail-btn">Удалить
                        </button>
                    </td>
                </tr>
            )
        )
    }

    render() {
        const {items} = this.props;
        this.items = items;
        return (
            <div>
                <table className="table table-bordered">
                    <thead className="thead-light">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Наименование</th>
                        <th scope="col">Цена</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.getBody()}
                    </tbody>
                </table>
                {this.matchesCheck()}
                <div className="text-right">
                    <button type="button"
                            onClick={this.handleSubmit}
                            disabled={this.error || this.checkFormValid()}
                            className="btn btn-primary btn-success">Сохранить
                    </button>
                </div>
            </div>
        )
    }
}

export default connect(null, {addCustomPrices})(AddCustomPrices);