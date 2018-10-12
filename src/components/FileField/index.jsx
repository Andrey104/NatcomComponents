import React from 'react';

import './styles.css';

export default class extends React.Component {
    render () {
        const {labelName} = this.props;
        return (
            <div className="custom-file col-12">
                <input type="file"
                       onChange={this.props.changeField}
                       className="custom-file-input"
                       id="customFile"/>
                <label className="custom-file-label"
                       htmlFor="customFile">Выберите {labelName}</label>
            </div>
        )
    }
}