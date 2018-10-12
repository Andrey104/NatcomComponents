import React from 'react';
import Switch from 'react-router-dom/es/Switch';
import Route from 'react-router-dom/es/Route';
import NavLink from 'react-router-dom/es/NavLink';
import {connect} from 'react-redux';

import ComponentMenu from '../../components/ComponentMenu';
import CategoriesList from './categoriesList/CategoriesList';
import CategoryDetail from './categoryDetail/CategoryDetail';
import '../styles.css';

class CategoriesPage extends React.Component {

    getMenu() {
        let menu = (
            <NavLink to='/categories'>
                <span>Категории</span>
            </NavLink>
        );
        const urlId = this.props.match.params.categoryId;
        const {category} = this.props;
        if (Number(urlId) === category.id) {
            const name = category.name;
            menu = (
                <ComponentMenu menu={menu} name={name}/>
            );
        }
        return menu;
    }

    render() {
        const menu = this.getMenu();
        return (
            <div>
                <div className="breadcrumbs">
                    {menu}
                </div>
                <Switch>
                    <Route exact path='/categories' component={CategoriesList}/>
                    <Route exact path='/categories/:categoryId' component={CategoryDetail}/>
                </Switch>
            </div>
        )
    }
}

export default connect((state) => ({
    category: state.categories.category,
}))(CategoriesPage);