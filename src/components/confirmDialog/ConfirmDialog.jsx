import React from 'react';

import DialogWindow from '../ModalWindow';

class ConfirmDialog extends React.Component {

    handleSubmit = event => {
        event.preventDefault();
        this.props.handleSubmit();
    };

    render() {
        const {confirmText} = this.props;
        return (
            <div>
                <div className="modal-body text-left">{confirmText}</div>
                <div className="modal-footer">
                    <button type="button"
                            onClick={this.props.close}
                            className="btn btn-secondary">Нет
                    </button>
                    <button type="submit"
                            onClick={this.handleSubmit}
                            className="btn btn-primary">Да
                    </button>
                </div>
            </div>
        )
    }
}

export default DialogWindow(ConfirmDialog);