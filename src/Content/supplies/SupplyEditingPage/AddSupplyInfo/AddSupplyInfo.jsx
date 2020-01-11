import React, {Component} from 'react';

import DatePicker from '../../../../components/datePickers/DatePicker/index';
import CommentField from '../../../../components/CommentField/index';

export default class extends Component {

    constructor(props) {
        super(props);
        const {supply} = this.props;
        this.draft = supply.draft;
        this.date = supply.date;
        this.comment = supply.comment;
    }

    handleChangeSupplyDraft = event => this.props.handleChangeSupply(event.target.checked, 'draft');

    addDate = date => this.props.handleChangeSupply(date, 'date');

    addComment = comment => {
        if (comment) this.props.handleChangeSupply(comment, 'comment');
        else this.props.handleChangeSupply(null, 'comment');
    };

    render() {
        return (
            <div className="row">
                <div className="col-6">
                    <div className="form-group form-check">
                        <input type="checkbox"
                               className="form-check-input"
                               defaultChecked={this.draft}
                               onChange={this.handleChangeSupplyDraft}
                               id="draft"/>
                        <label className="form-check-label"
                               htmlFor="draft">Сохранить как черновик</label>
                    </div>
                    <CommentField commentName={'поставке'}
                                  comment={this.comment}
                                  addComment={this.addComment}/>
                </div>
                <div className="col-6">
                    <DatePicker date={this.date}
                                selectDate={this.addDate}/>
                </div>
            </div>
        )
    }
}