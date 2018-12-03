import React from 'react';

import {serviceTypes} from '../../../../../constans';
import {priceFormat} from '../../../../../services/utils';
import history from '../../../../../history';
import './styles.css'

export default class ServiceCard extends React.Component {
    render() {
        const {service, number} = this.props;
        return (
            <tr onClick={this.handleClick(service.id)}
                className='services-list__card'>
                <td scope="row" className='services-list__card__td__id_fixed-width'>{number}</td>
                <td className='services-list__card__td__name_fixed-width'>{service.name}</td>
                <td className='services-list__card__td__type_fixed-width'>{serviceTypes[service.type - 1]}</td>
                <td className='services-list__card__td__prices_fixed_width'>
                    {priceFormat(service.price_standard)}
                </td>
                <td className='services-list__card__td__prices_fixed_width'>
                    {priceFormat(service.price_good)}
                </td>
                <td className='services-list__card__td__prices_fixed_width'>
                    {priceFormat(service.price_best)}
                </td>
            </tr>
        )
    }

    handleClick = serviceId => () => history.push(`/services/${serviceId}`);
}
