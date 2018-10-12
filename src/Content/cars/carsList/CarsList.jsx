import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import classNames from 'classnames/bind';
import {connect} from 'react-redux';

import Loader from '../../../components/Loader';
import AddButton from '../../../components/AddButton';
import CarCard from './CarCard';
import AddNewCar from './AddNewCar';
import {getAllCars, getNextCars} from '../../../AC/cars';
import {mapToArr} from '../../../helpers';
import styles from './styles.css';

let cx = classNames.bind(styles);

class CarsList extends React.Component {
    state = {
        openAddCarDialog: false
    };

    pageNumber = 1;

    componentWillMount = () => this.props.getAllCars();

    loadCars = () => this.props.getNextCars(this.pageNumber++);

    getBody(cars) {
        if (!cars.length) return (
            <tr>
                <td colSpan='4'>Вы еще не добавили ни одной машины</td>
            </tr>
        );

        let number = 1;
        return cars.map((car) => (
                <CarCard key={car.id}
                         number={number++}
                         history={this.props.history}
                         car={car}/>
            )
        );
    }

    getDialogWindow() {
        let dialogWindow = null;
        if (this.state.openAddCarDialog) {
            dialogWindow = <AddNewCar header={'Новая машина'}
                                      successAddCar={this.successAddCar}
                                      close={this.addCarDialogState}/>
        }
        return dialogWindow;
    }

    addCarDialogState = () => {
        this.setState({openAddCarDialog: !this.state.openAddCarDialog});
    };

    successAddCar = () => {
        this.props.getAllCars();
        this.addCarDialogState();
        this.pageNumber = 1;
    };

    render() {
        const {isLoading, cars, hasMoreCars} = this.props;
        if (isLoading && !cars.length) {
            return (
                <div className={cx('pre-loader-container')}>
                    <Loader/>
                </div>
            );
        }

        return (
            <div className="row">
                {this.getDialogWindow()}
                <div className={cx('col-12')}>
                    <InfiniteScroll
                        loadMore={this.loadCars}
                        hasMore={hasMoreCars}
                        useWindow={false}
                        loader={<Loader key={0}/>}>
                        <div className="row">
                            <div className="col-12">
                                <table className="table table-hover table-bordered">
                                    <thead className="thead-light">
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Название</th>
                                            <th scope="col">Номер</th>
                                            <th scope="col">Водитель</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.getBody(cars)}
                                    </tbody>
                                </table>
                            </div>
                            <AddButton openAdd={this.addCarDialogState}/>
                        </div>
                    </InfiniteScroll>
                </div>
            </div>
        );
    }

}

export default connect((state) => ({
    cars: mapToArr(state.cars.entries),
    isLoading: state.cars.isLoading,
    hasMoreCars: state.cars.hasMoreEntries
}), {getAllCars, getNextCars})(CarsList);
