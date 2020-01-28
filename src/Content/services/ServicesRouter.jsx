import React from 'react';
import Switch from "react-router-dom/es/Switch";
import Route from "react-router-dom/es/Route";
import NavLink from "react-router-dom/es/NavLink";
import {connect} from "react-redux";

import ComponentMenu from '../../components/ComponentMenu/ComponentMenu';
import ServicesPage from './servicesPage/ServicesPage';
import ServiceDetail from './serviceDetail/ServiceDetail';
import '../styles.css';

class ServicesRouter extends React.Component {
    render() {
        return (
            <div>
                <div className='breadcrumbs'>
                    {this.getMenu()}
                </div>
                <Switch>
                    <Route exact path='/services' component={ServicesPage}/>
                    <Route exact path='/services/:serviceId' component={ServiceDetail}/>
                </Switch>
            </div>
        )
    }

    getMenu() {
        let menu = (
            <NavLink to='/services'>
                <span>Услуги</span>
            </NavLink>
        );

        const urlId = this.props.match.params.serviceId;
        const {service} = this.props;
        if (urlId && service) {
            if (Number(urlId) === service.id) {
                menu = <ComponentMenu menu={menu} name={service.name}/>;
            }
        }

        return menu;
    }
}

export default connect((state) => ({
    service: state.services.service,
}))(ServicesRouter);
