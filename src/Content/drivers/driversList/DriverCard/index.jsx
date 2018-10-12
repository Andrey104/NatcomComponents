import React from 'react';

import {getPhoneWithMask} from '../../../../services/utils';
import styles from './styles.css';

export default class extends React.Component {
    render() {
        const {driver, number} = this.props;
        return (
            <tr onClick={this.clickOnDriverCard(driver.id)}
                className={this.getRowClasses(driver)}>
                <td scope="row" className='drivers-list__card__td__id_fixed-width'>{number}</td>
                <td className='drivers-list__card__td__last-name_fixed-width'>{driver.last_name}</td>
                <td className='drivers-list__card__td__first-name_fixed-width'>{driver.first_name}</td>
                <td className='drivers-list__card__td__phone_fixed-width'>{getPhoneWithMask(driver.phone)}</td>
            </tr>
        )
    }

    getRowClasses(driver) {
        const {selectedDriverId} = this.props;
        let cls = 'drivers-list__card';
        if (driver.id === selectedDriverId) cls += ' drivers-list__card_selected-driver';
        return cls
    }

    clickOnDriverCard = (driverId) => () => {
        if (this.props.selectDriverForCar) {
            this.props.selectDriverForCar(driverId)
        } else {
            this.props.history.push(`/drivers/${driverId}`)
        }
    };
}