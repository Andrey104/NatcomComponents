import React from 'react';
import Switch from 'react-router-dom/es/Switch';
import Route from 'react-router-dom/es/Route';
import NavLink from 'react-router-dom/es/NavLink';
import {connect} from 'react-redux';

import ComponentMenu from '../../components/ComponentMenu/ComponentMenu';
import PaymentsPage from './paymentsPage/PaymentsPage';
import AddNewPayment from './addNewPayment/AddNewPayment';

class PaymentsRouter extends React.Component {

    getMenu() {
        let menu = (
            <NavLink className="page-title" to='/payments'>
                <span>Оплаты</span>
            </NavLink>
        );
        if (this.props.match.url.indexOf('add_payment') !== -1) {
            menu = (
                <ComponentMenu menu={menu} name={'Новая оплата'}/>
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
                    <Route exact path='/payments' component={PaymentsPage}/>
                    <Route exact path='/payments/add_payment' component={AddNewPayment}/>
                </Switch>
            </div>
        )
    }

}

export default connect((state) => ({
    payment: state.payments.payment,
}))(PaymentsRouter);