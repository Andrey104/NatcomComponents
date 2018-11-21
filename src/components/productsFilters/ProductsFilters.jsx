import React from 'react';
import {connect} from 'react-redux';

import SearchInput from '../SearchInput';
import SelectCategories from '../SelectCategories';
import {saveProductsFilters} from '../../AC/products';
import {
    getFilterByCategories,
    getSubcategories,
    removeSubcategoriesFromStorage

} from '../../AC/categories';
import {
    getAllProducts

} from '../../AC/products';

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
        this.props.getAllProducts(filters, this.storeClient);

    }
}

export default connect(state => ({
    filters: state.products.filters,
    storeClient: state.products.client
}), {
    getSubcategories,
    removeSubcategoriesFromStorage,
    getFilterByCategories,
    saveProductsFilters,
    getAllProducts
})(ProductsFilters);