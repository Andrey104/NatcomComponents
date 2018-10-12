import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import classNames from 'classnames/bind';
import {connect} from 'react-redux';

import Loader from '../../../components/Loader';
import AddButton from '../../../components/AddButton';
import DriverCard from './DriverCard';
import AddNewDriver from './AddNewDriver';
import {getAllDrivers, getNextDrivers} from '../../../AC/drivers';
import {mapToArr} from '../../../helpers';
import styles from './styles.scss';

let cx = classNames.bind(styles);

class DriversList extends React.Component {
    state = {
        openAddDriverDialog: false
    };

    pageNumber = 1;

    componentWillMount = () => this.props.getAllDrivers();

    loadDrivers = () => this.props.getNextDrivers(this.pageNumber++);

    getBody(drivers) {
        if (!drivers.length) return (
            <tr>
                <td colSpan='4'>Вы еще не добавили ни одного водителя</td>
            </tr>
        );

        let number = 1;
        return drivers.map((driver) => (
                <DriverCard key={driver.id}
                            history={this.props.history}
                            number={number++}
                            selectDriverForCar={this.props.selectDriverForCar}
                            selectedDriverId={this.props.selectedDriverId}
                            driver={driver}/>
            )
        );
    }

    getDialogWindow() {
        let dialogWindow = null;
        if (this.state.openAddDriverDialog) {
            dialogWindow = <AddNewDriver header={'Новый водитель'}
                                         successAddDriver={this.successAddDriver}
                                         close={this.addDriverDialogState}/>
        }
        return dialogWindow;
    }

    addDriverDialogState = () => {
        this.setState({openAddDriverDialog: !this.state.openAddDriverDialog});
    };

    successAddDriver = () => {
        this.props.getAllDrivers();
        this.addDriverDialogState();
        this.pageNumber = 1;
    };

    getPageClasses() {
        return this.props.selectDriverForCar ? 'drivers-list_dialog' : ''
    }

    render() {
        const {isLoading, drivers, hasMoreDrivers} = this.props;
        if (isLoading && !drivers.length) {
            return (
                <div className={cx('pre-loader-container')}>
                    <Loader/>
                </div>
            );
        }

        const button = this.props.selectDriverForCar ? null : <AddButton openAdd={this.addDriverDialogState}/>;
        return (
            <div className="row">
                {this.getDialogWindow()}
                <div className={cx('col-12', this.getPageClasses())}>
                    <InfiniteScroll
                        loadMore={this.loadDrivers}
                        hasMore={hasMoreDrivers}
                        useWindow={false}
                        loader={<Loader key={0}/>}>
                        <div className="row">
                            <div className="col-12">
                                <table className="table table-hover table-bordered">
                                    <thead className="thead-light">
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Фамилия</th>
                                            <th scope="col">Имя</th>
                                            <th scope="col">Телефон</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.getBody(drivers)}
                                    </tbody>
                                </table>
                            </div>
                            {button}
                        </div>
                    </InfiniteScroll>
                </div>
            </div>
        );
    }

}

export default connect((state) => ({
    drivers: mapToArr(state.drivers.entries),
    isLoading: state.drivers.isLoading,
    hasMoreDrivers: state.drivers.hasMoreEntries
}), {getAllDrivers, getNextDrivers})(DriversList);
