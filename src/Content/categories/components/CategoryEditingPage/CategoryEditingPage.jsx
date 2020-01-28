import React, {Component} from 'react';
import DialogWindow from '../../../../components/ModalWindow';

class CategoryEditingPage extends Component {
    btnText = 'Добавить';

    constructor(props) {
        super(props);
        const {categoryName} = this.props;
        let name = '';
        if (categoryName) {
            name = categoryName;
            this.btnText = 'Изменить';
        }
        this.state = {name};
    };

    handleChangeState = event => this.setState({name: event.target.value});

    handleSubmit = event => {
        event.preventDefault();
        this.props.handleSubmit(this.state);
    };

    getDisabledState = () => !this.state.name;

    render() {
        return (
            <div>
                <div className="modal-body">
                    <div className="form-group">
                        <label htmlFor="first_name"
                               className="required-area">Название</label>
                        <input type="text"
                               placeholder="Введите название категории"
                               value={this.state.name}
                               onChange={this.handleChangeState}
                               className="form-control"
                               id="first_name"/>
                    </div>
                    <div className="modal-footer">
                        <button type="button"
                                onClick={this.props.close}
                                className="btn btn-secondary">Закрыть
                        </button>
                        <button type="submit"
                                onClick={this.handleSubmit}
                                disabled={this.getDisabledState()}
                                className="btn btn-primary">{this.btnText}
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default DialogWindow(CategoryEditingPage);