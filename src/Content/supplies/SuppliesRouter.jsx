import React from 'react';
import Switch from 'react-router-dom/es/Switch';
import Route from 'react-router-dom/es/Route';
import NavLink from 'react-router-dom/es/NavLink';
import {connect} from 'react-redux';

import ComponentMenu from '../../components/ComponentMenu/index';
import SuppliesPage from './suppliesPage/SuppliesPage';
import AddNewSupply from './addNewSupply/AddNewSupply';
import SupplyDetail from './supplyDetail/SupplyDetail';
import EditSupply from './editSupply/EditSupply';

class SuppliesRouter extends React.Component {

    getMenu() {
        let menu = (
            <NavLink to='/supplies'>
                <span>Поставки</span>
            </NavLink>
        );
        const urlId = this.props.match.params.supplyId;
        const {supply} = this.props;
        if (this.props.match.url.indexOf('add_supply') !== -1) {
            menu = (
                <ComponentMenu menu={menu} name={'Новая поставка'}/>
            );
        }
        if (Number(urlId) === supply.id) {
            const name = supply.document;
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
                    <Route exact path='/supplies' component={SuppliesPage}/>
                    <Route exact path='/supplies/add_supply' component={AddNewSupply}/>
                    <Route exact path='/supplies/:supplyId' component={SupplyDetail}/>
                    <Route exact path='/supplies/:supplyId/edit' component={EditSupply}/>
                </Switch>
            </div>
        )
    }
}

export default connect((state) => ({
    supply: state.supplies.supply,
}))(SuppliesRouter);