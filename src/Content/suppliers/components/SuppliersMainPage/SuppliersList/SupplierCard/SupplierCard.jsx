import React, {Component} from 'react';
import {checkAddress} from '../../../../../../services/utils';
import history from "../../../../../../history";

export default class SupplierCard extends Component {

    handleClick = supplierId => history.push(`/suppliers/${supplierId}`);

    clickOnCard = supplier => () => {
        if (this.props.supplierForSupply) {
            this.props.supplierForSupply(supplier);
        }

        else this.handleClick(supplier.id)
    };

    render() {
        const {supplier, number} = this.props;
        return (
            <tr onClick={this.clickOnCard(supplier)} className="hover-over-table">
                <td data-label="№ поставщика: ">{number}</td>
                <td data-label="Поставщик: ">{supplier.name}</td>
                <td data-label="Адрес: ">{checkAddress(supplier.address)}</td>
            </tr>
        )
    }
}