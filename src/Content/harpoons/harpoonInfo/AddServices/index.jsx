import React from 'react';

import AddServiceDialog from '../../../../components/addServiceDialog/AddServiceDialog';
import TableResultRow from '../../../../components/TableResultRow/index';
import {priceFormat} from '../../../../services/utils';

export default class extends React.Component {
    resultPrice = 0;
    services = [];
    openAddServiceDialog = false;

    constructor(props) {
        super(props);
        const {harpoon} = this.props;
        if (harpoon) {
            this.services = harpoon.services;
            this.resultPrice = harpoon.servicesPrice;
            this.calc();
        }
    }

    calc() {
        this.resultPrice = this.getResultPrice();
    }

    addServiceState = () => {
        this.openAddServiceDialog = !this.openAddServiceDialog;
        this.props.dialogWindowState();
    };

    selectedService = service => {
        this.services.push({
            service,
            count: 0,
            servicePrice: 0
        });
        this.addServiceState();
    };

    handleChangeCount = (event, index) => {
        // var inputValue = (event.target.value);
        // inputValue.replace(',', '.');
        // // if (!isFinite(inputValue)) return;
        // this.items[index].count = Number(inputValue);
        const currentService = this.services[index];
        var inputValue = (event.target.value);
        inputValue.replace(',', '.');
        currentService.count = Number(inputValue);
        currentService.servicePrice = currentService.count * currentService.service.price;
        this.calc();
        this.props.addServices(this.services, this.resultPrice);
    };

    getResultPrice = () => {
        let resultPrice = 0;
        for (const service of this.services) {
            resultPrice += service.servicePrice;
        }
        return resultPrice;
    };

    removeServiceFromList = (currentService) => {
        this.services = this.services.filter(service => (
            service.service.id !== currentService.service.id
        ));
        this.resultPrice -= currentService.servicePrice;
        this.props.addServices(this.services, this.resultPrice);
    };

    getDialogWindow() {
        let dialogWindow = null;
        if (this.openAddServiceDialog) {
            dialogWindow = <AddServiceDialog header={'Добавить услугу'}
                                             currentServices={this.services}
                                             client={this.props.client}
                                             selectedService={this.selectedService}
                                             close={this.addServiceState}/>
        }
        return dialogWindow;
    }

    getInputValue(arrService) {
        if (arrService.count === 0) {
            return '';
        } else {
            return arrService.count;
        }
    }

    getServices() {
        return (this.services.map((arrService, index) => (
            <tr key={arrService.service.id}>
                <th scope="row">{index + 1}</th>
                <td>{arrService.service.name}</td>
                <td>{priceFormat(arrService.service.price)}</td>
                <td><input type="number"
                           name="name"
                           value={this.getInputValue(arrService)}
                           className="form-control"
                           onChange={e => this.handleChangeCount(e, index)}/>
                </td>
                <td className="result-price-td">{priceFormat(arrService.servicePrice)}</td>
                <td>
                    <button type="button"
                            onClick={() => this.removeServiceFromList(arrService)}
                            className="btn btn-danger btn-sm">Удалить
                    </button>
                </td>
            </tr>
        )));
    }

    getServicesTable() {
        let servicesTable;
        if (this.services.length > 0) {
            servicesTable = (
                <table className="table table-bordered">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Название</th>
                        <th scope="col">Цена</th>
                        <th scope="col">Количество</th>
                        <th scope="col">Итог</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.getServices()}
                    <TableResultRow columnCount={5}
                                    resultPrice={this.resultPrice}/>
                    </tbody>
                </table>
            )
        } else {
            servicesTable = <h3 className="text-center">Услуги не выбраны</h3>;
        }
        return servicesTable;
    }

    render() {
        const dialogWindow = this.getDialogWindow();
        const servicesTable = this.getServicesTable();
        return (
            <div>
                {dialogWindow}
                <button type="button"
                        onClick={this.addServiceState}
                        className="btn btn-primary btn-sm">Добавить услугу
                </button>
                {servicesTable}
            </div>
        )
    }
}