import React from 'react';
import Switch from 'react-router-dom/es/Switch';
import Route from 'react-router-dom/es/Route';
import NavLink from 'react-router-dom/es/NavLink';
import {connect} from 'react-redux';
import NavigationBar from '../../../components/NavigationBar';

import ProductsPage from './productsPage/ProductsPage';
import EditProduct from './editProduct/EditProduct';
import ComponentMenu from '../../../components/ComponentMenu/ComponentMenu'
import ProductDetail from './productDetail/ProductDetail';
import {deleteProductsFromStore} from '../store/actions/products';
import styles from './ProductsRouter.css';
import MembranesPage from "../../../components/addItemsDialog/membranesPage/MembranesPage";
import ItemHistory from "../../items/itemHistory/ItemHistory";

class ProductsRouter extends React.Component {

    getMenu() {
        let menu = (
            <NavLink className="page-title" to='/products'>
                <span>Товары</span>
            </NavLink>
        );
        const urlId = this.props.match.params.productId;
        const {product} = this.props;
        if (this.props.match.url.indexOf('add') !== -1) {
            menu = (
                <ComponentMenu menu={menu} name={'Новый товар'}/>
            );
        } else if (urlId && product !== undefined) {
            if (Number(urlId) === product.id) {
                menu = (
                    <ComponentMenu menu={menu} name={this.props.product.name}/>
                );
            }
        }
        return menu;
    }

    render() {
        return (
            <div>
                <div className="breadcrumbs">
                    {this.getMenu()}
                </div>
                <Switch>
                    <Route exact path='/products' component={ProductsPage}/>
                    <Route exact path='/products/add' component={EditProduct}/>
                    <Route exact path='/products/:productId' component={ProductDetail}/>
                    <Route exact path='/products/:productId/edit' component={EditProduct}/>
                    <Route exact path='/products/history/:itemId' component={ItemHistory}/>
                </Switch>
            </div>
        )
    }
    componentWillUnmount = () => this.props.deleteProductsFromStore();
}

export default connect((state) => ({
    product: state.products.product,
}), {deleteProductsFromStore})(ProductsRouter);
