import React from 'react';
import 'moment/locale/ru';
import 'react-day-picker/lib/style.css';

export default class extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dateValue: ''
        }
    }

    dateChangeHandler = event => {
        event.preventDefault();
        this.setState({
            dateValue: event.target.value
        });
        this.props.setValue(event.target.value);
    };

    render() {
        return (
            <div>
                <input type='date'
                       value={this.props.value || this.state.dateValue}
                       onChange={this.dateChangeHandler}
                       className='form-control'/>
            </div>
        );
    }
}
