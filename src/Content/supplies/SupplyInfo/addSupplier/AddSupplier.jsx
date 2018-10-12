import React from 'react';
import {connect} from 'react-redux';

import AddSupplierDialog from './addSupplierDialog/AddSupplierDialog';
import {openModalWindow, closeModalWindow} from '../../../../AC/modal';
import {OPEN_ADD_SUPPLIER} from '../../../../constans';

class AddSupplier extends React.Component {
    supplier;

    constructor(props) {
        super(props);
        const {supplier} = this.props;
        console.log(supplier);
        this.supplier = supplier;
    }

    selectedSupplier = supplier => {
        this.supplier = supplier;
        this.closeDialog();
        this.props.selectedSupplier(this.supplier);
    };

    closeDialog = () => this.props.closeModalWindow();

    getDialogWindow() {
        const {modal} = this.props;
        if (modal === OPEN_ADD_SUPPLIER) {
            return (
                <AddSupplierDialog header={'Добавить поставщика'}
                                   supplierForSupply={this.selectedSupplier}
                                   close={this.closeDialog}/>
            )
        }
    };

    getCurrentSupplier() {
        if (this.supplier) {
            return <h3>Сейчас выбран: {this.supplier.name}</h3>
        }
    };

    render() {
        return (
            <div>
                {this.getDialogWindow()}
                <button type="button"
                        onClick={() => this.props.openModalWindow(OPEN_ADD_SUPPLIER)}
                        className="btn btn-success btn-sm">Добавить поставщика
                </button>
                {this.getCurrentSupplier()}
            </div>
        )
    }
}

export default connect(state => ({
    modal: state.modal.modal
}), {openModalWindow, closeModalWindow})(AddSupplier);
