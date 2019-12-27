import React from 'react';
import {connect} from 'react-redux';
import history from '../../../history';
import Loader from '../../../components/Loader';
import ItemPrices from '../../../components/itemDetail/ItemPrices';
import MainImage from '../../../components/itemDetail/MainImage';
import ItemStocks from '../../../components/itemDetail/ItemStocks';
import ItemImages from '../../../components/itemDetail/ItemImages';
import {getProduct} from '../../../AC/products';
import {getMembrane} from '../../../AC/membranes';
import {checkSubcategory} from '../../../services/utils';
import {units} from '../../../constans';
import './styles.css';
import {UsersService} from "../../../services/users.service";
import MembraneDescription from "../../membranes/membraneDetail/MembraneDescription";

class ProductDetail extends React.Component {
    urlId;
    componentDidMount = () => {
        const {productType} = this.props;
        if (productType === 0) {
            this.urlId = this.props.match.params.productId;
            this.props.getProduct(this.urlId);
        }
        else if(productType === 1){
            this.urlId = this.props.match.params.membraneId;
            this.props.getMembrane(this.urlId);
        }
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
        product ? item = product : item = membrane;
        if (item.id !== Number(this.urlId)) {
            return (
                <div className="pre-loader-container">
                    <Loader/>
                </div>
            );
        }
        return (
            <div className="col-12">
                {product ?
                    <div>
                    <div className="row">
                        <div className="col-8">
                            <h3>{item.name}</h3>
                            {this.getEditButtons()}
                            <button onClick={this.handleProductHistory}>Движение</button>
                            <h5>Артикул {item.vendor_code}</h5>
                            <div>Единица измерения: {units[item.unit - 1]}</div>
                            <ItemPrices item={item}/>
                            {this.getCategories(item)}
                        </div>
                        <div className="col-4">
                            <MainImage mainImage={item.main_image}/>
                        </div>
                    </div>
                    < div className="row">
                    <h5>Остатки</h5>
                    <ItemStocks stocks={item.stocks}/>
                    </div>
                    <div className="row">
                    <ItemImages images={item.images}/>
                    </div>
                    </div>
                    :
                    <div>
                    <div className="row">
                        <div className="col-8">
                            <button onClick={this.handleEditMembrane}>Ред</button>
                            <br/>
                            <br/>
                            <button onClick={this.handleMembraneHistory}>Движение</button>
                            <MembraneDescription membrane={item}/>
                        </div>
                        <div className="col-4">
                            <MainImage mainImage={item.main_image}/>
                        </div>
                    </div>
                    <div className="row">
                    <ItemStocks stocks={item.stocks}/>
                    </div>
                    <div className="row">
                    <ItemImages images={item.images}/>
                    </div>
                    </div>
                }
            </div>
        )
    }
}

export default connect((state) => ({
    product: state.products.product,
    membrane: state.membranes.membrane,
    productType: state.products.productType
}), {getProduct, getMembrane})(ProductDetail);