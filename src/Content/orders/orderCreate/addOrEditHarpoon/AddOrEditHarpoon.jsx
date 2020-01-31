import React from 'react';
import {connect} from 'react-redux';

import HarpoonInfo from '../../../harpoons/harpoonInfo/HarpoonInfo';
import {saveHarpoonInOrder} from '../../../../AC/harpoons';
import {editOrderHarpoon} from '../../store/actions/orders';
import history from '../../../../history';

class AddOrEditHarpoon extends React.Component {
    harpoon;
    backUrl = '/orders/add_order';

    handleAddNewHarpoon = () => {
        this.props.saveHarpoonInOrder(this.harpoon);
        history.replace(this.backUrl);
    };

    handleEditHarpoon = () => {
        const {harpoonSave} = this.props;
        this.props.editOrderHarpoon(harpoonSave.harpoon.id, this.harpoon);
        history.replace('/orders/' + harpoonSave.harpoon.order + '/edit');
    };

    handleSubmit = harpoon => {
        const {harpoonSave} = this.props;
        this.harpoon = harpoon;
        harpoonSave.harpoon ? this.handleEditHarpoon() : this.handleAddNewHarpoon();
    };

    render() {
        return (
            <HarpoonInfo handleSubmit={this.handleSubmit}
                         backUrl={this.backUrl}/>
        )
    }
}

export default connect(state => ({
    harpoonSave: state.harpoons.harpoonSave,
}), {saveHarpoonInOrder, editOrderHarpoon})(AddOrEditHarpoon);