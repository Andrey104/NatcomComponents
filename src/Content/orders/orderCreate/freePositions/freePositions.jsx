import React from 'react';
import connect from "react-redux/es/connect/connect";

class FreePositions extends React.Component {

}

export default connect((state) => ({
    freePositions: state.orders.orderSave,
}), {saveOrderInfoInStore, saveHarpoon, deleteItemsFromStore})(FreePositions);