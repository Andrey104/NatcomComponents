import React from 'react';
import Switch from 'react-router-dom/es/Switch';
import Route from 'react-router-dom/es/Route';
import NavLink from 'react-router-dom/es/NavLink';
import {connect} from 'react-redux';

import ComponentMenu from '../../components/ComponentMenu';
import UsersList from './usersList/UsersList';
import AddNewUser from './AddNewUser';
import UserDetail from './userDetail/UserDetail';
import EditUser from './editUser/EditUser';

class UsersPage extends React.Component {

    getMenu() {
        let menu = (
            <NavLink to='/users'>
                <span>Пользователи</span>
            </NavLink>
        );
        const urlId = this.props.match.params.userId;
        const {user} = this.props;
        const isEditUser = this.props.match.url.indexOf('edit') !== -1;
        if (this.props.match.url.indexOf('add_user') !== -1) {
            menu = (
                <ComponentMenu menu={menu} name={'Новый пользователь'}/>
            );
        }
        if (urlId && user !== undefined) {
            if (Number(urlId) === user.id) {
                const name = !isEditUser
                    ? <span>{user.username}</span>
                    : <NavLink to={`/users/${user.id}`}>{user.username}</NavLink>;
                menu = (
                    <ComponentMenu menu={menu} name={name}/>
                );
            }
        }
        if (isEditUser) {
            menu = (
                <ComponentMenu menu={menu} name='Редактирование'/>
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
                    <Route exact path='/users' component={UsersList}/>
                    <Route exact path='/users/add_user' component={AddNewUser}/>
                    <Route exact path='/users/:userId' component={UserDetail}/>
                    <Route exact path='/users/:userId/edit' component={EditUser}/>
                </Switch>
            </div>
        )
    }
}

export default connect((state) => ({
    user: state.users.user,
}))(UsersPage);