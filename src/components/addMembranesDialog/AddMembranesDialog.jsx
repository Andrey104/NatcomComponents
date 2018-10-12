import React from 'react';
import classNames from 'classnames/bind';
import {connect} from 'react-redux';

import DialogWindow from '../DialogWindow';
import Loader from '../Loader';
import {getAllMembranes} from '../../AC/membranes';
import {mapToArr} from '../../helpers';
import styles from './styles.css';

let cx = classNames.bind(styles);

class AddMembranesDialog extends React.Component {
    items = [];

    componentWillMount = () => {
        const {client} = this.props;
        if (client) this.props.getAllMembranes(`?client=${client.id}&harpoon=True`);
    };

    getCheckBoxValue = (currentMembranes, membraneId) => {
        const checkMembrane = currentMembranes.find(membrane => membrane.membrane.id === membraneId);
        return !!checkMembrane;
    };

    handleSelectMembrane = (event, membrane) => {
        if (event.target.checked) {
            this.items.push(membrane);
        } else {
            this.items = this.items.filter(
                (arrMembrane) => arrMembrane.id !== membrane.id
            )
        }
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.selectedMembranes(this.items);
    };

    close = () => this.props.close();

    getMembranes(membranes) {
        const {currentMembranes} = this.props;
        if (membranes.length > 0) {
            return membranes.map(membrane => (
                <tr key={membrane.item}>
                    <td>{membrane.name}</td>
                    <td>{membrane.vendor_code}</td>
                    <td>
                        <input type="checkbox"
                               defaultChecked={this.getCheckBoxValue(currentMembranes, membrane.id)}
                               onChange={e => this.handleSelectMembrane(e, membrane)}/>
                    </td>
                </tr>
            ))
        }
    }

    render() {
        const {membranes, isLoading} = this.props;
        if (membranes.length === 0 || isLoading) {
            return <Loader/>
        }
        return (
            <div>
                <div className={cx('modal-body', 'content')}>
                    <table className="table">
                        <thead>
                        <tr>
                            <th scope="col">Название</th>
                            <th scope="col">Артикул</th>
                            <th scope="col">Выбрать</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.getMembranes(membranes)}
                        </tbody>
                    </table>
                </div>
                <div className="modal-footer">
                    <button type="button"
                            onClick={this.close}
                            className="btn btn-secondary">Закрыть
                    </button>
                    <button type="submit"
                            onClick={this.handleSubmit}
                            className="btn btn-primary">Добавить
                    </button>
                </div>
            </div>
        )
    }
}

export default DialogWindow(connect((state) => ({
    membranes: mapToArr(state.membranes.entries),
    isLoading: state.membranes.isLoading
}), {getAllMembranes})(AddMembranesDialog));