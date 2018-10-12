import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import {connect} from 'react-redux';

import Loader from '../../../../components/Loader';
import AddButton from '../../../../components/AddButton';
import AssemblyCard from './AssemblyCard';
import {getAllAssemblies, getNextAssemblies} from '../../../../AC/assemblies';
import {mapToArr} from '../../../../helpers';
import history from '../../../../history';

class AssembliesList extends React.Component {
    state = {
        openAddAssemblyDialog: false
    };

    componentWillMount = () => this.props.getAllAssemblies();

    loadAssemblies = page => this.props.getNextAssemblies(page);

    getBody(assemblies) {
        if (!assemblies.length) return (
            <tr>
                <td colSpan='6'>Вы еще не добавили ни одной сборки</td>
            </tr>
        );

        let number = 1;
        return assemblies.map((assembly) => (
                <AssemblyCard key={assembly.id}
                              number={number++}
                              assembly={assembly}/>
            )
        );
    }

    addNewAssembly = () => history.push('/assemblies/add_assembly');

    render() {
        const {isLoading, assemblies, hasMoreAssemblies} = this.props;
        if (isLoading && !assemblies.length) {
            return (
                <div>
                    <Loader/>
                </div>
            );
        }

        return (
            <div className="row">
                <div className='col-12'>
                    <InfiniteScroll
                        pageStart={1}
                        loadMore={this.loadAssemblies}
                        hasMore={hasMoreAssemblies}
                        useWindow={false}
                        loader={<Loader key={0}/>}>
                        <div className="row">
                            <div className="col-12">
                                <table className="table table-hover table-bordered">
                                    <thead className="thead-light">
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Дата</th>
                                            <th scope="col">Название</th>
                                            <th scope="col">Пользователь</th>
                                            <th scope="col">Количество</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.getBody(assemblies)}
                                    </tbody>
                                </table>
                            </div>
                            <AddButton openAdd={this.addNewAssembly}/>
                        </div>
                    </InfiniteScroll>
                </div>
            </div>
        );
    }
}

export default connect((state) => ({
    assemblies: mapToArr(state.assemblies.entries),
    isLoading: state.assemblies.isLoading,
    hasMoreAssemblies: state.assemblies.hasMoreEntries
}), {getAllAssemblies, getNextAssemblies})(AssembliesList);
