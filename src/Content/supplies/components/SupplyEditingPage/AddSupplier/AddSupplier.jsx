import React, {Component} from 'react';
import {connect} from 'react-redux';

import AddSupplierDialog from './addSupplierDialog/AddSupplierDialog';
import {openModalWindow, closeModalWindow} from '../../../../../AC/modal';
import {OPEN_ADD_SUPPLIER} from '../../../../../constans';

class AddSupplier extends Component {
    supplier;

    constructor(props) {
        super(props);
        const {supplier} = this.props;
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
                <AddSupplierDialog header={'Выбрать поставщика'}
                                   supplierForSupply={this.selectedSupplier}
                                   close={this.closeDialog}/>
            )
        }
    };

    getCurrentSupplier() {
        if (this.supplier) {
            return <h3>Поставщик: {this.supplier.name}</h3>
        }
    };

    render() {
        return (
            <div>
                {this.getDialogWindow()}
                <button type="button"
                        onClick={() => this.props.openModalWindow(OPEN_ADD_SUPPLIER)}
                        className="btn btn-success btn-sm">Выбрать поставщика
                </button>
                {this.getCurrentSupplier()}
            </div>
        )
    }
}

export default connect(state => ({
    modal: state.modal.modal
}), {openModalWindow, closeModalWindow})(AddSupplier);
