import React from 'react';
import Switch from 'react-router-dom/es/Switch';
import Route from 'react-router-dom/es/Route';
import NavLink from 'react-router-dom/es/NavLink';
import {connect} from 'react-redux';

import StocksList from './stocksList/StocksList';
import StockDetail from './stockDetail/StockDetail';
import ComponentMenu from '../../components/ComponentMenu/ComponentMenu'

class StocksPage extends React.Component {

    getMenu() {
        let menu = (
            <NavLink to='/stocks'>
                <span>Склады</span>
            </NavLink>);
        const urlId = this.props.match.params.stockId;
        const {stock} = this.props;
        if (urlId && stock !== null) {
            if (Number(urlId) === stock.id) {
                menu = (
                    <ComponentMenu menu={menu} name={this.props.stock.name}/>
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
                    <Route exact path='/stocks' component={StocksList}/>
                    <Route path='/stocks/:stockId' component={StockDetail}/>
                </Switch>
            </div>
        )
    }
}

export default connect((state) => ({
    stock: state.stocks.stock,
}))(StocksPage);