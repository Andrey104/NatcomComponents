import {getAllItemHistory} from "../../../AC/itemHistory";
import {mapToArr} from "../../../helpers";
import connect from "react-redux/es/connect/connect";
import React from "react";
import ItemHistoryCard from "./ItemHistoryCard/index";
import history from '../../../history';
import {ITEM_HISTORY_TYPE_ORDER, ITEM_HISTORY_TYPE_RETURN_ORDER, ITEM_HISTORY_TYPE_SUPPLY} from "../../../constans";

class ItemHistory extends React.Component {

    urlId;

    componentWillMount() {
        this.urlId = this.props.match.params.itemId;
        this.props.getAllItemHistory(this.urlId);
    };

    componentWillUnmount() {
        //TODO: Очистить store
    }


    getHistoryTableHead() {
        return (
            <tr>
                <th scope="col">Дата</th>
                <th scope="col">Тип</th>
                <th scope="col">Клиент/Поставщик</th>
                <th scope="col">Кол-во</th>
                <th scope="col">Цена</th>
                <th scope="col">Сумма</th>
            </tr>
        );
    }

    itemHistoryCardHandleClick = itemHistory => () => {
        if ((itemHistory.action === ITEM_HISTORY_TYPE_ORDER) || (itemHistory.action === ITEM_HISTORY_TYPE_RETURN_ORDER)) {
            history.push(`/orders/${itemHistory.action_id}/`);
        }
        if (itemHistory.action === ITEM_HISTORY_TYPE_SUPPLY) {
            history.push(`/supplies/${itemHistory.action_id}/`);
        }
    };


    getHistoryTableBody(histories) {
        if (!histories.length) {
            return (
                <tr>
                    <td colSpan='5'>История не найдена</td>
                </tr>
            );
        }
        return histories.map((itemHistory, index) => (
                <ItemHistoryCard key={itemHistory.action_id}
                                 itemHistory={itemHistory}
                                 handleClick={this.itemHistoryCardHandleClick}/>
            )
        );
    }


    render() {
        return (
            <div className="row">
                <div className="col-12">
                    <table className="table table-hover table-bordered">
                        <thead className="thead-light">
                        {this.getHistoryTableHead()}
                        </thead>
                        <tbody>
                        {this.getHistoryTableBody(this.props.histories)}
                        </tbody>
                    </table>
                </div>
            </div>

        );
    }
}

export default connect((state) => ({
    histories: mapToArr(state.itemHistories.entries),
}), {
    getAllItemHistory
})(ItemHistory);