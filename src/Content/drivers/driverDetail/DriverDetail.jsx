import React from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames/bind';

import Loader from '../../../components/Loader';
import EditDriver from './EditDriver';
import {getDriver} from '../../../AC/drivers';
import {getPhoneWithMask} from '../../../services/utils';
import styles from './styles.scss';

let cx = classNames.bind(styles);

class DriverDetail extends React.Component {
    state = {
        openEditDriverDialog: false
    };

    componentWillMount = () => {
        const urlId = this.props.match.params.driverId;
        this.props.getDriver(urlId);
    };

    editDriverDialogState = () => {
        this.setState({openEditDriverDialog: !this.state.openEditDriverDialog});
    };

    successEditDriver = (driver) => {
        this.props.getDriver(driver.id);
        this.editDriverDialogState();
    };

    getDialogWindow(driver) {
        let dialogWindow = null;
        if (this.state.openEditDriverDialog) {
            dialogWindow = <EditDriver header={'Редактирование водителя'}
                                       successEditDriver={this.successEditDriver}
                                       close={this.editDriverDialogState}
                                       driver={driver}/>
        }
        return dialogWindow;
    }

    render() {
        const {driver, isLoading} = this.props;
        if (isLoading || !driver) {
            return (
                <div className={cx('pre-loader-container')}>
                    <Loader/>
                </div>
            );
        }
        const dialogWindow = this.getDialogWindow(driver);
        return (
            <div className="col-12">
                {dialogWindow}
                <h3>{driver.first_name} {driver.last_name}</h3>
                <div>{getPhoneWithMask(driver.phone)}</div>
                <button type="button"
                        onClick={this.editDriverDialogState}
                        className="btn btn-primary btn-sm">Редактировать
                </button>
            </div>
        )
    }
}

export default connect((state) => ({
    driver: state.drivers.driver,
    isLoading: state.drivers.isLoading
}), {getDriver})(DriverDetail);