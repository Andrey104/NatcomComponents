import React, {Component} from 'react';

import {checkAddress} from '../../../../../../services/utils';
import styles from './SupplierCard.scss';
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
            <tr onClick={this.clickOnCard(supplier)}
                className={styles['suppliers-list__card']}>
                <td className={styles['suppliers-list__card__td__id_fixed-width']}>
                    {number}
                </td>
                <td className={styles['suppliers-list__card__td__name_fixed-width']}>
                    {supplier.name}
                </td>
                <td className={styles['suppliers-list__card__td__address_fixed-width']}>
                    {checkAddress(supplier.address)}
                </td>
            </tr>
        )
    }
}