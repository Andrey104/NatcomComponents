import React from 'react';
import classNames from 'classnames/bind';

import styles from './styles.css';

/**
 * Modal Window Component
 * **/

export default NewComponent => class extends React.Component {

    close = () => this.props.close();

    render() {
        const {header} = this.props;
        return (
            <div className='modal show open'>
                <div className='modal-dialog modal-dialog-centered modal-dialog-content'>
                    <div className="modal-content">
                        <form>
                            <div className="modal-header">
                                <h5 className="modal-title">{header}</h5>
                                <button type="button" className="close"
                                        onClick={this.close}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <NewComponent {...this.props}/>
                        </form>
                    </div>
                </div>
                <div className='modal'
                     onClick={this.close}>
                </div>
            </div>
        )
    }
}

