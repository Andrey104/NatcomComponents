import React from 'react';

import './styles.css';
import {UsersService} from "../../services/users.service";

export default class extends React.Component {
    render() {
        let buttonBlock = null;
            buttonBlock =
                <div className="add-button"
                     onClick={this.props.openAdd}>
                    <p className="plus">+</p>
                </div>
        return (
            <div>
                {buttonBlock}
            </div>
        )
    }
}