import React from 'react';
import {connect} from 'react-redux';

import Loader from '../../../components/Loader';
import {getAssembly} from '../../../AC/assemblies';
import {getDateTime} from '../../../services/utils';
import InputAndOutputProducts from '../../recipes/recipeDetail/InputAndOutputProducts'

class AssemblyDetail extends React.Component {
    componentWillMount = () => {
        const urlId = this.props.match.params.assemblyId;
        this.props.getAssembly(urlId);
    };

    render() {
        const {assembly, isLoading} = this.props;
        if (isLoading || !assembly) return <Loader/>;

        return (
            <div className="col-12">
                <h5><i>Название:</i> {assembly.name}</h5>
                <h5><i>Дата:</i> {getDateTime(assembly.auto_date)}</h5>
                <h5><i>Пользователь:</i> {assembly.user.first_name + ' ' + assembly.user.last_name}</h5>
                <h5><i>Количество:</i> {assembly.count}</h5>
                <InputAndOutputProducts obj={assembly}/>
            </div>
        )
    }
}

export default connect((state) => ({
    assembly: state.assemblies.assembly,
    isLoading: state.assemblies.isLoading
}), {getAssembly})(AssemblyDetail);
