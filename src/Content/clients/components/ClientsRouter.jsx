import React, {Component} from 'react';
import Switch from 'react-router-dom/es/Switch';
import Route from 'react-router-dom/es/Route';
import NavLink from 'react-router-dom/es/NavLink';
import {connect} from 'react-redux';

import ComponentMenu from '../../../components/ComponentMenu/ComponentMenu';
import ClientsMainPage from './ClientsMainPage/ClientsMainPage';
import ClientInfoPage from './ClientInfoPage/ClientInfoPage';
import AddNewClient from './AddNewClient/AddNewClient';
import EditClient from './EditClient/EditClient';
import {deleteClientsFromStore} from "../store/actions/clients";
import '../../styles.css';

class ClientsRouter extends Component {

    getMenu() {
        let menu = (
            <NavLink className="page-title" to='/clients'>
                <span>Клиенты</span>
            </NavLink>
        );
        const urlId = this.props.match.params.clientId;
        const {client} = this.props;
        if (this.props.match.url.indexOf('add_client') !== -1) {
            menu = <ComponentMenu menu={menu} name={'Новый клиент'}/>;
        }
        else if (urlId && client) {
            if (Number(urlId) === client.id) {
                const name = client.first_name + ' ' + client.last_name;
                menu = <ComponentMenu menu={menu} name={name}/>;
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
                    <Route exact path='/clients' component={ClientsMainPage}/>
                    <Route exact path='/clients/add_client' component={AddNewClient}/>
                    <Route exact path='/clients/:clientId(\d+)' component={ClientInfoPage}/>
                    <Route exact path='/clients/:clientId(\d+)/edit' component={EditClient}/>
                </Switch>
            </div>
        )
    };
    componentWillUnmount = () => this.props.deleteClientsFromStore();
}

export default connect(state => ({
    client: state.clients.client,
}), {deleteClientsFromStore})(ClientsRouter);