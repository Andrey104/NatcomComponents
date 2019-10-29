import React from 'react';

import TableResultRow from '../../../../../components/TableResultRow/index';
import PropTypes from 'prop-types';
import {units} from "../../../../../constans";

export default class extends React.Component {

    /* Free positions list component */

    static propTypes = {
        positions: PropTypes.object,
        editPosition: PropTypes.func,
        removePositionFromList: PropTypes.func,
        positionsResultPrice: PropTypes.string,
        changePositionPrice: PropTypes.func,
        changePositionCount: PropTypes.func,
        changePositionUnit: PropTypes.func,
    };


    getCustomPositions(freePositions) {
        return freePositions.map((position, index) => (
                <tr key={index}>
                    <th scope="row">
                        <div className="number-block">
                            <img className="del-button"
                                 src="/public/remove.svg"
                                 onClick={() => this.props.removePositionFromList(position, index)}>
                            </img>
                            {index + 1}
                        </div>
                    </th>
                    <td>
                        <input type="text"
                               name="position-name"
                               value={position.name}
                               onChange={e => this.props.editPosition(e, index)}/>
                    </td>
                    <td>
                        <div className="input-count">
                            <input type="number"
                                   name="price"
                                   className="price-input"
                                   value={position.price || ""}
                                   onChange={e => this.props.changePositionPrice(e, index)}/>руб
                        </div>
                    </td>
                    <td>
                        <div className="input-count">
                            <input type="number"
                                   name="count"
                                   className="count-input"
                                   value={position.count || ""}
                                   onChange={e => this.props.changePositionCount(e, index)}/>
                        </div>
                    </td>
                    <td>
                        <select className="form-control"
                                name="unit"
                                onChange={e => this.props.changePositionUnit(e, index)}
                                defaultValue={position.unit || 0}>
                            {units.map((unit, index) => (
                                <option value={++index} key={index}>{unit}</option>
                            ))}
                        </select>
                    </td>
                </tr>
            )
        )
    }

    render() {
        const {positions} = this.props;
        let tableBody;
        if ((!positions) || (positions.length === 0)) {
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
                {this.getCustomPositions(positions)}
                <TableResultRow columnCount={5}
                                resultPrice={this.props.positionsResultPrice}/>
                </tbody>
            )
        }
        return (
            <div>
                <table className="table table-bordered">
                    <thead className="thead-light">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Название</th>
                        <th scope="col">Цена</th>
                        <th scope="col">Кол-во</th>
                        <th scope="col">Ед.из.</th>
                    </tr>
                    </thead>
                    {tableBody}
                </table>
            </div>
        )
    }
}