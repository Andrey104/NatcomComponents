import React from 'react';
import classNames from 'classnames/bind';

import DialogWindow from '../../../../../components/ModalWindow/index';
import SuppliersList from '../../../../suppliers/suppliersPage/suppliersList/SuppliersList';
import styles from './styles.scss';

let cx = classNames.bind(styles);

class AddSupplierDialog extends React.Component {

    render() {
        return (
            <div className={cx('modal-body')}>
                <SuppliersList match={this.props.match}
                               supplierForSupply={this.props.supplierForSupply}/>
            </div>
        )
    }
}

export default DialogWindow(AddSupplierDialog);