import React, {Component} from 'react';
import {connect} from 'react-redux';

import SupplyEditingPage from '../SupplyEditingPage/SupplyEditingPage';
import {addNewSupply} from '../../../AC/supplies';

class AddNewSupply extends Component {

    handleSubmit = supply => this.props.addNewSupply(supply);

    render() {
        return (
            <SupplyEditingPage handleSubmit={this.handleSubmit}/>
        )
    }
}

export default connect(null, {addNewSupply})(AddNewSupply);