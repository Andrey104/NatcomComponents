import React from 'react';
import {connect} from 'react-redux';

import ProductsFilters from '../../../../../../components/productsFilters/ProductsFilters';
import ProductsList from './ProductsList';
import StockForOrder from '../StockForOrder';
import {getAllClientProductsWithStocks} from '../../../../../../AC/products';
import {getCategoriesAndSubcategories} from '../../../../../../AC/categories';
import {mapToArr} from '../../../../../../helpers';

class ProductsPage extends React.Component {

    state = {
        stockId: null
    };

    componentWillMount = () => {
        const {client, products, filters} = this.props;
        if (!products.length && !filters) {
            const url = `?client=${client.id}`;
            this.props.getCategoriesAndSubcategories();
            this.props.getAllClientProductsWithStocks(url);
        }
    };

    getFilterParams = params => {
        this.props.getAllClientProductsWithStocks(params);
    };

    selectStock = stockId => {
        this.setState({stockId});
        this.props.selectStock(stockId);
    };

    render() {
        const {categories, products, subcategories} = this.props;
        return (
            <div>
                <StockForOrder products={products}
                               stock={this.props.stock.id}
                               selectStock={this.selectStock}/>
                <ProductsFilters categories={categories}
                                 subcategories={subcategories}
                                 getFilterParams={this.getFilterParams}
                                 action={this.props.getAllClientProductsWithStocks}
                                 client={this.props.client}/>
                <ProductsList products={products}
                              getItemCount={this.props.getItemCount}
                              handleSubmit={this.props.handleSubmit}/>
            </div>
        )
    }
}

export default connect(state => ({
    products: mapToArr(state.products.products),
    categories: mapToArr(state.categories.entries),
    subcategories: mapToArr(state.categories.subcategories),
    filters: state.products.filters
}), {getAllClientProductsWithStocks, getCategoriesAndSubcategories})(ProductsPage);