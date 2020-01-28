import React, {Component} from 'react';

export default class extends Component {
    render() {
        const {menu, name} = this.props;
        return (
            <span>
                {menu}
                <span>></span>
                <span>{name}</span>
            </span>
        )
    }
}