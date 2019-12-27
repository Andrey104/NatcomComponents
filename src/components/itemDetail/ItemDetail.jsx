import React from 'react';
import {connect} from 'react-redux';
import history from '../../history';
import Loader from '../Loader';
import ItemPrices from '../itemDetail/ItemPrices';
import MainImage from '../itemDetail/MainImage';
import ItemStocks from '../itemDetail/ItemStocks';
import ItemImages from '../itemDetail/ItemImages';
import {getProduct} from '../../AC/products';
import {checkSubcategory} from '../../services/utils';
import {units} from '../../constans';
import './styles.css';
import {UsersService} from "../../services/users.service";
import {getMembrane} from "../../AC/membranes";

class ItemDetail extends React.Component {
    urlId;
    itemType;

    componentDidMount = () => {
        console.log(this.props.itemId,"    ", this.props.itemType);
        this.urlId = this.props.itemId;
        this.itemType = this.props.itemType;
        this.itemType === "product" ? this.props.getProduct(this.urlId) :
        this.props.getMembrane(this.urlId);
    };

    handleEditProduct = () => {
      if(this.itemType === "product")  history.push(`/products/${this.urlId}/edit`);
      else history.push(`/membranes/${this.urlId}/edit`);
    };

    handleEditProductServerAdmin = () => {
        if(this.itemType === "product") document.location.replace(`http://components.nextf.ru/admin/items/product/${this.urlId}/change/`);
        else document.location.replace(`http://components.nextf.ru/admin/items/membranes/${this.urlId}/change/`);
    };

    handleProductHistory = () => {
        if(this.itemType === "product") history.push(`/products/history/${this.props.product.item}`);
        else history.push(`/membranes/history/${this.props.product.item}`);
    };

    getCategories(item) {
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
                    <td>{item.category.name}</td>
                    <td>{checkSubcategory(item.subcategory)}</td>
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
        const {product, membrane} = this.props;
        let item;
        this.itemType === "product" ? item = product : item = membrane;
        console.log(item);
        if (item.id !== Number(this.urlId)) {
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
                        <h3>{item.name}</h3>
                        {this.getEditButtons()}
                        <button onClick={this.handleProductHistory}>Движение</button>
                        <h5>Артикул {item.vendor_code}</h5>
                        {this.itemType === "product" ? <div>Единица измерения: {units[item.unit - 1]}</div> : null}
                        <ItemPrices item={item}/>
                        {this.itemType === "product" ? this.getCategories(item) : null}
                    </div>
                    <div className="col-4">
                        <MainImage mainImage={item.main_image}/>
                    </div>
                </div>
                <div className="row">
                    <h5>Остатки</h5>
                    <ItemStocks stocks={item.stocks}/>
                </div>
                <div className="row">
                    <ItemImages images={item.images}/>
                </div>
            </div>
        )
    }
}

export default connect((state) => ({
    product: state.products.product,
    membrane: state.membranes.membrane
}), {getProduct, getMembrane})(ItemDetail);