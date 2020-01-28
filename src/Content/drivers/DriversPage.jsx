import React from 'react';
import Switch from "react-router-dom/es/Switch";
import Route from "react-router-dom/es/Route";
import NavLink from "react-router-dom/es/NavLink";
import {connect} from "react-redux";

import ComponentMenu from '../../components/ComponentMenu/ComponentMenu';
import DriversList from './driversList/DriversList';
import DriverDetail from './driverDetail/DriverDetail';
import styles from './styles.scss';


class DriversPage extends React.Component {

    getMenu() {
        let menu = (
            <NavLink to='/drivers'>
                <span>Водители</span>
            </NavLink>
        );
        const urlId = this.props.match.params.driverId;
        const {driver} = this.props;
        if (urlId && driver !== undefined) {
            if (Number(urlId) === driver.id) {
                const name = driver.first_name + ' ' + driver.last_name;
                menu = (
                    <ComponentMenu menu={menu} name={name}/>
                );
            }
        }
        return menu;
    }

    render() {
        const menu = this.getMenu();
        return (
            <div>
                <div className={styles["suppliers-menu"]}>
                    {menu}
                </div>
                <Switch>
                    <Route exact path='/drivers' component={DriversList}/>
                    <Route exact path='/drivers/:driverId' component={DriverDetail}/>
                </Switch>
            </div>
        )
    }
}

export default connect((state) => ({
    driver: state.drivers.driver,
}))(DriversPage);
