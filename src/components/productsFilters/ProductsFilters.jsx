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
        this.getFilterProducts();
    };

    selectCategory = categoryId => {
        if (Number(categoryId) === -1) {
            this.props.removeSubcategoriesFromStorage();
            this.category = null;
            this.subcategory = null;
            this.getFilterProducts();
        } else {
            this.category = categoryId;
            this.subcategory = null;
            const url = this.getUrl();
            this.props.getFilterByCategories(categoryId, url, this.props.action);
        }
    };

    selectSubcategory = subcategoryId => {
        this.subcategory = subcategoryId;
        this.getFilterProducts();
    };

    getFilterProducts = () => {
        const url = this.getUrl();
        this.props.getFilterParams(url);
    };

    getUrl = () => {
        let url = '';
        if (this.searchText) url += `text=${this.searchText}&`;
        if (this.category) url += `category=${this.category}&`;
        if (this.subcategory) url += `subcategory=${this.subcategory}&`;
        if (this.props.client) url += `client=${this.props.client.id}&`;
        if (url) {
            url = '?' + url.slice(0, url.length - 1);
        }
        return url;
    };

    render() {
        const {categories, subcategories} = this.props;
        if (!categories.length) return null;
        return (
            <div className="row align-items-center">
                <div className="col-6">
                    <SearchInput search={this.searchProducts}
                                 defaultValue={this.searchText}/>
                </div>
                <div className="col-6">
                    <SelectCategories categories={categories}
                                      subcategories={subcategories}
                                      defaultCategory={this.category}
                                      defaultSubcategory={this.subcategory}
                                      selectCategory={this.selectCategory}
                                      selectSubcategory={this.selectSubcategory}
                                      notSelected={true}/>
                </div>
            </div>
        )
    }

    componentWillUnmount() {
        const filters = {
            searchText: this.searchText,
            category: this.category,
            subcategory: this.subcategory
        };
        this.props.saveProductsFilters(filters);
    }
}

export default connect(state => ({
    filters: state.products.filters
}), {
    getSubcategories,
    removeSubcategoriesFromStorage,
    getFilterByCategories,
    saveProductsFilters
})(ProductsFilters);