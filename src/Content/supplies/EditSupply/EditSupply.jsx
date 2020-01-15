import React, {Component} from 'react';
import {connect} from 'react-redux';

import SupplyEditingPage from '../SupplyEditingPage/SupplyEditingPage';
import {editSupply, getSupply} from '../store/actions/supplies';
import Loader from "../../../components/Loader";

class EditSupply extends Component {

    componentDidMount () {
        const urlId = this.props.match.params.supplyId
        if (urlId) this.props.getSupply(urlId);
    };

    handleSubmit = newSupply => this.props.editSupply(this.props.supply.id, newSupply);

    render() {
        if (!Object.keys(this.props.supply).length) {
            return (
                <div className="pre-loader-container">
                    <Loader />
                </div>
            );
        }
        return ( <SupplyEditingPage handleSubmit={this.handleSubmit}
                                    supply={this.props.supply} />)
    }
}

export default connect(state => ({
    supply: state.supplies.supply
}), {editSupply, getSupply})(EditSupply);