import React, {Component} from 'react';
import {mapToObj} from "../../../../helpers";

import styles from './SupplierEditingPage.css';
import classNames from "classnames/bind";

let cx = classNames.bind(styles);

export default class SupplierEditingPage extends Component {
    btnText = 'Добавить';

    constructor(props) {
        super(props);
        const {supplier} = this.props;
        this.state = {
            name: null,
            address: null,
            comment: null
        };
        if (supplier) {
            this.state = mapToObj(supplier);
            this.btnText = 'Изменить'
        }
    };

    handleChangeState = event => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({[name]: value});
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const newSupplier = this.getFormValues();
        this.props.handleSubmit(newSupplier)
    };

    getFormValues() {
        let newSupplier = {
            name: this.state.name,
            address: this.state.address,
            comment: this.state.comment
        };
        if (!newSupplier.address) newSupplier.address = null;
        if (!newSupplier.comment) newSupplier.comment = null;

        return newSupplier;
    };

    getDisabledState = () => !this.state.name;

    render() {
        return (
            <div>
                <div className="form-group">
                    <label htmlFor="name"
                           className="required-area">Имя поставщика</label>
                    <input type="text"
                           name="name"
                           defaultValue={this.state.name}
                           onChange={this.handleChangeState}
                           className="form-control"
                           id="name"/>
                </div>
                <div className="form-group">
                    <label htmlFor="address">Адрес поставщика</label>
                    <input type="text"
                           name="address"
                           defaultValue={this.state.address}
                           onChange={this.handleChangeState}
                           className="form-control"
                           id="address"/>
                </div>
                <div className="form-group">
                    <label htmlFor="comment">Комментарий</label>
                    <textarea className={cx('form-control', 'text-field-dialog')}
                              name="comment"
                              defaultValue={this.state.comment}
                              onChange={this.handleChangeState}
                              id="comment"/>
                </div>
                <button type="submit"
                        onClick={this.handleSubmit}
                        disabled={this.getDisabledState()}
                        className="btn btn-primary">{this.btnText}
                </button>
            </div>
        )
    }
}