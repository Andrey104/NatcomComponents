import React from 'react';
import {connect} from 'react-redux';
import {getProfit, getSum} from "../../../AC/statistics";
import DatePickerInput from '../../../components/datePickers/DatePickerInput';
import {getDateForServer, priceFormat} from "../../../services/utils";
import ComponentHeader from '../../../components/ComponentHeader'


class Statistics extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            date: (Date())
        }
    }

    componentWillMount() {
        this.getStatistics(this.state.date);
    }

    getStatistics(date) {
        this.props.getSum(getDateForServer(date));
        this.props.getProfit(getDateForServer(date));
    }

    addDate = date => {
        this.setState({date});
        this.getStatistics(date);
    };

    render() {

        return (
            <div className="container">
                <ComponentHeader
                    name={'Статистика'}/>
                <div className="row">
                    <div className="col-12">
                        <h5>Дата:</h5>
                        <DatePickerInput selectDate={this.addDate}
                                         defaultDate={this.state.date}/>
                    </div>
                </div>
                <br/>
                <div className="row">
                    <div className="col-mb-6">
                        <div className="card">
                            <h5 className="card-header">Заказы</h5>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-12">
                                        <p>Сумма: {priceFormat(this.props.sum)}</p>
                                        <p>Прибыль (упрощенный расчет): {priceFormat(this.props.profit)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect((state) => ({
    sum: state.statistics.sum,
    profit: state.statistics.profit,
}), {getSum, getProfit})(Statistics);