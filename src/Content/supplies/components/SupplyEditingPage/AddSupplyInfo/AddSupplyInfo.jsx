import React, {Component} from 'react';
import DatePickerInput from '../../../../../components/datePickers/DatePickerInput';
import CommentField from '../../../../../components/CommentField';

export default class extends Component {

    constructor(props) {
        super(props);
        const {supply} = this.props;
        this.draft = supply.draft;
        this.date = supply.date;
        this.comment = supply.comment;
    };

    handleChangeSupplyDraft = event => this.props.handleChangeSupply(event.target.checked, 'draft');

    addDate = date => this.props.handleChangeSupply(date, 'date');

    addComment = comment => {
        if (comment) this.props.handleChangeSupply(comment, 'comment');
        else this.props.handleChangeSupply(null, 'comment');
    };

    render() {
        return (
            <div className="row">
                <div className="col-lg-6">
                    <CommentField commentName={'поставке'}
                                  comment={this.comment}
                                  addComment={this.addComment}/>
                </div>
                <div className="col-lg-6">
                    <div className="form-group">
                        <label htmlFor="supply-date">Дата поставки</label>
                        <DatePickerInput className="form-control"
                                         value={this.date}
                                         setValue={this.addDate}
                                         id="supply-date"/>
                    </div>
                    <div className="form-group form-check">
                        <input type="checkbox"
                               className="form-check-input"
                               defaultChecked={this.draft}
                               onChange={this.handleChangeSupplyDraft}
                               id="draft"/>
                        <label className="form-check-label"
                               htmlFor="draft">Сохранить как черновик</label>
                    </div>
                </div>
            </div>
        )
    }
}