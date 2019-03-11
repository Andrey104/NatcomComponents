import * as React from "react";
import {ITEM_HISTORY_TYPE_ORDER, ITEM_HISTORY_TYPE_RETURN_ORDER, ITEM_HISTORY_TYPE_SUPPLY} from "../../../../constans";
import {countFormat, priceFormat} from "../../../../services/utils";
import './styles.css';
import itemHistory from "../../../../reducer/itemHistory";

export default class ItemHistoryCard extends React.Component {

    getHistoryType(itemHistory) {
        if (itemHistory.action === ITEM_HISTORY_TYPE_ORDER) {
            return 'Заказ'
        }
        if (itemHistory.action === ITEM_HISTORY_TYPE_SUPPLY) {
            return 'Поставка'
        }
        if (itemHistory.action === ITEM_HISTORY_TYPE_RETURN_ORDER) {
            return 'Возврат'
        }
    }

    getItemHistoryCardStyles(itemHistory) {
        if (itemHistory.action === ITEM_HISTORY_TYPE_ORDER) {
            return 'order'
        }
        if (itemHistory.action === ITEM_HISTORY_TYPE_SUPPLY) {
            return 'supply'
        }
        if (itemHistory.action === ITEM_HISTORY_TYPE_RETURN_ORDER) {
            return 'return-order'
        }
    }



    render() {
        const {itemHistory, handleClick} = this.props;
        return (
            <tr onClick={handleClick(itemHistory)}
                className={this.getItemHistoryCardStyles(itemHistory)}>
                <td>{itemHistory.date}</td>
                <td>{this.getHistoryType(itemHistory)}</td>
                <td>{itemHistory.performer.first_name} {itemHistory.performer.last_name}</td>
                <td>{countFormat(itemHistory.count)}</td>
                <td>{priceFormat(itemHistory.sum)} р</td>
            </tr>
        );
    }

}