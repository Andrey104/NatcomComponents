import React, {Component} from 'react';
import Switch from 'react-router-dom/es/Switch';
import Route from 'react-router-dom/es/Route';
import NavLink from 'react-router-dom/es/NavLink';
import {connect} from 'react-redux';

import ComponentMenu from '../../../components/ComponentMenu/ComponentMenu';
import SuppliersMainPage from './SuppliersMainPage/SuppliersMainPage';
import SupplierInfoPage from './SupplierInfoPage/SupplierInfoPage';
import EditSupplier from './EditSupplier/EditSupplier';
import AddNewSupplier from './AddNewSupplier/AddNewSupplier';

import {deleteSuppliersFromStore} from '../store/actions/suppliers';

class SuppliersRouter extends Component {

    getMenu() {
        let menu = (
            <NavLink className="page-title" to='/suppliers'>
                <span>Поставщики</span>
            </NavLink>
        );
        const urlId = this.props.match.params.supplierId;
        const {supplier} = this.props;
        if (this.props.match.url.indexOf('add_supplier') !== -1) {
            menu = <ComponentMenu menu={menu} name={'Новый поставщик'}/>;
        }
        else if (urlId && supplier) {
            if (Number(urlId) === supplier.id) {
                menu = <ComponentMenu menu={menu} name={this.props.supplier.name}/>;
            }
        }
        return menu;
    };

    render() {
        return (
            <div>
                <div className="breadcrumbs">
                    {this.getMenu()}
                </div>
                <Switch>
                    <Route exact path='/suppliers' component={SuppliersMainPage}/>
                    <Route exact path='/suppliers/add_supplier' component={AddNewSupplier}/>
                    <Route exact path='/suppliers/:supplierId(\d+)' component={SupplierInfoPage}/>
                    <Route exact path='/suppliers/:supplierId(\d+)/edit' component={EditSupplier}/>
                </Switch>
            </div>
        )
    }
    componentWillUnmount = () => this.props.deleteSuppliersFromStore();
}

export default connect((state) => ({
    supplier: state.suppliers.supplier
}), {deleteSuppliersFromStore})(SuppliersRouter);