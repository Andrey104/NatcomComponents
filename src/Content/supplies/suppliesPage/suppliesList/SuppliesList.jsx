import React from 'react';
import {connect} from 'react-redux';

import Loader from '../../../../components/Loader/index';
import AddButton from '../../../../components/AddButton/index';
import SupplyCard from './SupplyCard/index';
import InfiniteScrollOverride from '../../../../services/InfiniteScrollOverride';
import {getAllSupplies, getNextSupplies} from '../../../../AC/supplies';
import {mapToArr} from '../../../../helpers';
import history from '../../../../history';

class SuppliesList extends React.Component {

    componentWillMount = () => this.props.getAllSupplies();

    loadSupplies = page => this.props.getNextSupplies(page);

    addNewSupply = () => history.push(`/supplies/add_supply`);

    getBody(supplies) {
        if (!supplies.length) return (
            <tr>
                <td colSpan='5'>Вы еще не добавили ни одного поставки</td>
            </tr>
        );
        return supplies.map((supply, index) => (
                <SupplyCard key={supply.id}
                            number={++index}
                            supply={supply}/>
            )
        );
    }

    render() {
        const {isLoading, supplies, hasMoreSupplies} = this.props;
        if (isLoading && supplies.length === 0) {
            return (
                <div className="pre-loader-container">
                    <Loader/>
                </div>
            );
        }
        const loader = hasMoreSupplies ? <Loader/> : false;
        this.getBody(supplies);
        return (
            <div className="row">
                <div className="col-12">
                    <InfiniteScrollOverride
                        pageStart={1}
                        loadMore={this.loadSupplies}
                        hasMore={hasMoreSupplies}
                        useWindow={false}>
                        <div className="row">
                            <div className="col-12">
                                <table className="table table-hover table-bordered">
                                    <thead className="thead-light">
                                    <tr>
                                        <th scope="col">№</th>
                                        <th scope="col">Статус</th>
                                        <th scope="col">Поставщик</th>
                                        <th scope="col">Дата</th>
                                        <th scope="col">Сумма</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {this.getBody(supplies)}
                                    </tbody>
                                </table>
                                {loader}
                            </div>
                            <AddButton openAdd={this.addNewSupply}/>
                        </div>
                    </InfiniteScrollOverride>
                </div>
            </div>
        )
    }
}

export default connect((state) => ({
    supplies: mapToArr(state.supplies.supplies),
    isLoading: state.supplies.isLoading,
    hasMoreSupplies: state.supplies.hasMoreSupplies
}), {getAllSupplies, getNextSupplies})(SuppliesList);