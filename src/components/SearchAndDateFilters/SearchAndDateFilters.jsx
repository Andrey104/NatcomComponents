import React, {Component} from 'react';
import {Debounce} from 'react-throttle';

import SearchInput from '../SearchInput';
import DatePickerInput from '../datePickers/DatePickerInput';

export default class extends Component {
    filter = {
        text : undefined,
        date : undefined,
        supplierId : undefined
    };

    setText = text => {
        this.filter.text = text;
        this.props.setFilter(this.filter);
    };

    setDate = date => {
        this.filter.date = date;
        this.props.setFilter(this.filter);
    };

    render() {
        return (
            <Debounce time="500"
                      handler="onChange">
                <div className="row align-items-center">
                    <div className="col-6">
                        <SearchInput search={this.setText}/>
                    </div>
                    <div className="col-6">
                        <DatePickerInput setValue={this.setDate}/>
                    </div>
                </div>
            </Debounce>
        )
    }
}

