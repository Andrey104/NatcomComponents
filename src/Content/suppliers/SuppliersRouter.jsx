import React, {Component} from 'react';
import Switch from 'react-router-dom/es/Switch';
import Route from 'react-router-dom/es/Route';
import NavLink from 'react-router-dom/es/NavLink';
import {connect} from 'react-redux';

import ComponentMenu from './../../components/ComponentMenu';
import SuppliersMainPage from './SuppliersMainPage/SuppliersMainPage';
import SupplierInfoPage from './SupplierInfoPage/SupplierInfoPage';

import {deleteSuppliersFromStore} from '../../AC/suppliers';

class SuppliersRouter extends Component {

    getMenu() {
        let menu = (
            <NavLink className="page-title" to='/suppliers'>
                <span>Поставщики</span>
            </NavLink>
        );
        const urlId = this.props.match.params.supplierId;
        const {supplier} = this.props;
        if (urlId && supplier !== null) {
            if (Number(urlId) === supplier.id) {
                menu = <ComponentMenu menu={menu} name={this.props.supplier.name}/>;
            }
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
                    <Route exact path='/suppliers' component={SuppliersMainPage}/>
                    <Route path='/suppliers/:supplierId' component={SupplierInfoPage}/>
                </Switch>
            </div>
        )
    }
    componentWillUnmount = () => this.props.deleteSuppliersFromStore();
}

export default connect((state) => ({
    supplier: state.suppliers.supplier,
}), {deleteSuppliersFromStore})(SuppliersRouter);