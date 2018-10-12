import React from 'react';

export default class extends React.Component {

    serverItems = [];

    handleItemsState = (event, index, state) => {
        this.serverItems[index][state] = event.target.value;
        this.props.addItems(this.serverItems);
    };

    getProducts(items) {
        return items.map((item, index) => {
                this.serverItems.push({item: item.id});
                console.log(this.serverItems);
                return (
                    <div key={item.item}
                         className="col-4">
                        <div>{item.name}</div>
                        <div>{item.vendor_code}</div>
                        <div className="form-group">
                            <label>Количество товара</label>
                            <input className="form-control"
                                   onChange={(e) => this.handleItemsState(e, index, 'count')}/>
                        </div>
                        <div className="form-group">
                            <label>Закупочная цена</label>
                            <input className="form-control"
                                   onChange={(e) => this.handleItemsState(e, index, 'purchase_price')}/>
                        </div>
                    </div>
                )
            }
        )
    }

    render() {
        const {items} = this.props;
        if (!items) {
            return null;
        }
        return (
            <div className="col-12">
                <div className="row">
                    {this.getProducts(items)}
                </div>
            </div>
        )
    }
}
