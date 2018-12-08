import React from 'react';

import UserInfo from '../userInfo/UserInfo';
import {BaseApi} from '../../../services/base';
import history from '../../../history';


export default class extends React.Component {

    handleSubmit = (user) => {
        const baseApi = new BaseApi();
        baseApi
            .post(`users/default/`, user)
            .then(res => {
                history.replace(`/users/${res.data.id}`);
            })
    };

    render() {
        return (
            <UserInfo handleSubmit={this.handleSubmit}/>
        )
    }
}