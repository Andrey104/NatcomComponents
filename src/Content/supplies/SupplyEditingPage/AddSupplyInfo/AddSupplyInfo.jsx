import React from 'react';

import DatePicker from '../../../../components/datePickers/DatePicker/index';
import CommentField from '../../../../components/CommentField/index';

export default class extends React.Component {

    constructor(props) {
        super(props);
        const {supply} = this.props;
        this.document = supply.document;
        this.draft = supply.draft;
        this.date = supply.date;
        this.comment = supply.comment;
    }

    handleChangeSupply = event => {
        this.props.handleChangeSupply(event.target.value, 'document');
    };

    handleChangeSupplyDraft = event => {
        this.props.handleChangeSupply(event.target.checked, 'draft');
    };

    addDate = date => this.props.handleChangeSupply(date, 'date');

    addComment = comment => this.props.handleChangeSupply(comment, 'comment');

    render() {
        return (
            <div className="row">
                <div className="col-6">
                    {/*<div className="form-group">*/}
                        {/*<label htmlFor="document">Номер договора</label>*/}
                        {/*<input type="text"*/}
                               {/*placeholder="Введите номер договора"*/}
                               {/*defaultValue={this.document}*/}
                               {/*onChange={this.handleChangeSupply}*/}
                               {/*className="form-control"*/}
                               {/*id="document"/>*/}
                    {/*</div>*/}
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