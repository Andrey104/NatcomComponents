import React from 'react';

import DialogWindow from '../DialogWindow';
import ProductsPage from './productsPage/ProductsPage';
import MembranesPage from './membranesPage/MembranesPage';
import './styles.css';

class AddItemsDialog extends React.Component {
    items = [];
    isProducts = true;

    constructor(props) {
        super(props);
        const {items} = props;
        this.currentItems = items;
        this.state = {
            btnText: 'Пленки'
        };
    }

    handleSelectItems = (item, checkboxValue) => {
        if (checkboxValue) {
            this.items.push(item);
        } else {
            this.items = this.items.filter(arrItem => arrItem.item !== item.item);
        }
    };

    getItems = () => {
        this.isProducts = !this.isProducts;
        const btnText = this.isProducts ? 'Пленки' : 'Товары';
        this.setState({btnText})
    };

    handleSubmit = event => {
        event.preventDefault();
        this.props.selectedItems(this.items);
    };

    getItemsList() {
        if (this.isProducts) {
            return (
                <ProductsPage currentItems={this.currentItems}
                              handleSelectItems={this.handleSelectItems}/>
            )
        } else {
            return (
                <MembranesPage currentItems={this.currentItems}
                               handleSelectItems={this.handleSelectItems}/>
            )
        }
    }

    render() {
        return (
            <div>
                <div className="modal-body content">
                    <button type="button"
                            className="btn-dark"
                            onClick={this.getItems}>{this.state.btnText}
                    </button>
                    {this.getItemsList()}
                </div>
                <div className="modal-footer">
                    <button type="button"
                            onClick={this.props.close}
                            className="btn btn-secondary">Отмена
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

export default DialogWindow(AddItemsDialog);
