import React, {Component} from 'react';
import {Debounce} from 'react-throttle';

import SearchInput from '../SearchInput';
import DatePickerInput from '../datePickers/DatePickerInput';

export default class extends Component {
    searchText = undefined;
    date = undefined;

    filter = {
        text : undefined,
        date : undefined,
        supplierId : undefined
    };

    setSearchText = text => {
        this.searchText = text;
        this.setFilterParams();
    };

    setDate = date => {
        this.date = date;
        this.setFilterParams();
    };

    setFilterParams = () => {
        this.date ? this.filter.date = (this.date) : this.filter.date = null;
        this.searchText ? this.filter.text = this.searchText : this.filter.text = null;
        this.props.setFilter(this.filter)
    };

    render() {
        return (
            <Debounce time="500"
                      handler="onChange">
                <div className="row align-items-center">
                    <div className="col-6">
                        <SearchInput search={this.setSearchText}/>
                    </div>
                    <div className="col-6">
                        <DatePickerInput setValue={this.setDate}/>
                    </div>
                </div>
            </Debounce>
        )
    }
}

