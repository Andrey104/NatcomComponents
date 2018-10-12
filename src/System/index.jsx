import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './styles.css';
import classNames from 'classnames/bind';

import Header from '../Header';
import Menu from '../Menu';
import Content from '../Content';
import {MOBILE_DISPLAY, PC_DISPLAY, TABLET_DISPLAY_WIGHT} from '../services/utils';

export default class extends React.Component {

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


    updateDimensions() {
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
    }

    componentDidMount() {
        this.updateDimensions();
        window.addEventListener("resize", this.updateDimensions.bind(this));
    }

    render() {
        return (
            <div>
                <div className='header'>
                    <Header history={this.props.history}
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
                    </div>
                </div>
            </div>
        )
    }
}
