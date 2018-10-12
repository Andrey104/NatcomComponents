import React from 'react';
import Switch from 'react-router-dom/es/Switch';
import Route from 'react-router-dom/es/Route';
import NavLink from 'react-router-dom/es/NavLink';
import {connect} from 'react-redux';

import ComponentMenu from '../../components/ComponentMenu';
import HarpoonPage from './harpoonsPage/HarpoonsPage';
import HarpoonDetail from './harpoonDetail/HarpoonDetail';
import EditHarpoon from './editHarpoon/EditHarpoon';

class MembranesRouter extends React.Component {

    getMenu() {
        let menu = (
            <NavLink to='/harpoons'>
                <span>Гарпуны</span>
            </NavLink>
        );
        const urlId = this.props.match.params.harpoonId;
        const {harpoon} = this.props;
        const isEditHarpoon = this.props.match.url.indexOf('edit') !== -1;
        if (Number(urlId) === harpoon.id) {
            const name = !isEditHarpoon
                ? <span>{harpoon.status}</span>
                : <NavLink to={`/harpoons/${harpoon.id}`}>{harpoon.status}</NavLink>;
            menu = (
                <ComponentMenu menu={menu} name={name}/>
            );
        }
        if (isEditHarpoon) {
            menu = (
                <ComponentMenu menu={menu} name='Редактирование'/>
            );
        }
        return menu;
    }

    render() {
        const menu = this.getMenu();
        return (
            <div>
                <div className="breadcrumbs">
                    {menu}
                </div>
                <Switch>
                    <Route exact path='/harpoons' component={HarpoonPage}/>
                    <Route exact path='/harpoons/:harpoonId' component={HarpoonDetail}/>
                    <Route exact path='/harpoons/:harpoonId/edit' component={EditHarpoon}/>
                </Switch>
            </div>
        )
    }
}

export default connect((state) => ({
    harpoon: state.harpoons.harpoon,
}))(MembranesRouter);