import React from 'react';
import {connect} from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Main.css';

import Header from '../Header/Header';
import Menu from '../Menu';
import Content from '../Content';
import {TABLET_DISPLAY_WIGHT} from '../services/utils';
import {getCurrentUser} from "../AC/currentUser";
import Modals from "../Content/Modals/Modals";

class Main extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            menuIsOpen: false,
            mobile: false
        };
    }

    menuClick() {
        this.setState({
            menuIsOpen: !this.state.menuIsOpen
        });
    }

    menuAutoClose() {
        if (this.state.mobile && this.state.menuIsOpen) {
            this.setState({
                menuIsOpen: false
            });
        }
    }


    updateDimensions = () => {

        if (window.screen.availWidth < TABLET_DISPLAY_WIGHT) {
            this.setState({
                mobile: true,
                menuIsOpen: false
            })
        }
        if (window.screen.availWidth > TABLET_DISPLAY_WIGHT) {
            this.setState({
                mobile: false,
                menuIsOpen: true
            })
        }
    };

    componentDidMount() {
        this.props.getCurrentUser();
        this.updateDimensions();
        window.addEventListener("resize", this.updateDimensions);
    }

    render() {
        return (
            <div>
                <div className='header'>
                    <Header history={this.props.history}
                            mobile={this.state.mobile}
                            onMenuOpen={this.menuClick.bind(this)}/>
                </div>
                <div className='row main-row'>
                    <Menu isOpen={this.state.menuIsOpen}
                          onMenuClose={this.menuAutoClose.bind(this)}
                          mobile={this.state.mobile}/>
                    <div className='col main-container'
                         id='mainContent'
                         onClick={this.menuAutoClose.bind(this)}>
                        <Content/>
                        <Modals/>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect((state) => ({
    user: state.currentUser,
}), {getCurrentUser})(Main)
