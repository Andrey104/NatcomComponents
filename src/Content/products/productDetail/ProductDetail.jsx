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
        return <div>{`${product.category.name} > ${checkSubcategory(product.subcategory)}`}</div>;
    }

    getEditButtons() {
        if (UsersService.managerPermission()) {
            return (
                <div className="item-page-edit-buttons-container">
                    <button onClick={this.handleEditProduct}>Редактировать</button>
                    <br/>
                    <br/>
                    <button onClick={this.handleEditProductServerAdmin}>Редактировать(Через SERVER ADMIN)</button>
                    <br/>
                    <br/>
                    <button onClick={this.handleProductHistory}>Движение</button>
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
            <div className="item-page">
                <div className="item-page-title">
                    <h3>{`${product.name} ${product.vendor_code} ${units[product.unit - 1]}`}</h3>
                    {this.getCategories(product)}
                    <div className="item-page-images-container">
                        <MainImage mainImage={product.main_image}/>
                        <ItemImages images={product.images}/>
                    </div>
                </div>
                <div className="item-page-dop-info">
                    {this.getEditButtons()}
                    <ItemPrices item={product}/>
                    <div className="item-page-stocks">
                        <h5>Остатки</h5>
                        <ItemStocks stocks={product.stocks}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect((state) => ({
    product: state.products.product,
}), {getProduct})(ProductDetail);