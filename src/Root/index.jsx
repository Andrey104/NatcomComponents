import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Switch from "react-router-dom/es/Switch";
import Route from "react-router-dom/es/Route";
import Redirect from "react-router-dom/es/Redirect";

import System from '../Main';
import Login from '../Content/Login';
import OrderPrintPage from '../OrderPrintPage';


const PrivateRoute = () => {
    let page;
    !localStorage.getItem('token')
        ? page = <Redirect to='/login'/>
        : page = <Route path='' component={System}/>;
    return page;
};

export default class extends React.Component {
    render() {
        return (
            <Switch>
                <Route path='/login' component={Login}/>
                <Route path='/print/:orderId' component={OrderPrintPage}/>
                <PrivateRoute path='' component={System}/>
            </Switch>
        )
    }
}
