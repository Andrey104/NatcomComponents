import React from 'react';
import {connect} from 'react-redux';

import Loader from '../../../../components/Loader/index';
import AddButton from '../../../../components/AddButton/index'
import ProductCard from './ProductCard/index';
import InfiniteScrollOverride from '../../../../services/InfiniteScrollOverride';
import {mapToArr} from '../../../../helpers';
import {getAllProducts, getNextProducts} from '../../../../AC/products';
import history from '../../../../history';
import {getCurrentUser} from "../../../../AC/currentUser";
import {UsersService} from "../../../../services/users.service";

class ProductsList extends React.Component {

    componentWillMount = () => {
        this.props.getAllProducts(this.props.filters);
        //this.props.getCurrentUser();
    };

    loadProducts = page => {
        this.props.getNextProducts(this.props.filters, this.props.nextPageNumber);
    };

    openAddProduct = () => history.push('/products/add');

    getBody(products) {
        if (!products.length) {
            return (
                <tr>
                    <td colSpan='5'>Товары не найдены</td>
                </tr>
            );
        }
        return products.map((product) => (
            <ProductCard key={product.id}
                         product={product}/>
        ));
    }

    render() {
        let buttonBlock = null;
        if (UsersService.adminPermission()) {
            buttonBlock = <AddButton openAdd={this.openAddProduct}/>
        }

        const {isLoading, products, hasMoreProducts} = this.props;
        if (isLoading && products.length === 0) {
            return (
                <div className="pre-loader-container">
                    <Loader/>
                </div>
            );
        }
        const loader = hasMoreProducts ? <Loader/> : false;
        return (
                    <InfiniteScrollOverride
                        pageStart={1}
                        loadMore={this.loadProducts}
                        hasMore={hasMoreProducts}
                        useWindow={false}>
                        <div className="row">
                            <div className="col-12">
                                <table className="table table-hover table-bordered">
                                    <thead className="thead-light">
                                    <tr>
                                        <th scope="col">Артикул</th>
                                        <th scope="col">Наименование</th>
                                        <th scope="col">В наличии</th>
                                        <th scope="col">Цена по ум.</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {this.getBody(products)}
                                    </tbody>
                                </table>
                                {loader}
                            </div>
                            {buttonBlock}
                        </div>
                    </InfiniteScrollOverride>
        )
    }
}

export default connect((state) => ({
    products: mapToArr(state.products.products),
    currentStockId: state.currentUser.stock,
    isLoading: state.products.isLoading,
    filters: state.products.filters,
    nextPageNumber: state.products.nextPageNumber,
    hasMoreProducts: state.products.hasMoreProducts
}), {getCurrentUser, getAllProducts, getNextProducts})(ProductsList);