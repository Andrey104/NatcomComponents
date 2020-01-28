import React from 'react';
import {connect} from 'react-redux';

import ProductsList from '../../../../components/ItemList/ItemList';
import ProductsFilters from '../../../../components/productsFilters/ProductsFilters';
import {getAllProducts} from '../../store/actions/products';
import {getAllCategories} from '../../../categories/store/actions/categories';
import {mapToArr} from '../../../../helpers';

import styles from './styles.css';

class ProductsPage extends React.Component {

    componentWillMount = () => this.props.getAllCategories();

    render() {
        const {categories, subcategories} = this.props;
        return (
            <div>
                    <ProductsFilters categories={categories}
                                     subcategories={subcategories}
                                     action={this.props.getAllProducts}/>
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