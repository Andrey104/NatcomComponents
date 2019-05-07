import React from 'react';
import ModalWindow from '../../../../../components/ModalWindow/';

class EditFreePositionModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            freePositionName: ''
        };
    }

    handleChangeName = (event) => {
        this.setState({freePositionName: event.target.value})
    };

    handleSubmit = (event) => {
        event.preventDefault();
        if (this.state.freePositionName = "")
        this.props.createFreePosition(this.state.freePositionName);
    };

    render(){
        return(
            <div>
                <div className="modal-body">
                    <div className="form-group">
                        <label htmlFor="first_name">Название</label>
                        <input type="text"
                               name="first_name"
                               placeholder="Название"
                               value={this.state.freePositionName}
                               onChange={this.handleChangeName}
                               className="form-control"
                               id="first_name"/>
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button"
                            onClick={this.props.close}
                            className="btn btn-secondary">Закрыть
                    </button>
                    <button type="submit"
                            onClick={this.handleSubmit}
                            className="btn btn-primary">Сохранить
                    </button>
                </div>
            </div>
        )
    }
}
export default ModalWindow(EditFreePositionModal);