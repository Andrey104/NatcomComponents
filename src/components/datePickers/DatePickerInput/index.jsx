import React from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import MomentLocaleUtils, {formatDate, parseDate} from 'react-day-picker/moment';
import 'moment/locale/ru';
import 'react-day-picker/lib/style.css';

export default class extends React.Component {

    constructor(props) {
        super(props);
        const {defaultDate} = this.props;
        this.state = defaultDate ? {selectedDay: defaultDate} : {selectedDay: undefined};
    }

    clearDatePicker = () => {
        this.setState({selectedDay: undefined});
        this.props.selectDate(undefined);
    };

    handleDayChange = date => {
        this.setState({selectedDay: date});
        this.props.selectDate(date);
    };

    render() {
        return (
            <div>
                <DayPickerInput
                    value={this.state.selectedDay}
                    formatDate={formatDate}
                    parseDate={parseDate}
                    format="LL"
                    placeholder={`Нажмите для выбора`}
                    onDayChange={this.handleDayChange}
                    dayPickerProps={{
                        locale: 'ru',
                        localeUtils: MomentLocaleUtils,
                    }}/>
                <button type="button"
                        className="btn-sm btn-primary"
                        onClick={this.clearDatePicker}>Сброс
                </button>
            </div>
        );
    }
}
