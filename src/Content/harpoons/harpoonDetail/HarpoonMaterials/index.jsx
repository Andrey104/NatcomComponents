import React from 'react';

import TableResultRow from '../../../../components/TableResultRow';
import {moneyFormat, countFormat} from '../../../../services/utils';
import {serviceTypes} from '../../../../constans';
import history from '../../../../history';

export default class extends React.Component {
    harpoon;

    getMembranes() {
        return this.harpoon.membranes.map(membrane => (
            <tr key={membrane.membrane.item}
                onClick={() => history.push(`/membranes/${membrane.membrane.id}`)}>
                <td>{membrane.membrane.name}</td>
                <td>{countFormat(membrane.membrane.width)}</td>
                <td>{countFormat(membrane.count)}</td>
                <td>{countFormat(membrane.square)}</td>
                <td>{moneyFormat(membrane.price)}</td>
                <td>{moneyFormat(membrane.price * membrane.square)}</td>
            </tr>
        ));
    }

    getResultMembranesPrice() {
        let resultPrice = 0;
        this.harpoon.membranes.forEach(membrane => {
            resultPrice += membrane.price * membrane.square;
        });
        return <TableResultRow columnCount={6}
                               resultPrice={resultPrice}/>
    }

    getMembranesTable() {
        return (
            <table className="table table-bordered table-hover">
                <thead className="thead-light">
                <tr>
                    <th scope="col">Название</th>
                    <th scope="col">Ширина</th>
                    <th scope="col">Длина</th>
                    <th scope="col">Площадь</th>
                    <th scope="col">Цена</th>
                    <th scope="col">Итог</th>
                </tr>
                </thead>
                <tbody>
                {this.getMembranes()}
                {this.getResultMembranesPrice()}
                </tbody>
            </table>
        )
    }

    getServices() {
        return this.harpoon.services.map(service => (
            <tr key={service.service.id}
                onClick={() => history.push(`/services/${service.service.id}`)}>
                <td>{service.service.name}</td>
                <td>{serviceTypes[service.service.type - 1]}</td>
                <td>{countFormat(service.count)}</td>
                <td>{moneyFormat(service.price)}</td>
                <td>{moneyFormat(service.price * service.count)}</td>
            </tr>
        ));
    }

    getResultServicesPrice() {
        let resultPrice = 0;
        this.harpoon.services.forEach(service => {
            resultPrice += service.price * service.count;
        });
        return <TableResultRow columnCount={5}
                               resultPrice={resultPrice}/>
    }

    getServicesTable() {
        if (this.harpoon.services.length) {
            return (
                <div>
                    <h5>Услуги</h5>
                    <table className="table table-bordered table-hover">
                        <thead className="thead-light">
                        <tr>
                            <th scope="col">Название</th>
                            <th scope="col">Тип</th>
                            <th scope="col">Количество</th>
                            <th scope="col">Цена</th>
                            <th scope="col">Итог</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.getServices()}
                        {this.getResultServicesPrice()}
                        </tbody>
                    </table>
                </div>
            )
        }
    }

    render() {
        this.harpoon = this.props.harpoon;
        return (
            <div>
                <h5>Полотна</h5>
                {this.getMembranesTable()}
                {this.getServicesTable()}
            </div>
        )
    }
}