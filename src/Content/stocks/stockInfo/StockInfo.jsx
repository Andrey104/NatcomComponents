import React from 'react';

import DialogWindow from '../../../components/ModalWindow';

class StockInfo extends React.Component {
    btnText = 'Добавить';

    constructor(props) {
        super(props);
        const {stock} = props;
        if (stock) {
            this.state = {
                name: stock.name,
                address: stock.address
            };
            this.btnText = 'Сохранить';
        } else {
            this.state = {
                name: '',
                address: ''
            };
        }

    }

    handleChangeStock = event => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({[name]: value});
    };

    handleSubmit = event => {
        event.preventDefault();
        this.props.handleSubmit(this.state);
    };

    getCheck = () => (!this.state.address || !this.state.name);

    render() {
        return (
            <div>
                <div className="modal-body">
                    <div className="form-group">
                        <label htmlFor="name"
                               className="required-area">Название склада</label>
                        <textarea className="form-control text-field-dialog"
                                  name="name"
                                  value={this.state.name}
                                  onChange={this.handleChangeStock}
                                  id="name"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="address"
                               className="required-area">Адрес склада</label>
                        <textarea className="form-control text-field-dialog"
                                  name="address"
                                  value={this.state.address}
                                  onChange={this.handleChangeStock}
                                  id="address"/>
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button"
                            onClick={() => this.props.close()}
                            className="btn btn-secondary">Закрыть
                    </button>
                    <button type="submit"
                            onClick={this.handleSubmit}
                            disabled={this.getCheck()}
                            className="btn btn-primary">{this.btnText}
                    </button>
                </div>
            </div>
        )
    }
}

export default DialogWindow(StockInfo);