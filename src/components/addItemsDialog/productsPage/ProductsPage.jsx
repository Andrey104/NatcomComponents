import React from 'react';
import {connect} from 'react-redux';

import ProductsFilters from '../../productsFilters/ProductsFilters';
import ProductsList from './ProductsList';
import {getAllProducts} from '../../../Content/products/store/actions/products';
import {getCategoriesAndSubcategories} from '../../../Content/categories/store/actions/categories';
import {mapToArr} from '../../../helpers';

class ProductsPage extends React.Component {

    componentWillMount = () => {
        const {products} = this.props;
        if (!products.length) {
            this.props.getCategoriesAndSubcategories();
            this.props.getAllProducts();
        }
    };

    getFilterParams = params => this.props.getAllProducts(params);

    render() {
        const {categories, products, subcategories} = this.props;
        return (
            <div>
                <ProductsFilters categories={categories}
                                 subcategories={subcategories}
                                 getFilterParams={this.getFilterParams}
                                 action={this.props.getAllProducts}/>
                <ProductsList currentItems={this.props.currentItems}
                              products={products}
                              handleSelectItems={this.props.handleSelectItems}/>
            </div>
        )
    }
}

export default connect(state => ({
    products: mapToArr(state.products.products),
    categories: mapToArr(state.categories.entries),
    subcategories: mapToArr(state.categories.subcategories)
}), {getAllProducts, getCategoriesAndSubcategories})(ProductsPage);