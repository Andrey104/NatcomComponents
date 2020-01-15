import React, {Component} from 'react';
import Switch from 'react-router-dom/es/Switch';
import Route from 'react-router-dom/es/Route';
import NavLink from 'react-router-dom/es/NavLink';
import {connect} from 'react-redux';

import ComponentMenu from '../../components/ComponentMenu/index';
import SuppliesMainPage from './SuppliesMainPage/SuppliesMainPage';
import SupplyInfoPage from './SupplyInfoPage/SupplyInfoPage';
import EditSupply from './EditSupply/EditSupply';
import AddNewSupply from "./AddNewSupply/AddNewSupply";

import {deleteSuppliesFromStore} from "./store/actions/supplies";

class SuppliesRouter extends Component {

    getMenu() {
        let menu = (
            <NavLink className="page-title" to='/supplies'>
                <span>Поставки</span>
            </NavLink>
        );
        const urlId = this.props.match.params.supplyId;
        const {supply} = this.props;
        if (this.props.match.url.indexOf('add_supply') !== -1) {
            menu = (
                <ComponentMenu menu={menu} name={'Новая поставка'}/>
            );
        } else if (urlId && supply !== undefined) {
            if (Number(urlId) === supply.id) {
                menu = (
                    <ComponentMenu menu={menu} name={'Поставка №' + supply.id + ' на ' + supply.date}/>
                );
            }
        }
        return menu;
    }

    render() {
        return (
            <div>
                <div className="breadcrumbs">
                    {this.getMenu()}
                </div>
                <Switch>
                    <Route exact path='/supplies' component={SuppliesMainPage}/>
                    <Route exact path='/supplies/add_supply' component={AddNewSupply}/>
                    <Route exact path='/supplies/:supplyId(\d+)' component={SupplyInfoPage}/>
                    <Route exact path='/supplies/:supplyId(\d+)/edit' component={EditSupply}/>
                </Switch>
            </div>
        )
    }
    componentWillUnmount = () => this.props.deleteSuppliesFromStore();
}

export default connect((state) => ({
    supply: state.supplies.supply,
}), {deleteSuppliesFromStore})(SuppliesRouter);