import React from 'react';
import {connect} from 'react-redux';
import {getSum} from "../../../AC/statistics";
import DatePickerInput from '../../../components/datePickers/DatePickerInput';
import {getDate, getDateForServer, priceFormat} from "../../../services/utils";

class Statistics extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            date: (Date())
        }
    }

    getStatisticsSum = () => {
        this.props.getSum(getDateForServer(this.state.date))
    };

    addDate = date => this.setState({date});

    render() {

        return (
            <div className="container">
                <h3>Статистика (Beta)</h3>
                <br/>
                <div className="card">
                    <div className="row">
                        <div className="col-12">
                            <DatePickerInput selectDate={this.addDate}
                                             defaultDate={this.state.date}/>
                        </div>
                        <div className="col-12">
                            Сумма: {priceFormat(this.props.sum)}
                        </div>
                        <div className="col-12">
                            <button className="btn-sm btn-primary"
                                    onClick={this.getStatisticsSum}>
                                Запросить
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect((state) => ({
    sum: state.statistics.sum,
}), {getSum})(Statistics);