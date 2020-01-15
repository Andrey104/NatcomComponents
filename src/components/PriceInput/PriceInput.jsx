import React, {Component} from 'react';
import {Debounce} from 'react-throttle';
import {numberMask} from "../../services/utils";

export default class PriceInput extends Component {

    handleChange = (event, index, state) => {
        var value = (event.target.value);
        value.replace(',', '.');
        index--;
        this.props.handleChangeItemParam(value, index, state);
    };

    render() {
        return (
            <Debounce time="500"
                      handler="onChange">
                <input type="text"
                       pattern={numberMask}
                       className="form-control"
                       defaultValue={this.props.value}
                       onChange={e => this.handleChange(e, this.props.number, this.props.state)}
                       placeholder={this.props.placeholder}/>
            </Debounce>
        )
    }
}