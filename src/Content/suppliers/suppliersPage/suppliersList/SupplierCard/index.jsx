import React from 'react';

import {checkComment, checkAddress} from '../../../../../services/utils';
import history from '../../../../../history';
import styles from './styles.scss';

export default class extends React.Component {

    clickOnSupplierCard = supplier => () => {
        if (this.props.supplierForSupply) {
            this.props.supplierForSupply(supplier);
        } else {
            this.props.handleClick(supplier.id)
        }
    };


    render() {
        const {supplier, number} = this.props;
        return (
            <tr onClick={this.clickOnSupplierCard(supplier)}
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