import React from 'react';

import UserInfo from '../userInfo/UserInfo';
import {BaseApi} from '../../../services/base';

export default class extends React.Component {

    handleSubmit = (user) => {
        const baseApi = new BaseApi();
        baseApi
            .post(`users/`, user)
            .then(res => console.log(res.data))
    };

    render() {
        return (
            <UserInfo handleSubmit={this.handleSubmit}/>
        )
    }
}