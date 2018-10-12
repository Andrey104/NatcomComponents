import React from 'react';
import {Debounce} from 'react-throttle';

import './styles.css';

export default class extends React.Component {

    handleChangeInputText = event => this.props.search(event.target.value);

    render() {
        return (
            <Debounce time="500"
                      handler="onChange">
                <input type="search"
                       defaultValue={this.props.defaultValue}
                       onChange={this.handleChangeInputText}
                       className="form-control mr-sm-2 search-input"
                       placeholder="Поиск"/>
            </Debounce>
        )
    }
}