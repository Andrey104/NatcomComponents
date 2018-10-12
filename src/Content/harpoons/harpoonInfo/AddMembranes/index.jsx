import React from 'react';

import AddMembranes from '../../../../components/addMembranesDialog/AddMembranesDialog';
import TableResultRow from '../../../../components/TableResultRow/index';
import {moneyFormat, getUniqueElementsArr} from '../../../../services/utils';

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
        }
    }

    addMembranesState = () => {
        this.openAddMembranesDialog = !this.openAddMembranesDialog;
        this.props.dialogWindowState();
    };

    selectedMembranes = membranes => {
        let newMembranes = getUniqueElementsArr(membranes, this.membranes);
        newMembranes = newMembranes.map(membrane => ({
            membrane: membrane,
            membraneLength: 0,
            square: 0,
            membranePrice: 0
        }));
        this.membranes = this.membranes.concat(newMembranes);
        this.addMembranesState();
    };

    handleChangeLength = (event, index) => {
        const length = Number(event.target.value);
        if (!isFinite(length)) return;
        let currentMembrane = this.membranes[index];
        currentMembrane.membraneLength = length;
        currentMembrane.square = currentMembrane.membrane.width * length;
        currentMembrane.membranePrice = currentMembrane.square * currentMembrane.membrane.price;
        this.resultPrice = this.getResultPrice();
        this.props.addMembranes(this.membranes, this.resultPrice);
    };

    getResultPrice = () => {
        let resultPrice = 0;
        for (const membrane of this.membranes) {
            resultPrice += membrane.membranePrice;
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

    getMembranes() {
        return (this.membranes.map((membrane, index) => (
            <tr key={membrane.membrane.item}>
                <th scope="row">{index + 1}</th>
                <td>{membrane.membrane.vendor_code}</td>
                <td>{membrane.membrane.name}</td>
                <td>{moneyFormat(membrane.membrane.price)}</td>
                <td><input type="text"
                           name="name"
                           value={membrane.membraneLength}
                           className="form-control"
                           onChange={e => this.handleChangeLength(e, index)}/>
                </td>
                <td>{membrane.square} м2</td>
                <td className="result-price-td">{moneyFormat(membrane.membranePrice)}</td>
                <td>
                    <button type="button"
                            onClick={() => this.removeMembraneFromList(membrane)}
                            className="btn btn-danger btn-sm">Удалить
                    </button>
                </td>
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
                        <th scope="col">Цена за гарпун</th>
                        <th scope="col">Длина</th>
                        <th scope="col">Площадь</th>
                        <th scope="col">Итог</th>
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