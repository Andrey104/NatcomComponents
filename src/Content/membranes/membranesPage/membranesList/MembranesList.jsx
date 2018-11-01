import React from 'react';
import {connect} from 'react-redux';

import Loader from '../../../../components/Loader/index';
import AddButton from '../../../../components/AddButton/index';
import MembraneCard from './MembraneCard/index';
import InfiniteScrollOverride from '../../../../services/InfiniteScrollOverride';
import {getAllMembranes, getNextMembranes} from '../../../../AC/membranes';
import {mapToArr} from '../../../../helpers';
import history from '../../../../history';
import './styles.css';
import {UsersService} from "../../../../services/users.service";

class MembranesList extends React.Component {

    componentWillMount = () => this.props.getAllMembranes(this.props.filters);

    loadMembranes = page => this.props.getNextMembranes(this.props.filters, this.props.nextPageNumber);

    addNewMembrane = () => history.push('/membranes/add_membrane');

    getBody(membranes) {
        if (!membranes.length) {
            return (
                <tr>
                    <td colSpan='5'>Полотна не найдены</td>
                </tr>
            );
        }
        return membranes.map((membrane, index) => (
                <MembraneCard key={membrane.id}
                              number={++index}
                              membrane={membrane}/>
            )
        );
    }

    render() {
        let buttonBlock = null;
        if (UsersService.adminPermission()) {
            buttonBlock = <AddButton openAdd={this.addNewMembrane}/>
        }

        const {isLoading, membranes, hasMoreMembranes} = this.props;
        if (isLoading && membranes.length === 0) {
            return (
                <div className="pre-loader-container">
                    <Loader/>
                </div>
            );
        }
        const loader = hasMoreMembranes ? <Loader/> : false;
        return (
            <div className="row">
                <div className="col-12">
                    <InfiniteScrollOverride
                        pageStart={1}
                        loadMore={this.loadMembranes}
                        hasMore={hasMoreMembranes}
                        useWindow={false}>
                        <div className="row">
                            <div className="col-12">
                                <table className="table table-hover table-bordered">
                                    <thead className="thead-light">
                                    <tr>
                                        <th scope="col">Артикул</th>
                                        <th scope="col">Название</th>
                                        <th scope="col">В наличии</th>
                                        <th scope="col">Цена</th>
                                        <th scope="col">Цена в гарпуне</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {this.getBody(membranes)}
                                    {loader}
                                    </tbody>
                                </table>
                            </div>
                            {buttonBlock}
                        </div>
                    </InfiniteScrollOverride>
                </div>
            </div>
        )
    }
}

export default connect((state) => ({
    membranes: mapToArr(state.membranes.entries),
    isLoading: state.membranes.isLoading,
    hasMoreMembranes: state.membranes.hasMoreEntries,
    filters: state.membranes.filters,
    nextPageNumber: state.membranes.nextPageNumber,
}), {getAllMembranes, getNextMembranes})(MembranesList);