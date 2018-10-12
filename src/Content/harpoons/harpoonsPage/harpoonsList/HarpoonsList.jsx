import React from 'react';
import {connect} from 'react-redux';

import Loader from '../../../../components/Loader/index';
import HarpoonCard from './HarpoonCard';
import InfiniteScrollOverride from '../../../../services/InfiniteScrollOverride';
import {getAllHarpoons, getNextHarpoons} from '../../../../AC/harpoons';
import {mapToArr} from '../../../../helpers';

class HarpoonsList extends React.Component {

    componentWillMount = () => this.props.getAllHarpoons();

    loadHarpoons = page => this.props.getNextHarpoons(page);

    getBody(harpoons) {
        if (!harpoons.length) {
            return (
                <tr>
                    <td colSpan='5'>Вы еще не добавили ни одного гарпуна</td>
                </tr>
            );
        }
        return (harpoons.map((harpoon, index) => (
                <HarpoonCard key={harpoon.id}
                             harpoon={harpoon}
                             number={++index}/>
            )
        ));
    }

    render() {
        const {isLoading, harpoons, hasMoreHarpoons} = this.props;
        if (isLoading && harpoons.length === 0) {
            return (
                <div className="pre-loader-container">
                    <Loader/>
                </div>
            );
        }
        const loader = hasMoreHarpoons ? <Loader/> : false;
        return (
            <div className="row">
                <div className="col-12">
                    <InfiniteScrollOverride
                        pageStart={1}
                        loadMore={this.loadHarpoons}
                        hasMore={hasMoreHarpoons}
                        useWindow={false}>
                        <div className="row">
                            <div className="col-12">
                                <table className="table table-hover table-bordered">
                                    <thead className="thead-light">
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Клиент</th>
                                        <th scope="col">Сумма</th>
                                        <th scope="col">Дата</th>
                                        <th scope="col">Статус</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {this.getBody(harpoons)}
                                    {loader}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </InfiniteScrollOverride>
                </div>
            </div>
        )
    }
}

export default connect((state) => ({
    harpoons: mapToArr(state.harpoons.harpoons),
    isLoading: state.harpoons.isLoading,
    hasMoreHarpoons: state.harpoons.hasMoreHarpoons
}), {getAllHarpoons, getNextHarpoons})(HarpoonsList);