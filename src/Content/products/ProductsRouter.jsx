import React from 'react';
import Switch from 'react-router-dom/es/Switch';
import Route from 'react-router-dom/es/Route';
import NavLink from 'react-router-dom/es/NavLink';
import {connect} from 'react-redux';

import ProductsPage from './productsPage/ProductsPage';
import AddNewProduct from './addNewProduct/AddNewProduct';
import ComponentMenu from '../../components/ComponentMenu'
import ProductDetail from './productDetail/ProductDetail';
import {deleteProductsFromStore} from '../../AC/products';
import styles from './styles.scss';

class ProductsRouter extends React.Component {

    getMenu() {
        let menu = (
            <NavLink to='/products'>
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
        const menu = this.getMenu();
        return (
            <div>
                <div className={styles["suppliers-menu"]}>
                    {menu}
                </div>
                <Switch>
                    <Route exact path='/products' component={ProductsPage}/>
                    <Route exact path='/products/add' component={AddNewProduct}/>
                    <Route exact path='/products/:productId' component={ProductDetail}/>
                </Switch>
            </div>
        )
    }

    componentWillUnmount = () => this.props.deleteProductsFromStore();
}

export default connect((state) => ({
    product: state.products.product,
}), {deleteProductsFromStore})(ProductsRouter);
