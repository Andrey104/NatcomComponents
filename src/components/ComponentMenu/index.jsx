import React from 'react'

export default class extends React.Component {
    render() {
        const {menu, name} = this.props;
        return (
            <span>
                {menu}
                <span> => </span>
                <span>{name}</span>
            </span>
        )
    }
}