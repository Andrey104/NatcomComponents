import React from 'react';
import {connect} from 'react-redux';
import history from '../../../history';

import Loader from '../../../components/Loader';
import ItemPrices from '../../../components/itemDetail/ItemPrices';
import MainImage from '../../../components/itemDetail/MainImage';
import ItemStocks from '../../../components/itemDetail/ItemStocks';
import ItemImages from '../../../components/itemDetail/ItemImages';
import ItemImagesAdd from '../../../components/addNewItem/ItemImages';
import {getProduct} from '../../../AC/products';
import {checkSubcategory} from '../../../services/utils';
import {units} from '../../../constans';
import './styles.css';
import {UsersService} from "../../../services/users.service";

class ProductDetail extends React.Component {
    urlId;

    componentWillMount = () => {
        this.urlId = this.props.match.params.productId;
        this.props.getProduct(this.urlId);
    };

    handleEditProduct = () => {
        history.push(`/products/${this.urlId}/edit`);
    };

    handleEditProductServerAdmin = () => {
        document.location.replace(`http://components.nextf.ru/admin/items/product/${this.urlId}/change/`);
    };

    handleProductHistory = () => {
        history.push(`/products/history/${this.urlId}`);
    };

    getCategories(product) {
        return (
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">Категория</th>
                    <th scope="col">Подкатегория</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>{product.category.name}</td>
                    <td>{checkSubcategory(product.subcategory)}</td>
                </tr>
                </tbody>
            </table>
        );
    }

    getEditButtons() {
        if (UsersService.managerPermission()) {
            return (
                <div>
                    <button onClick={this.handleEditProduct}>Редактировать</button>
                    <br/>
                    <br/>
                    <button onClick={this.handleEditProductServerAdmin}>Редактировать(Через SERVER ADMIN)</button>
                </div>
            );
        }
    }

    render() {
        const {product} = this.props;
        if (product.id !== Number(this.urlId)) {
            return (
                <div className="pre-loader-container">
                    <Loader/>
                </div>
            );
        }
        return (
            <div className="col-12">
                <div className="row">
                    <div className="col-8">
                        <h3>{product.name}</h3>
                        {this.getEditButtons()}
                        <button onClick={this.handleProductHistory}>Движение</button>
                        <h5>Артикул {product.vendor_code}</h5>
                        <div>Единица измерения: {units[product.unit - 1]}</div>
                        <ItemPrices item={product}/>
                        {this.getCategories(product)}
                    </div>
                    <div className="col-4">
                        <MainImage mainImage={product.main_image}/>
                    </div>
                </div>
                <div className="row">
                    <h5>Остатки</h5>
                    <ItemStocks stocks={product.stocks}/>
                </div>
                <div className="row">
                    <ItemImages images={product.images}/>
                </div>
            </div>
        )
    }
}

export default connect((state) => ({
    product: state.products.product,
}), {getProduct})(ProductDetail);