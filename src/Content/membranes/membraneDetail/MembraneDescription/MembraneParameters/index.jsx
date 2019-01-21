import React from 'react';

import {countFormat, priceFormat} from '../../../../../services/utils';

export default class extends React.Component {
    render() {
        const {membrane} = this.props;
        return (
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">Цвет</th>
                    <th scope="col">Фактура</th>
                    <th scope="col">Ширина</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>{membrane.color.description}</td>
                    <td>{membrane.texture.description}</td>
                    <td>{priceFormat(membrane.width)}</td>
                </tr>
                </tbody>
            </table>
        )
    }
}