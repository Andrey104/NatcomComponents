import React from 'react';
import MiniModalWindow from '../../../../../components/MiniModalWindow/';

class EditFreePositionModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            customPositionName: ''
        };
    }

    handleChangeName = (event) => {
        this.setState({customPositionName: event.target.value})
    };

    handleSubmit = (event) => {
        event.preventDefault();
        if (this.state.customPositionName !== "") {
            this.props.createCustomPosition(this.state.customPositionName);
        }
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
                               value={this.state.customPositionName}
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
export default MiniModalWindow(EditFreePositionModal);