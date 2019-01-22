import React from 'react';

import AddSupplier from './addSupplier/AddSupplier';
import AddSupplyInfo from './AddSupplyInfo';
import AddItems from './addItems/AddItems';
import {getDateForServer} from '../../../services/utils';

export default class extends React.Component {
    btnText = 'Добавить';

    constructor(props) {
        super(props);
        const {supply} = this.props;
        this.state = {
            supplier: null,
            document: '',
            comment: null,
            date: '',
            draft: false,
            items: []
        };
        if (supply) {
            this.state = supply;
            this.btnText = 'Изменить';
        }
    }

    selectedSupplier = supplier => this.setState({supplier});

    handleChangeSupply = (value, state) => this.setState({[state]: value});

    selectedItems = items => this.setState({items});

    handleSubmit = () => {
        const newSupply = this.state;
        newSupply.supplier = this.state.supplier.id;
        newSupply.date = getDateForServer(this.state.date);
        newSupply.items = this.state.items.map(item => ({
                item: item.item.item,
                count: item.count,
                purchase_price: item.purchasePrice
            }
        ));
        this.props.handleSubmit(newSupply);
    };

    getDisabledState() {
        const {supplier, date, items} = this.state;
        if (!supplier || !date || !items.length) {
            return true;
        } else if (items.length) {
            for (const item of items) {
                if (!item.count || !item.purchasePrice)
                    return true;
            }
        }
        return false;
    }

    render() {
        return (
            <div>
                <AddSupplier selectedSupplier={this.selectedSupplier}
                             supplier={this.state.supplier}/>
                <AddSupplyInfo handleChangeSupply={this.handleChangeSupply}
                               supply={this.state}/>
                <AddItems items={this.state.items}
                          selectedItems={this.selectedItems}/>

                <div className="col-sm-12 text-right">
                    <button type="button"
                            onClick={this.handleSubmit}
                            disabled={this.getDisabledState()}
                            className="btn btn-primary pull-right">{this.btnText}
                    </button>
                </div>
            </div>
        )
    }
}
