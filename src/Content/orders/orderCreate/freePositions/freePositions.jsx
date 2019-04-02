import React from 'react';
import connect from "react-redux/es/connect/connect";
import {createFreePosition} from "../../../../AC/orders";
import FreePositionsList from '../freePositions/FreePositionsList';
import PropTypes from 'prop-types';


/**
 * Free Positions in create order Component
 * **/
class FreePositions extends React.Component {

    static propTypes = {
        freePositions: PropTypes.object,
    };

    constructor(props) {
        super(props);
        this.state = {
            freePositionsEditModalOpen: false
        };
    }

    handleAddFreePosition = () => {
        this.setState({
            freePositionsEditModalOpen: true
        });

    };

    closeFreePositionEditModal = () => {
        this.setState({
            freePositionsEditModalOpen: false
        });
    };

    removeFreePositionFromList = freePosition => {
        // this.harpoonsResultPrice -= harpoon.resultHarpoonPrice;
        // const newHarpoonsList = this.state.harpoons.filter(harpoonArr => harpoonArr.id !== harpoon.id);
        // this.setState({harpoons: newHarpoonsList});
    };

    getFreePositionEditDialogWindow() {
        let dialogWindow = null;
        if (this.state.freePositionsEditModalOpen) {
            dialogWindow = <EditFreePositionModal/>
        }
        return dialogWindow;
    }


    getFreePositionsList() {
        const {freePositions} = this.props;

            return (
                <div className="harpoons col-12">
                    <FreePositionsList freePositions={[]}
                                       freePositionsResultPrice={0.00}
                                       removeFreePositionsFromList={this.removeFreePositionFromList}/>
                    <div className="col-sm-12">
                        <button type="button"
                                onClick={this.handleAddFreePosition}
                                className="btn btn-primary btn-sm">Добавить позицию
                        </button>
                    </div>
                </div>
            );
    }

    render() {
        return (
            <div>
                {this.getFreePositionsList()}
                {this.getFreePositionEditDialogWindow()}
            </div>
        )
    }

}

export default connect((state) => ({
    freePositions: state.orders.orderSave,
}), {createFreePosition,})(FreePositions);