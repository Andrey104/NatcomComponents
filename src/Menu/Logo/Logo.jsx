import React from 'react';
import './Logo.css'

class Logo extends React.Component {

    render() {
        return(
            <div className="logo row">
                <div className="col-3 logo-icon">
                    <img alt='logo-min' src='/public/logo-min.png'/>
                </div>
                <div className="col-9 logo-text">
                    <h5>Все полотна</h5>
                </div>
            </div>
        );
    }
}

export default Logo;