import React from 'react';
import {connect} from 'react-redux';

import ChangePasswordDialog from './changePasswordDialog/ChangePassword';
import ConfirmDialog from '../../../../components/confirmDialog/ConfirmDialog'
import {changeUserPassword, blockUser} from '../../../../AC/users';
import {openModalWindow, closeModalWindow} from '../../../../AC/modal';
import {CHANGE_USER_PASSWORD, BLOCK_USER} from '../../../../constans';

class OpenModalsButtons extends React.Component {

    changePasswordSubmit = password => {
        const {user, changeUserPassword} = this.props;
        changeUserPassword(user.id, password);
    };

    blockUserSubmit = () => {
        const {user, blockUser} = this.props;
        blockUser(user.id);
    };

    closeDialog = () => this.props.closeModalWindow();

    getDialogWindow() {
        const {modal} = this.props;
        if (modal === CHANGE_USER_PASSWORD) {
            return (
                <ChangePasswordDialog header={'Смена пароля'}
                                      handleSubmit={this.changePasswordSubmit}
                                      close={this.closeDialog}/>
            );
        } else if (modal === BLOCK_USER) {
            return (
                <ConfirmDialog header={'Блокировка пользователя'}
                               confirmText={'Вы действительно хотите заблокировать данного пользователя?'}
                               handleSubmit={this.blockUserSubmit}
                               close={this.closeDialog}/>
            )
        }
    }

    render() {
        const dialogWindow = this.getDialogWindow();
        return (
            <span>
                {dialogWindow}
                <button type="button"
                        onClick={() => this.props.openModalWindow(CHANGE_USER_PASSWORD)}
                        className="btn btn-primary btn-sm detail-btn">Сменить пароль
                </button>
                <button type="button"
                        onClick={() => this.props.openModalWindow(BLOCK_USER)}
                        className="btn btn-danger btn-sm detail-btn">Заблокировать
                </button>
            </span>
        )
    }
}

export default connect(state => ({
    modal: state.modal.modal
}), {
    openModalWindow,
    closeModalWindow,
    changeUserPassword,
    blockUser
})(OpenModalsButtons);