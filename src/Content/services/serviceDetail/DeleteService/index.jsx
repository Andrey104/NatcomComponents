import React from 'react';

import DialogWindow from '../../../../components/DialogWindow';
import {BaseApi} from '../../../../services/base';

class DeleteService extends React.Component {
    render() {
        return (
            <div>
                <div className="modal-body">
                    Вы действительно хотите удалить данную услугу?
                </div>
                <div className="modal-footer">
                    <button type="button"
                            onClick={this.props.close}
                            className="btn btn-secondary">Отмена
                    </button>
                    <button type="submit"
                            onClick={this.handleSubmit}
                            className="btn btn-primary">Удалить
                    </button>
                </div>
            </div>
        )
    }

    handleSubmit = event => {
        event.preventDefault();
        this.deleteService();
    };

    deleteService() {
        const {service} = this.props;
        const baseApi = new BaseApi();
        baseApi
            .deleteRequest(`services/${service.id}/`)
            .then(() => this.props.successDeleteService())
            .catch(err => alert(err));
    }
}

export default DialogWindow(DeleteService);