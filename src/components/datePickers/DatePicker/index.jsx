import React from 'react';
import DayPicker from 'react-day-picker/DayPicker';
import MomentLocaleUtils from 'react-day-picker/moment';
import 'react-day-picker/lib/style.css';
import 'moment/locale/ru';

export default class extends React.Component {
    selectedDay = undefined;
    constructor(props) {
        super(props);
        const {date} = this.props;
        this.selectedDay = new Date(date);
    }

    handleChangeDate = date => {
        this.selectedDay = date;
        this.props.selectDate(date);
    };

    render() {
        return (
            <DayPicker
                onDayClick={this.handleChangeDate}
                selectedDays={this.selectedDay}
                localeUtils={MomentLocaleUtils}
                locale={'ru'}/>
        );
    }
}