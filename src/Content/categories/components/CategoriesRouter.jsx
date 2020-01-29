import React, {Component} from 'react';
import Switch from 'react-router-dom/es/Switch';
import Route from 'react-router-dom/es/Route';
import NavLink from 'react-router-dom/es/NavLink';
import {connect} from 'react-redux';
import {deleteCategoriesFromStore} from '../store/actions/categories';
import ComponentMenu from '../../../components/ComponentMenu/ComponentMenu';
import CategoriesList from './CategoriesList/CategoriesList';
import CategoryInfoPage from './CategoryInfoPage/CategoryInfoPage';

class CategoriesRouter extends Component {

    getMenu() {
        let menu = (
            <NavLink to='/categories' className="page-title">
                <span>Категории</span>
            </NavLink>
        );
        const urlId = this.props.match.params.categoryId;
        const {category} = this.props;
        if (Number(urlId) === category.id) menu = <ComponentMenu menu={menu} name={category.name}/>

        return menu;
    };

    render() {
        return (
            <div>
                <div className="breadcrumbs">
                    {this.getMenu()}
                </div>
                <Switch>
                    <Route exact path='/categories' component={CategoriesList}/>
                    <Route exact path='/categories/:categoryId(\d+)' component={CategoryInfoPage}/>
                </Switch>
            </div>
        )
    }
    componentWillUnmount = () => this.props.deleteCategoriesFromStore();
}

export default connect((state) => ({
    category: state.categories.category,
}), {deleteCategoriesFromStore})(CategoriesRouter);