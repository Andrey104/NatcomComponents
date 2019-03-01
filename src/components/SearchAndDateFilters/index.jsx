import React from 'react';

import SearchInput from '../SearchInput';
import DatePickerInput from '../datePickers/DatePickerInput';
import {getDateForServer} from '../../services/utils';

export default class extends React.Component {
    searchText;
    date;

    searchSupplies = text => {
        this.searchText = text;
        this.setFilterParams();
    };

    selectDate = date => {
        this.date = date ? date : null;
        this.setFilterParams();
    };

    setFilterParams = () => {
        this.props.setFilterParams(this.date, this.searchText);
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