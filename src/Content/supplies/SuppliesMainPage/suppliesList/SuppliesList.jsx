import React, {Component} from 'react';
import {connect} from 'react-redux';

import Loader from '../../../../components/Loader/index';
import AddButton from '../../../../components/AddButton/index';
import SupplyCard from './SupplyCard/SupplyCard';
import InfiniteScrollOverride from '../../../../services/InfiniteScrollOverride';
import {getSupplies} from '../../../../AC/supplies';
import {mapToArr} from '../../../../helpers';
import history from '../../../../history';

class SuppliesList extends Component {

    componentDidMount = () => {
        const {supplierId} = this.props;
        //supplierId ? this.props.getAllSupplies(`?supplier=${supplierId}`) : this.props.getAllSupplies();
        this.props.getSupplies(null, this.props.filter)
    };

    loadSupplies = (page) => {
        this.props.getSupplies(page, this.props.filter);
    };

    addNewSupply = () => history.push(`/supplies/add_supply`);

    getBody(supplies) {
        if (!supplies.length) return (
            <tr>
                <td colSpan='5'>Вы еще не добавили ни одной поставки</td>
            </tr>
        );
        return supplies.map((supply) => (
                <SupplyCard key={supply.id}
                            supply={supply}/>
            )
        );
    }

    render() {
        const {isLoading, supplies, hasMoreSupplies} = this.props;
        if (isLoading && !supplies.length) {
            return (
                <div className="pre-loader-container">
                    <Loader/>
                </div>
            );
        }
        const loader = hasMoreSupplies ? <Loader/> : null;
        return (
            <div className="row">
                <div className="col-12">
                    <InfiniteScrollOverride
                        hasMore={hasMoreSupplies}
                        loadMore={this.loadSupplies}
                        useWindow={false}>
                        <div className="row">
                            <div className="col-12">
                                <table className="table table-hover table-bordered">
                                    <thead className="thead">
                                    <tr>
                                        <th scope="col">ID</th>
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
    filter: state.supplies.filter,
    isLoading: state.supplies.isLoading,
    hasMoreSupplies: state.supplies.hasMoreSupplies
}), {getSupplies})(SuppliesList);