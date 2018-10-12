import React from 'react';

export default class extends React.Component {

    getMembranes() {
        const {membranes} = this.props;
        if (membranes.length > 0) {
            return membranes.map(membrane => (
                <tr key={membrane.item}
                    onClick={this.props.handleSubmit(membrane)}>
                    <td>{membrane.name}</td>
                    <td>{membrane.vendor_code}</td>
                    <td>{membrane.width}</td>
                    <td>{membrane.price}</td>
                    <td>{this.props.getItemCount(membrane)}</td>
                </tr>
            ))
        }
    }

    render() {
        return (
            <table className="table table-bordered table-hover">
                <thead>
                <tr>
                    <th scope="col">Название</th>
                    <th scope="col">Артикул</th>
                    <th scope="col">Ширина</th>
                    <th scope="col">Цена</th>
                    <th scope="col">Количество</th>
                </tr>
                </thead>
                <tbody>
                {this.getMembranes()}
                </tbody>
            </table>
        )
    }
}