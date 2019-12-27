import React from 'react';
import {connect} from 'react-redux';
import history from '../../../history';

import Loader from '../../../components/Loader';
import ItemPrices from '../../../components/itemDetail/ItemPrices';
import MainImage from '../../../components/itemDetail/MainImage';
import ItemStocks from '../../../components/itemDetail/ItemStocks';
import ItemImages from '../../../components/itemDetail/ItemImages';
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
        history.push(`/products/history/${this.props.product.item}`);
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
                <div className="edit-buttons-container-for-item-page">
                    <button className="edit-button-for-item-page" onClick={this.handleEditProduct}>
                        <img src="../../../images/edit-button.png"/>Редактировать
                    </button>
                    <button className="edit-button-for-item-page" onClick={this.handleProductHistory}>
                        <img src="../../../images/motion-button.png" />Движение
                    </button>
                    <button className="edit-button-for-item-page" onClick={this.handleEditProductServerAdmin}>
                        <img src="../../../images/admin-edit.png"/>ADMIN
                    </button>
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
            <div className="item-page-container">
                <div className="item-page-main-info">
                    <div className="main-images-container">
                        <div>
                            <h3>{product.name}</h3>
                            <h3>{this.itemType === "product" ? `${product.vendor_code} ${product.name} (${units[product.unit - 1]})` : null}</h3>
                        </div>
                        <h6>{`${product.category.name} > ${checkSubcategory(product.subcategory)}`}</h6>
                        <MainImage mainImage={product.main_image} images={product.images}/>
                        {product.images ? <ItemImages images={product.images} />
                            : <h3>Нет изображений</h3>}
                    </div>
                    <div className="item-page-dop-info">
                        {this.getEditButtons()}
                        <ItemPrices item={product}/>
                        <div className="item-stocks">
                            <h4>Остатки</h4>
                            <ItemStocks stocks={product.stocks}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect((state) => ({
    product: state.products.product,
}), {getProduct})(ProductDetail);