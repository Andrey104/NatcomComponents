import React from 'react';
import {connect} from 'react-redux';

import SuppliesInfo from '../SupplyInfo';
import {addNewSupply} from '../../../AC/supplies';

class AddNewSupply extends React.Component {

    handleSubmit = supply => this.props.addNewSupply(supply);

    render() {
        return (
            <SuppliesInfo handleSubmit={this.handleSubmit}/>
        )
    }
}

export default connect(null, {addNewSupply})(AddNewSupply);