import React from 'react';

import TableResultRow from '../../../../components/TableResultRow/index';
import PropTypes from 'prop-types';
import {countFormat, priceFormat} from '../../../../services/utils';

export default class extends React.Component {

    /* Free positions list component */

    static propTypes = {
        freePositions: PropTypes.object,
        editPosition: PropTypes.func,
        removePositionFromList: PropTypes.func,
        freePositionsResultPrice: PropTypes.string,
    };


    getFreePositions(freePositions) {
        return freePositions.map((position, index) => (
                <tr key={position.id}>
                    <th scope="row">{index + 1}</th>
                    <td>{position.name}</td>
                    <td>{countFormat(position.count)}</td>
                    <td>{priceFormat(position.price)}</td>
                    <td>
                        <button type="button"
                                onClick={() => this.props.editPosition(position)}
                                className="btn btn-dark btn-sm">Редактировать
                        </button>
                        <button type="button"
                                onClick={() => this.props.removePositionFromList(position)}
                                className="btn btn-danger btn-sm">Удалить
                        </button>
                    </td>
                </tr>
            )
        )
    }

    render() {
        const {freePositions} = this.props;
        let tableBody;
        if (freePositions.length === 0) {
            tableBody = (
                <tbody>
                <tr>
                    <td colSpan='3'>Позиции не добавлены</td>
                </tr>
                </tbody>
            )
        } else {
            tableBody = (
                <tbody>
                {this.getFreePositions(freePositions)}
                <TableResultRow columnCount={5}
                                resultPrice={this.props.freePositionsResultPrice}/>
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
                        <th scope="col">Кол-во</th>
                        <th scope="col">Цена</th>
                    </tr>
                    </thead>
                    {tableBody}
                </table>
            </div>
        )
    }
}