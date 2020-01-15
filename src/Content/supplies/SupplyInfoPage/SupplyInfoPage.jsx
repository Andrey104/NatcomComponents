import React, {Component} from 'react';
import {connect} from 'react-redux';

import Loader from '../../../components/Loader';
import ItemCardInSupply from './ItemCardInSupply/ItemCardInSupply';
import TableResultRow from '../../../components/TableResultRow';
import {getSupply, fromDraft} from '../store/AC/supplies';
import {priceFormat, getDate} from '../../../services/utils';
import history from '../../../history';
import {ITEM_MEMBRANE, ITEM_PRODUCT} from "../../../constans";

export class SupplyInfoPage extends Component {
    urlId;
    resultSupplyPrice;

    componentWillMount = () => {
    this.urlId = this.props.match.params.supplyId;
        this.props.getSupply(this.urlId);
    };

    getDraft = draft => draft ? <div>Черновик</div> : null;

    getComment = comment => comment ? <span>Комментарий: {comment}</span> : null;

    getButtonFromDraft = supply => {
        if (supply.draft) {
            return (
                <div className="text-right">
                    <button type="button"
                            onClick={() => this.props.fromDraft(supply.id)}
                            className="btn btn-success btn-sm">Провести
                    </button>
                    <button type="button"
                            onClick={() => history.push(`/supplies/${this.urlId}/edit`)}
                            className="btn btn-primary btn-sm">Редактировать
                    </button>
                </div>
            );
        }
    };

    getItemPrice(inItem) {
        let item = inItem.item;
        if (item.type === ITEM_PRODUCT) {
            return inItem.count * inItem.purchase_price;
        }
        if (item.type === ITEM_MEMBRANE) {
            return inItem.count * inItem.purchase_price * item.width;
        }
    };

    getItems() {
        const {items} = this.props.supply;
        this.resultSupplyPrice = 0;
        return items.map((item, index) => {
            const itemPrice = this.getItemPrice(item);
            this.resultSupplyPrice += itemPrice;
            return (
                <ItemCardInSupply key={String(item.item.item) + String(index)}
                                  item={item}
                                  number={++index}/>
            )
        });
    }

    getItemsTable() {
        return (
            <table className="table table-hover table-bordered">
                <thead className="thead-light">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Артикул</th>
                        <th scope="col">Название</th>
                        <th scope="col">Количество</th>
                        <th scope="col">Сумма</th>
                        <th scope="col">Итог</th>
                    </tr>
                </thead>
                <tbody>
                    {this.getItems()}
                    <TableResultRow columnCount={6}
                                    resultPrice={this.resultSupplyPrice}/>
                </tbody>
            </table>
        )
    };

    render() {
        const {supply} = this.props;
        if (supply.id !== Number(this.urlId)) {
            return (
                <div className="pre-loader-container">
                    <Loader/>
                </div>
            );
        }
        return (
            <div>
                <div>Поставщик: {supply.supplier.name}</div>
                <div>Цена: {priceFormat(supply.cost)}</div>
                <div>{this.getDraft(supply.draft)}</div>
                <div>Дата поставки товара: {getDate(supply.date)}</div>
                <div>Дата добавления в систему: {getDate(supply.auto_date)}</div>
                <div>{this.getComment(supply.comment)}</div>
                <div>Добавил: {supply.user.username}</div>
                {this.getItemsTable()}
                {this.getButtonFromDraft(supply)}
            </div>
        )
    }
}

export default connect((state) => ({
    supply: state.supplies.supply,
    isLoading: state.supplies.isLoading
}), {getSupply, fromDraft})(SupplyInfoPage);