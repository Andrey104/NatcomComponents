import React from 'react';
import classNames from 'classnames/bind';
import {connect} from 'react-redux';

import DialogWindow from '../DialogWindow';
import Loader from '../Loader';
import {getAllMembranes} from '../../AC/membranes';
import {mapToArr} from '../../helpers';
import styles from './styles.css';
import ItemsList from "../../components/ItemList/ItemList";
import MembranesFilters from '../../components/MembranesFilters';

let cx = classNames.bind(styles);

class AddMembranesDialog extends React.Component {
    items = [];

    componentWillMount = () => {
    };

    handleSubmit = (item) => {
        this.props.selectedMembranes(item);
    };

    render() {
        return (
            <div>
                <div className='modal-body'>
                    <div className="row">
                        <div className="col-12 col-md-3">
                            <MembranesFilters/>
                        </div>
                        <div className="col-12 col-md-9 list-container">
                            <ItemsList client={this.props.client}
                                       handleSubmit={this.handleSubmit}
                                       membraneMode={true}
                                       harpoonMode = {true}
                                       selectMode={true}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default DialogWindow(AddMembranesDialog);