import React from 'react';
import {connect} from 'react-redux';

import SearchInput from '../SearchInput';
import SelectCategories from '../SelectCategories';
import {saveProductsFilters} from '../../Content/products/store/actions/products';
import {
    getCategoriesAndSubcategories,
    getFilterByCategories,
    getSubcategories,
    removeSubcategoriesFromStorage

} from '../../Content/categories/store/actions/categories';
import {
    getAllProducts

} from '../../Content/products/store/actions/products';
import {mapToArr} from "../../helpers";

class ProductsFilters extends React.Component {
    searchText = '';
    category;
    subcategory;

    constructor(props) {
        super(props);
        const {filters} = this.props;
        if (filters) {
            this.searchText = filters.searchText;
            this.category = filters.category;
            this.subcategory = filters.subcategory;
        }
    }

    componentDidMount() {
        this.props.getCategoriesAndSubcategories();
    }

    searchProducts = text => {
        this.searchText = text;
        this.updateFilters()
    };

    selectCategory = categoryId => {
        if (Number(categoryId) === -1) {
            this.props.removeSubcategoriesFromStorage();
            this.category = null;
            this.subcategory = null;
            this.updateFilters()
        } else {
            this.category = categoryId;
            this.subcategory = null;
            this.props.getSubcategories(categoryId);
            this.updateFilters();
        }
    };

    selectSubcategory = subcategoryId => {
        this.subcategory = subcategoryId;
        this.updateFilters();
    };

    render() {
        const {categories, subcategories} = this.props;
        if (!categories.length) return null;
        return (
            <div>
                <div className="row">
                    <div className="col">
                        <SearchInput search={this.searchProducts}
                                     defaultValue={this.searchText}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <SelectCategories categories={categories}
                                          subcategories={subcategories}
                                          defaultCategory={this.category}
                                          defaultSubcategory={this.subcategory}
                                          selectCategory={this.selectCategory}
                                          selectSubcategory={this.selectSubcategory}
                                          notSelected={true}/>
                    </div>
                </div>
            </div>
        )
    }

    updateFilters() {
        const filters = {
            searchText: this.searchText,
            category: this.category,
            subcategory: this.subcategory
        };
        if (filters.subcategory === '-1') {
            filters.subcategory = null;
        }
        this.props.getAllProducts(filters, this.props.storeClient);
        this.props.saveProductsFilters(filters);
    }
}

export default connect(state => ({
    filters: state.products.filters,
    storeClient: state.products.client,
    categories: mapToArr(state.categories.entries),
    subcategories: mapToArr(state.categories.subcategories)
}), {
    getSubcategories,
    removeSubcategoriesFromStorage,
    getFilterByCategories,
    saveProductsFilters,
    getAllProducts,
    getCategoriesAndSubcategories
})(ProductsFilters);