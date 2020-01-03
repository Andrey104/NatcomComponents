import React, {Component} from 'react';
import {Debounce} from 'react-throttle';

import SearchInput from '../SearchInput';
import DatePickerInput from '../datePickers/DatePickerInput';
import {getDateForServer} from '../../services/utils';

export default class extends Component {
    searchText = undefined;
    date = undefined;

    setSearchText = text => {
        this.searchText = text;
        this.setFilterParams();
    };

    setDate = date => {
        this.date = date ? date : null;
        this.setFilterParams();
    };

    setFilterParams = () => {
        let url = '';
        if (this.searchText) url += `text=${this.searchText}&`;
        if (this.date) url += `date=${getDateForServer(this.date)}&`;
        if (url) {
            url = '?' + url.slice(0, url.length - 1);
        }
        if (this.date) {
            this.props.setComponentsDate(getDateForServer(this.date));
        } else {
            this.props.setComponentsDate(null);
        }

        if (this.searchText) {
            this.props.setComponentFilter(this.searchText);
        } else {
            this.props.setComponentFilter(null);
        }
        this.props.getAllComponents(url);
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
                        <DatePickerInput selectDate={this.setDate}/>
                    </div>
                </div>
            </Debounce>
        )
    }
}

