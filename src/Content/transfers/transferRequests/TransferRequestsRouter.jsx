import React from 'react';
import Switch from "react-router-dom/es/Switch";
import Route from "react-router-dom/es/Route";
import NavLink from "react-router-dom/es/NavLink";
import {connect} from "react-redux";

import ComponentMenu from '../../../components/ComponentMenu';
import TransferRequestsList from './transferRequestsList/TransferRequestList';
import TransferRequestDetail from './transferRequestDetail/TransferRequestDetail';
import '../../styles.css';

class TransferRequestsRouter extends React.Component {
    render() {
        return (
            <div>
                <div className='breadcrumbs'>
                    {this.getMenu()}
                </div>
                <Switch>
                    <Route exact path='/transfer_requests' component={TransferRequestsList}/>
                    <Route exact path='/transfer_requests/:transferRequestId' component={TransferRequestDetail}/>
                </Switch>
            </div>
        )
    }

    getMenu() {
        let menu = (
            <NavLink to='/transfer_requests'>
                <span>Запросы на перевозку</span>
            </NavLink>
        );

        const urlId = this.props.match.params.transferRequestId;
        const {transferRequest} = this.props;
        if (urlId && transferRequest) {
            if (Number(urlId) === transferRequest.id) {
                menu = <ComponentMenu menu={menu} name={`Запрос #${transferRequest.id}`}/>;
            }
        }
        return menu;
    }
}

export default connect((state) => ({
    transferRequest: state.transferRequests.transferRequest,
}))(TransferRequestsRouter);
