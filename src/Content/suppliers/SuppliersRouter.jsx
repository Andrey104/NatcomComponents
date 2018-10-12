import React from 'react';
import Switch from 'react-router-dom/es/Switch';
import Route from 'react-router-dom/es/Route';
import NavLink from 'react-router-dom/es/NavLink';
import {connect} from 'react-redux';

import ComponentMenu from './../../components/ComponentMenu';
import SuppliersPage from './suppliersPage/SuppliersPage';
import SupplierDetail from './supplierDetail/SupplierDetail';

class SuppliersRouter extends React.Component {

    getMenu() {
        let menu = (
            <NavLink to='/suppliers'>
                <span>Поставщики</span>
            </NavLink>
        );
        const urlId = this.props.match.params.supplierId;
        const {supplier} = this.props;
        if (urlId && supplier !== null) {
            if (Number(urlId) === supplier.id) {
                menu = (
                    <ComponentMenu menu={menu} name={this.props.supplier.name}/>
                );
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
                    <Route exact path='/suppliers' component={SuppliersPage}/>
                    <Route path='/suppliers/:supplierId' component={SupplierDetail}/>
                </Switch>
            </div>
        )
    }
}

export default connect((state) => ({
    supplier: state.suppliers.supplier,
}))(SuppliersRouter);