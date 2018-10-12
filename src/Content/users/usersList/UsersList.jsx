import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import {connect} from 'react-redux';

import Loader from '../../../components/Loader';
import AddButton from '../../../components/AddButton';
import UserCard from './UserCard';
import {getAllUsers, getNextUsers} from '../../../AC/users';
import {mapToArr} from '../../../helpers';

class UsersList extends React.Component {

    componentWillMount = () => this.props.getAllUsers();

    loadUsers = page => this.props.getNextUsers(page);

    addNewUser = () => this.props.history.push('/users/add_user');

    getBody(users) {
        let userList;
        if (users.length !== 0) {
            userList = users.map((user, index) => {
                return (
                    <UserCard key={user.id}
                              user={user}
                              number={++index}/>
                )
            })
        } else {
            userList = (
                <tr>
                    <td colSpan='5'>Нет пользователей</td>
                </tr>
            )
        }
        return userList;
    }

    render() {
        const {isLoading, users, hasMoreUsers} = this.props;
        if (isLoading && users.length === 0) {
            return (
                <div className="pre-loader-container">
                    <Loader/>
                </div>
            );
        }
        const loader = hasMoreUsers ? <Loader/> : false;
        this.getBody(users);
        return (
            <div className="row">
                <div className="col-12">
                    <InfiniteScroll
                        pageStart={1}
                        loadMore={this.loadUsers}
                        hasMore={hasMoreUsers}
                        useWindow={false}>
                        <div className="row">
                            <div className="col-12">
                                <table className="table table-hover table-bordered">
                                    <thead className="thead-light">
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Логин</th>
                                        <th scope="col">ФИО</th>
                                        <th scope="col">Роль</th>
                                        <th scope="col">Склад</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {this.getBody(users)}
                                    {loader}
                                    </tbody>
                                </table>
                                <AddButton openAdd={this.addNewUser}/>
                            </div>
                        </div>
                    </InfiniteScroll>
                </div>
            </div>
        )
    }
}

export default connect((state) => ({
    users: mapToArr(state.users.users),
    isLoading: state.users.isLoading,
    hasMoreUsers: state.users.hasMoreUsers
}), {getAllUsers, getNextUsers})(UsersList);