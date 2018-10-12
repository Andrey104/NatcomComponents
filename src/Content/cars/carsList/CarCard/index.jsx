import React from 'react';
import './styles.css'

export default class CarCard extends React.Component {
    render() {
        const {car, number} = this.props;
        return (
            <tr onClick={this.clickOnCarCard(car.id)}
                className='cars-list__card'>
                <td scope="row" className='cars-list__card__td__id_fixed-width'>{number}</td>
                <td className='cars-list__card__td__name_fixed-width'>{car.name}</td>
                <td className='cars-list__card__td__number_fixed-width'>{car.number}</td>
                <td className='cars-list__card__td__driver_fixed-width'>{this.getDriver()}</td>
            </tr>
        )
    }

    clickOnCarCard = (carId) => () => {
        this.props.history.push(`/cars/${carId}`)
    };

    getDriver() {
        const {driver} = this.props.car;
        if (!driver) return 'Водитель не установлен';

        return driver.first_name + ' ' + driver.last_name
    }
}
