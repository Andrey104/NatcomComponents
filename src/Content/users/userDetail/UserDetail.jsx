import React from 'react';
import {connect} from 'react-redux';

import Loader from '../../../components/Loader';
import OpenModalsWindow from './openModalsButtons/OpenModalsButtons';
import {getUser} from '../../../AC/users';
import {getUserStatus} from '../../../services/utils';
import {userTypes, getPhoneWithMask} from '../../../services/utils';

export class UserDetail extends React.Component {

    componentWillMount = () => {
        const urlId = this.props.match.params.userId;
        this.props.getUser(urlId);
    };

    openEditUser = () => {
        const urlId = this.props.match.params.userId;
        this.props.history.push(`/users/${urlId}/edit`);
    };

    render() {
        const {user, isLoading} = this.props;
        if (isLoading || !user) {
            return (
                <div className="pre-loader-container">
                    <Loader/>
                </div>
            );
        }
        return (
            <div>
                <div>Логин: {user.username}</div>
                <div>{user.first_name} {user.last_name}</div>
                <div>Роль: {userTypes[user.type]}</div>
                <div>{user.email}</div>
                <div>Телефон: {getPhoneWithMask(user.phone)}</div>
                <div>Телеграм: {getPhoneWithMask(user.telegram)}</div>
                <div>Статус {getUserStatus(user.blocked)}</div>
                <div className="text-right">
                    <button type="button"
                            onClick={this.openEditUser}
                            className="btn btn-success btn-sm detail-btn">Редактировать
                    </button>
                    <OpenModalsWindow user={user}/>
                </div>
            </div>
        )
    }
}

export default connect((state) => ({
    user: state.users.user,
    isLoading: state.users.isLoading
}), {getUser})(UserDetail);