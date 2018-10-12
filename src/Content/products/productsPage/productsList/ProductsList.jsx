import React from 'react';
import {connect} from 'react-redux';

import Loader from '../../../../components/Loader/index';
import AddButton from '../../../../components/AddButton/index'
import ProductCard from './ProductCard/index';
import InfiniteScrollOverride from '../../../../services/InfiniteScrollOverride';
import {mapToArr} from '../../../../helpers';
import {getAllProducts, getNextProducts} from '../../../../AC/products';
import history from '../../../../history';

class ProductsList extends React.Component {

    componentWillMount = () => this.props.getAllProducts();

    loadProducts = page => this.props.getNextProducts(page);

    openAddProduct = () => history.push('/products/add');

    getBody(products) {
        if (!products.length) {
            return (
                <tr>
                    <td colSpan='5'>Вы еще не добавили ни одного товара</td>
                </tr>
            );
        }
        return products.map((product, index) => (
            <ProductCard key={product.id}
                         number={++index}
                         product={product}/>
        ));
    }

    render() {
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
            <div className="row">
                <div className="col-12">
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
                                        <th scope="col">#</th>
                                        <th scope="col">Название</th>
                                        <th scope="col">Артикул</th>
                                        <th scope="col">Ед. измерения</th>
                                        <th scope="col">Предоплата</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {this.getBody(products)}
                                    </tbody>
                                </table>
                                {loader}
                            </div>
                            <AddButton openAdd={this.openAddProduct}/>
                        </div>
                    </InfiniteScrollOverride>
                </div>
            </div>
        )
    }
}

export default connect((state) => ({
    products: mapToArr(state.products.products),
    isLoading: state.products.isLoading,
    hasMoreProducts: state.products.hasMoreProducts
}), {getAllProducts, getNextProducts})(ProductsList);