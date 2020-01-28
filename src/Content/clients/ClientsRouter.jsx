import React from 'react';
import Switch from 'react-router-dom/es/Switch';
import Route from 'react-router-dom/es/Route';
import NavLink from 'react-router-dom/es/NavLink';
import {connect} from 'react-redux';

import ComponentMenu from '../../components/ComponentMenu/ComponentMenu';
import ClientsPage from './clientsPage/ClientsPage';
import ClientDetail from './clientDetail/ClientDetail';
import '../styles.css';

class ClientsRouter extends React.Component {

    getMenu() {
        let menu = (
            <NavLink className="page-title" to='/clients'>
                <span>Клиенты</span>
            </NavLink>
        );
        const urlId = this.props.match.params.clientId;
        const {client} = this.props;
        if (urlId && client !== undefined) {
            if (Number(urlId) === client.id) {
                const name = client.first_name + ' ' + client.last_name;
                menu = (
                    <ComponentMenu menu={menu} name={name}/>
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
                    <Route exact path='/clients' component={ClientsPage}/>
                    <Route exact path='/clients/:clientId' component={ClientDetail}/>
                </Switch>
            </div>
        )
    }
}

export default connect((state) => ({
    client: state.clients.client,
}))(ClientsRouter);