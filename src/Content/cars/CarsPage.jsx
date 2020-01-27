import React from 'react';
import Switch from "react-router-dom/es/Switch";
import Route from "react-router-dom/es/Route";
import NavLink from "react-router-dom/es/NavLink";
import {connect} from "react-redux";

import ComponentMenu from '../../components/ComponentMenu/ComponentMenu';
import CarsList from './carsList/CarsList';
import CarDetail from './carDetail/CarDetail';
import '../styles.css';


class CarsPage extends React.Component {

    getMenu() {
        let menu = (
            <NavLink to='/cars'>
                <span>Машины</span>
            </NavLink>
        );
        const urlId = this.props.match.params.carId;
        const {car} = this.props;
        if (urlId && car !== undefined) {
            if (Number(urlId) === car.id) {
                const name = car.name + ' ' + car.number;
                menu = (
                    <ComponentMenu menu={menu} name={name}/>
                );
            }
        }
        return menu;
    }

    render() {
        return (
            <div>
                <div className='breadcrumbs'>
                    {this.getMenu()}
                </div>
                <Switch>
                    <Route exact path='/cars' component={CarsList}/>
                    <Route exact path='/cars/:carId' component={CarDetail}/>
                </Switch>
            </div>
        )
    }
}

export default connect((state) => ({
    car: state.cars.car,
}))(CarsPage);
