import React from 'react';
import {UsersService} from "../../services/users.service";

class UserInfo extends React.Component {

    render() {
        return(
            <div className='menu-user-info'>
                <div className="row">
                    <div className="col-4">
                        <img alt='user-icon' src='/public/user-icon.png'/>
                    </div>
                    <div className='col-8'>
                        <div className="row">
                            {UsersService.getUserFirstName()}
                        </div>
                        <div className="row">
                            {UsersService.getUserType()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UserInfo;