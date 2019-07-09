import React from 'react';

import AddMembranes from '../../../../components/addMembranesDialog/AddMembranesDialog';
import TableResultRow from '../../../../components/TableResultRow/index';
import {
    priceFormat, getUniqueElementsArr, getUnit, dimensionsFormat,
    getMembranePrice
} from '../../../../services/utils';
import {getMembrane} from "../../../../AC/membranes";

export default class extends React.Component {
    membranes = [];
    resultPrice = 0;
    openAddMembranesDialog = false;

    constructor(props) {
        super(props);
        const {harpoon} = this.props;
        if (harpoon) {
            this.membranes = harpoon.membranes;
            this.resultPrice = harpoon.membranesPrice;
            this.calc();
        }
    }

    calc() {
        this.resultPrice = this.getResultPrice();
    }

    addMembranesState = () => {
        this.openAddMembranesDialog = !this.openAddMembranesDialog;
        this.props.dialogWindowState();
    };

    selectedMembranes = membrane => {
        let newMembrane;
        newMembrane = {
            membrane: membrane,
            membraneLength: 0,
            square: 0,
            membranePrice: 0
        };
        this.membranes = this.membranes.concat(newMembrane);
        this.addMembranesState();
    };

    handleChangeLength = (event, index) => {
        let length = (event.target.value);
        length.replace(',', '.');
        this.membranes[index].count = Number(length);
        this.membranes[index].membraneLength = length;
        this.membranes[index].square = this.membranes[index].membrane.width * length;
        this.membranes[index].membranePrice = this.membranes[index].square * this.membranes[index].membrane.price;
        this.calc();
        this.props.addMembranes(this.membranes, this.resultPrice);
    };

    getResultPrice = () => {
        let resultPrice = 0;
        for (const membrane of this.membranes) {
            resultPrice += getMembranePrice(membrane);
        }
        return resultPrice;
    };

    removeMembraneFromList = (currentMembrane, index_in) => {
        this.membranes = this.membranes.filter((membrane, index) => (
            index !== index_in
        ));
        this.resultPrice -= currentMembrane.membranePrice;
        this.props.addMembranes(this.membranes, this.resultPrice);
    };

    getDialogWindow() {
        let dialogWindow = null;
        if (this.openAddMembranesDialog) {
            dialogWindow = <AddMembranes header={'Добавить полотна'}
                                         currentMembranes={this.membranes}
                                         selectedMembranes={this.selectedMembranes}
                                         client={this.props.client}
                                         close={this.addMembranesState}/>
        }
        return dialogWindow;
    }

    getArea(membrane) {
        return <div>({(membrane.square).toFixed(2)}) м²</div>;
    }

    handleChangeRealArea(event, index) {
        let area = (event.target.value);
        area.replace(',', '.');
        this.membranes[index].real_area = Number(area);
        this.calc();
        this.props.addMembranes(this.membranes, this.resultPrice);
    }

    getRealAreaInput(membrane, index) {
        if (membrane.membrane.real_area_calculation) {
            return(
                <div>
                    Реальная площадь:
                    <input type="number"
                           name="real_area"
                           value={membrane.real_area}
                           className="count-input"
                           onChange={e => this.handleChangeRealArea(e, index)}/> м²
                </div>
            );
        }
    }

    getMembranes() {
        return (this.membranes.map((membrane, index) => (
            <tr key={index + membrane.membrane.name}>
                <th scope="row">
                    <div className="number-block">
                        <img className="del-button"
                             src="/public/remove.svg"
                             onClick={() => this.removeMembraneFromList(membrane, index)}>
                        </img>
                        {index + 1}
                    </div>
                </th>
                <td>{membrane.membrane.vendor_code}</td>
                <td>{membrane.membrane.texture.description} {membrane.membrane.color.description} {membrane.membrane.name} ({membrane.membrane.width})</td>
                <td>{membrane.membrane.stocks[0].count}</td>
                <td>{membrane.membrane.price || membrane.price} руб/м²</td>
                <td>
                    <div className="input-count">
                        <input type="number"
                               name="count"
                               value={membrane.count}
                               className="сount-input"
                               onChange={e => this.handleChangeLength(e, index)}/> м
                    </div>
                    <div>({dimensionsFormat(membrane.square)}) м²</div>
                    {this.getRealAreaInput(membrane, index)}
                </td>
                <td className="result-price-td">{priceFormat(getMembranePrice(membrane))}</td>
            </tr>
        )));
    }

    getMembranesTable() {
        let membranesTable;
        if (this.membranes.length > 0) {
            membranesTable = (
                <table className="table table-bordered">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Артикул</th>
                        <th scope="col">Название</th>
                        <th scope="col">В наличии</th>
                        <th scope="col">Цена</th>
                        <th scope="col">Кол-во</th>
                        <th scope="col">Стоимость</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.getMembranes()}
                    <TableResultRow columnCount={8}
                                    resultPrice={this.resultPrice}/>
                    </tbody>
                </table>
            )
        } else {
            membranesTable = <h3 className="text-center">Полотна не выбраны</h3>;
        }
        return membranesTable;
    }

    render() {
        const dialogWindow = this.getDialogWindow();
        const membranesTable = this.getMembranesTable();
        return (
            <div>
                {dialogWindow}
                <button type="button"
                        onClick={this.addMembranesState}
                        className="btn btn-primary btn-sm">Добавить полотно
                </button>
                {membranesTable}
            </div>
        )
    }
}