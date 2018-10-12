import React from 'react';
import Switch from 'react-router-dom/es/Switch';
import Route from 'react-router-dom/es/Route';
import NavLink from 'react-router-dom/es/NavLink';
import {connect} from 'react-redux';

import ComponentMenu from '../../components/ComponentMenu/index';
import AssembliesPage from './assembliesPage/AssembliesPage';
import AssemblyDetail from './assemblyDetail/AssemblyDetail';
import AddNewAssembly from './assembliesPage/assembliesList/AddNewAssembly';
import '../styles.css';

class AssembliesRouter extends React.Component {
    render() {
        return (
            <div>
                <div className='breadcrumbs'>
                    {this.getMenu()}
                </div>
                <Switch>
                    <Route exact path='/assemblies' component={AssembliesPage}/>
                    <Route exact path='/assemblies/add_assembly' component={AddNewAssembly}/>
                    <Route exact path='/assemblies/:assemblyId' component={AssemblyDetail}/>
                </Switch>
            </div>
        )
    }

    getMenu() {
        let menu = (
            <NavLink to='/assemblies'>
                <span>Сборки</span>
            </NavLink>
        );

        if (this.props.match.url.indexOf('add_assembly') !== -1) {
            menu = (
                <ComponentMenu menu={menu} name={'Новая сборка'}/>
            );
        }
        else {
            const urlId = this.props.match.params.assemblyId;
            const {assembly} = this.props;
            if (urlId && assembly) {
                if (Number(urlId) === assembly.id) {
                    menu = <ComponentMenu menu={menu} name={assembly.name}/>;
                }
            }
        }
        return menu;
    }
}

export default connect((state) => ({
    assembly: state.assemblies.assembly,
}))(AssembliesRouter);
