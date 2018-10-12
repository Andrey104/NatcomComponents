import React from 'react';

import {getDateTime} from '../../../../../services/utils';
import history from '../../../../../history';
import './styles.css';

export default class AssemblyCard extends React.Component {
    render() {
        const {assembly, number} = this.props;
        return (
            <tr onClick={this.handleClick(assembly.id)}
                className='assemblies-list__card'>
                <td scope="row" className='assemblies-list__card__td__id_fixed-width'>{number}</td>
                <td className='assemblies__card__td__auto-date_fixed-width'>{getDateTime(assembly.auto_date)}</td>
                <td className='assemblies__card__td__name_fixed-width'>{assembly.name}</td>
                <td className='assemblies__card__td__user_fixed_width'>
                    {assembly.user.first_name + ' ' + assembly.user.last_name}
                </td>
                <td className='assemblies__card__td__count_fixed_width'>{assembly.count}</td>
            </tr>
        )
    }

    handleClick = assemblyId => () => history.push(`/assemblies/${assemblyId}`);
}
