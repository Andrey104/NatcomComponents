import React from 'react';
import Switch from 'react-router-dom/es/Switch';
import Route from 'react-router-dom/es/Route';
import NavLink from 'react-router-dom/es/NavLink';
import {connect} from 'react-redux';

import ComponentMenu from '../../components/ComponentMenu';
import MembranesPage from './membranesPage/MembranesPage';
import AddNewMembrane from './addNewMembrane/AddNewMembrane';
import MembraneDetail from './membraneDetail/MembraneDetail';
import {deleteMembranesFromStore} from '../../AC/membranes';
import './styles.css';
import ItemHistory from "../items/itemHistory/ItemHistory";
import ProductDetail from "../products/productDetail/ProductDetail";
import EditProduct from "../products/editProduct/EditProduct";

class MembranesRouter extends React.Component {

    getMenu() {
        let menu = (
            <NavLink className="page-title" to='/membranes'>
                <span>Полотна</span>
            </NavLink>
        );
        const urlId = this.props.match.params.membraneId;
        const {membrane} = this.props;
        if (this.props.match.url.indexOf('add_membrane') !== -1) {
            menu = (
                <ComponentMenu menu={menu} name={'Новое полотно'}/>
            );
        }
        if (Number(urlId) === membrane.id) {
            const name = membrane.name;
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
                <div className="membranes-menu">
                    {menu}
                </div>
                <Switch>
                    <Route exact path='/membranes' component={MembranesPage}/>
                    <Route exact path='/membranes/add' component={AddNewMembrane}/>
                    <Route exact path='/membranes/:membraneId' component={ProductDetail}/>
                    <Route exact path='/membranes/:membraneId/edit' component={EditProduct}/>
                    <Route exact path='/membranes/history/:itemId' component={ItemHistory}/>
                </Switch>
            </div>
        )
    }

    componentWillUnmount = () => this.props.deleteMembranesFromStore();
}

export default connect((state) => ({
    membrane: state.membranes.membrane,
}), {deleteMembranesFromStore})(MembranesRouter);