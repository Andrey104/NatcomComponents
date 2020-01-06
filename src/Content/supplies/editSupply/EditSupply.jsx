import React, {Component} from 'react';
import {connect} from 'react-redux';

import SupplyEditingPage from '../SupplyEditingPage/SupplyEditingPage';
import {editSupply, getSupply} from '../../../AC/supplies';

class EditSupply extends Component {
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

    // componentDidMount = () => {
    //     this.urlId = this.props.match.params.supplyId;
    //     if (this.urlId) {
    //         this.props.getSupply(this.urlId);
    //     }
    // }

    handleSubmit = newSupply => {
        const {supply} = this.props;
        this.props.editSupply(supply.id, newSupply);
    };

    render() {
        return (
            <SupplyEditingPage supply={this.editSupply}
                               handleSubmit={this.handleSubmit}/>
        )
    }
}

export default connect(state => ({
    supply: state.supplies.supply
}), {editSupply, getSupply})(EditSupply);