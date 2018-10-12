import React from 'react';

import SearchInput from '../SearchInput';
import DatePickerInput from '../datePickers/DatePickerInput';
import {getDateForServer} from '../../services/utils';

export default class extends React.Component {
    searchText;
    date;

    searchSupplies = text => {
        this.searchText = text;
        this.getFilterParams();
    };

    selectDate = date => {
        this.date = date ? date : null;
        this.getFilterParams();
    };

    getFilterParams = () => {
        let url = '';
        if (this.searchText) url += `text=${this.searchText}&`;
        if (this.date) url += `date=${getDateForServer(this.date)}&`;
        if (url) {
            url = '?' + url.slice(0, url.length - 1);
        }
        this.props.getFilterParams(url);
    };

    render() {
        return (
            <div className="row align-items-center">
                <div className="col-6">
                    <SearchInput search={this.searchSupplies}/>
                </div>
                <div className="col-6">
                    <DatePickerInput selectDate={this.selectDate}/>
                </div>
            </div>
        )
    }
}