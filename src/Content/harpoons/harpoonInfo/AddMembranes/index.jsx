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
        const length = (event.target.value);
        if (!isFinite(length)) return;
        let currentMembrane = this.membranes[index];
        this.membranes[index].count = length;
        currentMembrane.membraneLength = length;
        currentMembrane.square = currentMembrane.membrane.width * length;
        currentMembrane.membranePrice = currentMembrane.square * currentMembrane.membrane.price;
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

    removeMembraneFromList = (currentMembrane) => {
        this.membranes = this.membranes.filter(membrane => (
            membrane.membrane.item !== currentMembrane.membrane.item
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

    getMembranes() {
        return (this.membranes.map((membrane, index) => (
            <tr key={membrane.membrane.item + index}>
                <th scope="row">
                    <div className="number-block">
                        <img className="del-button"
                             src="/public/remove.svg"
                             onClick={() => this.removeMembraneFromList(membrane)}>
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
                        <input type="text"
                               name="name"
                               value={membrane.count}
                               className="сount-input"
                               onChange={e => this.handleChangeLength(e, index)}/> м
                    </div>
                    <div>({dimensionsFormat(membrane.square)}) м²</div>
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