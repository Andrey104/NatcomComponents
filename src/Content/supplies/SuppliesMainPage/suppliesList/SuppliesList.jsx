import React, {Component} from 'react';
import {connect} from 'react-redux';

import Loader from '../../../../components/Loader/index';
import AddButton from '../../../../components/AddButton/index';
import SupplyCard from './SupplyCard/SupplyCard';
import InfiniteScrollOverride from '../../../../services/InfiniteScrollOverride';
import {getAllSupplies, getNextSupplies} from '../../../../AC/supplies';
import {mapToArr} from '../../../../helpers';
import history from '../../../../history';

class SuppliesList extends Component {

    componentWillMount = () => {
        const {supplierId} = this.props;
        supplierId === undefined? this.props.getAllSupplies() : this.props.getAllSupplies(`?supplier=${supplierId}`);
    };

    loadSupplies = () => {
        this.props.getNextSupplies(this.props.nextPage, this.props.text, this.props.date);
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
    date: state.supplies.date,
    text: state.supplies.text,//
    isLoading: state.supplies.isLoading,
    nextPage: state.supplies.nextPageNumber,
    hasMoreSupplies: state.supplies.hasMoreSupplies
}), {getAllSupplies, getNextSupplies})(SuppliesList);