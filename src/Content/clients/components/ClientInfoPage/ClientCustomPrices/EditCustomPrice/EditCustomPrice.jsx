import React from 'react';

import DialogWindow from '../../../../../../components/ModalWindow';

class EditCustomPrice extends React.Component {

    constructor(props) {
        super(props);
        const {editItem} = this.props;
        this.state = {
            price: Number(editItem.price)
        };
    }

    handleChangePrice = event => {
        this.setState({price: Number(event.target.value)});
    };

    handleSubmit = event => {
        event.preventDefault();
        this.props.handleSubmit(this.state);
    };

    checkForm = () => !this.state.price;

    render() {
        return (
            <div>
                <div className="modal-body">
                    <div className="form-group">
                        <label htmlFor="sum">Цена</label>
                        <input type="text"
                               placeholder="Введите цену"
                               value={this.state.price}
                               onChange={this.handleChangePrice}
                               className="form-control"
                               id="sum"/>
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button"
                            onClick={this.props.close}
                            className="btn btn-secondary">Закрыть
                    </button>
                    <button type="submit"
                            onClick={this.handleSubmit}
                            disabled={this.checkForm()}
                            className="btn btn-primary">Изменить
                    </button>
                </div>
            </div>
        )
    }
}

export default DialogWindow(EditCustomPrice);