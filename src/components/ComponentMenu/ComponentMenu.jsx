import React, {Component} from 'react';

export default class extends Component {
    render() {
        const {menu, name} = this.props;
        return (
            <span className="component-menu">
                {menu}
                <span>></span>
                <span>{name}</span>
            </span>
        )
    }
}