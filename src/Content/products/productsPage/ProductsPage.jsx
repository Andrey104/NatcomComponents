import React from 'react';
import {connect} from 'react-redux';

import ProductsList from './productsList/ProductsList';
import ProductsFilters from '../../../components/productsFilters/ProductsFilters';
import {getAllProducts} from '../../../AC/products';
import {getAllCategories} from '../../../AC/categories';
import {mapToArr} from '../../../helpers';

class ProductsPage extends React.Component {

    componentWillMount = () => this.props.getAllCategories();

    getFilterParams = params => this.props.getAllProducts(params);

    render() {
        const {categories, subcategories} = this.props;
        return (
            <div>
                <div className="row">
                    <div className="col-12">
                        <ProductsFilters categories={categories}
                                         subcategories={subcategories}
                                         getFilterParams={this.getFilterParams}
                                         action={this.props.getAllProducts}/>
                    </div>
                </div>
                <ProductsList/>
            </div>
        )
    }
}

export default connect((state) => ({
    categories: mapToArr(state.categories.entries),
    subcategories: mapToArr(state.categories.subcategories),
    isLoading: state.categories.isLoading
}), {getAllProducts, getAllCategories})(ProductsPage)