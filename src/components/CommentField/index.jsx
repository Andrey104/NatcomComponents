import React from 'react';

export default class extends React.Component {
    constructor(props) {
        super(props);
        const {comment} = this.props;
        this.state = {
            comment
        };
    }

    handleChangeComment = event => {
        this.setState({comment: event.target.value}, () => {
            this.props.addComment(this.state.comment);
        });
    };

    render() {
        const {commentName} = this.props;
        return (
            <div className="form-group">
                <label htmlFor="comment">Комментарий к {commentName}</label>
                <textarea className="form-control"
                          id="comment"
                          defaultValue={this.state.comment}
                          onChange={this.handleChangeComment}/>
            </div>
        )
    }
}