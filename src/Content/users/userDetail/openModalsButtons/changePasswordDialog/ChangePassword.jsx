import React from 'react';

import DialogWindow from '../../../../../components/ModalWindow';

class ChangePasswordDialog extends React.Component {

    state = {
        newPassword: '',
        passwordConfirm: null
    };

    handleChangePassword = (event, state) => this.setState({[state]: event.target.value});

    handleSubmit = event => {
        event.preventDefault();
        const password = {new_password: this.state.newPassword};
        this.props.handleSubmit(password);
    };

    getClasses = () => {
        let classes = 'form-control';
        const {newPassword, passwordConfirm} = this.state;
        if (passwordConfirm !== null) {
            classes += passwordConfirm === newPassword && newPassword
                ? ' is-valid'
                : ' is-invalid';
        }
        return classes;
    };

    render() {
        return (
            <div className="text-left">
                <div className="modal-body">
                    <div className="form-group">
                        <label htmlFor="newPassword">Новый пароль</label>
                        <input type="password"
                               placeholder="Введите новый пароль"
                               onChange={e => this.handleChangePassword(e, 'newPassword')}
                               className={this.getClasses()}
                               id="newPassword"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="passwordConfirm">Подтверждение пароля</label>
                        <input type="password"
                               placeholder="Повторите пароль"
                               onChange={e => this.handleChangePassword(e, 'passwordConfirm')}
                               className={this.getClasses()}
                               id="passwordConfirm"/>
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button"
                            onClick={this.props.close}
                            className="btn btn-secondary">Отмена
                    </button>
                    <button type="submit"
                            onClick={this.handleSubmit}
                            className="btn btn-primary">Изменить
                    </button>
                </div>
            </div>
        )
    }
}

export default DialogWindow(ChangePasswordDialog);