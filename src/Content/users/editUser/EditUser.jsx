import React from 'react';
import {connect} from 'react-redux';

import UserInfo from '../userInfo/UserInfo';
import {BaseApi} from '../../../services/base';

class EditUser extends React.Component {

    handleSubmit = newUser => {
        const baseApi = new BaseApi();
        const {user} = this.props;
        baseApi
            .put(`users/${user.id}/`, newUser)
            .then(() => this.props.history.push(`/users/${user.id}`));
    };

    render() {
        const {user} = this.props;
        if (user === undefined || user === null) {
            return null;
        }
        return (
            <UserInfo handleSubmit={this.handleSubmit}
                      user={user}/>
        )
    }
}

export default connect((state) => ({
    user: state.users.user
}))(EditUser);