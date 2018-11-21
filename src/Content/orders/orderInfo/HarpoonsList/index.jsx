import React from 'react';

import TableResultRow from '../../../../components/TableResultRow/index';
import HarpoonName from '../../../../components/HarpoonName/index';
import {moneyFormat} from '../../../../services/utils';

export default class extends React.Component {

    getHarpoons(harpoons) {
        return harpoons.map((harpoon, index) => (
                <tr key={harpoon.id}>
                    <th scope="row">{index + 1}</th>
                    <HarpoonName harpoon={harpoon}/>
                    <td>{moneyFormat(harpoon.resultHarpoonPrice)}</td>
                    <td>
                        <button type="button"
                                onClick={() => this.props.editHarpoon(harpoon)}
                                className="btn btn-dark btn-sm">Редактировать
                        </button>
                        <button type="button"
                                onClick={() => this.props.removeHarpoonFromList(harpoon)}
                                className="btn btn-danger btn-sm">Удалить
                        </button>
                    </td>
                </tr>
            )
        )
    }

    render() {
        const {harpoons} = this.props;
        let tableBody;
        if (harpoons.length === 0) {
            tableBody = (
                <tbody>
                <tr>
                    <td colSpan='3'>Гарпуны не добавлены</td>
                </tr>
                </tbody>
            )
        } else {
            tableBody = (
                <tbody>
                {this.getHarpoons(harpoons)}
                <TableResultRow columnCount={5}
                                resultPrice={this.props.harpoonsResultPrice}/>
                </tbody>
            )
        }
        return (
            <div className="col-12">
                <table className="table table-bordered">
                    <thead className="thead-light">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Название</th>
                        <th scope="col">Цена</th>
                    </tr>
                    </thead>
                    {tableBody}
                </table>
            </div>
        )
    }
}