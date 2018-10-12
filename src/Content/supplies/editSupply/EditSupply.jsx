import React from 'react';
import {connect} from 'react-redux';

import SupplyInfo from '../SupplyInfo';
import {editSupply} from '../../../AC/supplies';

class EditSupply extends React.Component {
    editSupply = {};

    constructor(props) {
        super(props);
        const {supply} = this.props;
        this.editSupply.supplier = supply.supplier;
        this.editSupply.items = supply.items.map(supplyArr => ({
            item: supplyArr.item,
            count: Number(supplyArr.count),
            purchasePrice: Number(supplyArr.purchase_price)
        }));
        this.editSupply.date = supply.date;
        this.editSupply.comment = supply.comment;
        this.editSupply.draft = supply.draft;
        this.editSupply.document = supply.document;
    }

    handleSubmit = newSupply => {
        const {supply} = this.props;
        this.props.editSupply(supply.id, newSupply);
    };

    render() {
        return (
            <SupplyInfo supply={this.editSupply}
                        handleSubmit={this.handleSubmit}/>
        )
    }
}

export default connect(state => ({
    supply: state.supplies.supply
}), {editSupply})(EditSupply);