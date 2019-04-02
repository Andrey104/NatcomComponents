import React from 'react';
import classNames from 'classnames/bind';

import DialogWindow from '../../../../components/ModalWindow';
import {BaseApi} from '../../../../services/base';
import styles from './styles.scss';

let cx = classNames.bind(styles);

class EditSupplier extends React.Component {
    editSupplier;

    constructor(props) {
        super(props);
        this.editSupplier = this.props.supplier;
        this.state = {
            supplierName: this.editSupplier.name,
            supplierAddress: this.editSupplier.address,
            supplierComment: this.editSupplier.comment
        }

    }

    handleChangeSupplierName = event => {
        this.setState({supplierName: event.target.value});
    };

    handleChangeSupplierAddress = event => {
        this.setState({supplierAddress: event.target.value});
    };

    handleChangeSupplierComment = event => {
        this.setState({supplierComment: event.target.value});
    };

    handleSubmit = event => {
        event.preventDefault();
        const baseApi = new BaseApi();
        const newSupplier = this.getFormValues();
        baseApi.put(`suppliers/${this.editSupplier.id}/`, newSupplier)
            .then(res => {
                this.props.successEditSupplier(res.data);
            }, err => {
                console.log(err);
            })

    };

    getFormValues() {
        let newSupplier = {
            name: this.state.supplierName,
            address: this.state.supplierAddress,
            comment: this.state.supplierComment
        };
        if (!newSupplier.address) {
            newSupplier.address = null;
        }
        if (!newSupplier.comment) {
            newSupplier.comment = null;
        }
        return newSupplier;
    }

    close = () => this.props.close();

    render() {
        return (
            <div>
                <div className="modal-body">
                    <div className="form-group">
                        <label>Название поставщика</label>
                        <input defaultValue={this.state.supplierName}
                               className={"form-control"}
                               onChange={this.handleChangeSupplierName}/>
                    </div>
                    <div className="form-group">
                        <label>Адрес</label>
                        <input defaultValue={this.state.supplierAddress}
                               className={"form-control"}
                               onChange={this.handleChangeSupplierAddress}/>
                    </div>
                    <div className="form-group">
                        <label>Комментарий</label>
                        <textarea defaultValue={this.state.supplierComment}
                                  className={cx('form-control', 'text-field-dialog')}
                                  onChange={this.handleChangeSupplierComment}/>
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button"
                            onClick={this.close}
                            className="btn btn-secondary">Закрыть
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

export default DialogWindow(EditSupplier);