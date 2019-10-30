import React from 'react';
import classNames from 'classnames/bind';
import {connect} from 'react-redux';

import DialogWindow from '../ModalWindow';
import Loader from '../Loader';
import {getAllProducts} from '../../AC/products';
import {mapToArr} from '../../helpers';
import styles from './styles.scss';
import ItemList from "../ItemList/ItemList";

let cx = classNames.bind(styles);

class AddProductDialog extends React.Component {
    items = [];

    componentWillMount = () => {
        const {client} = this.props;
        let params = '';
        if (client) {
            params = `?client=${client.id}`;
        }
        this.props.getAllProducts(params);
    };

    handleSelectProduct = (event, product) => {
        if (event.target.checked) {
            this.items.push(product);
        } else {
            this.items = this.items.filter(
                (arrProduct) => arrProduct.id !== product.id
            )
        }
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.selectedProducts(this.items);
    };

    close = () => this.props.close();

    /*getProducts(products) {
        if (products.length > 0) {
            return products.map(product => (
                <tr key={product.item}>
                    <td>{product.name}</td>
                    <td>{product.vendor_code}</td>
                    <td>
                        <input type="checkbox"
                               onChange={e => this.handleSelectProduct(e, product)}/>
                    </td>
                </tr>
            ))
        }
    }*/

    render() {
        const {products, isLoading} = this.props;
        if (products.length === 0 || isLoading) {
            return <Loader/>
        }
        return (
            <div>
                <div className="modal-body">
                            <ItemList selectMode={true}/>
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

export default DialogWindow(connect((state) => ({
    products: mapToArr(state.products.products),
    isLoading: state.products.isLoading
}), {getAllProducts})(AddProductDialog));