import React from 'react';

export default class extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        if (this.props.prices){
            this.setState({
                priceStandard: this.props.prices.priceStandard,
                priceGood: this.props.prices.priceGood,
                priceBest: this.props.prices.priceBest,
                priceIn: this.props.prices.priceIn,
            });
        }
    }

    state = {
        priceStandard: '',
        priceGood: '',
        priceBest: '',
        priceIn: ''
    };

    handleChangePricesState = event => {
        const name = event.target.name;
        const value = Number(event.target.value);
        this.setState({[name]: value}, () => this.props.selectPricesList(this.state));
    };

    render() {
        return (
            <div>
                <div className="form-group">
                    <label htmlFor="priceStandard"
                           className="required-area">Цена стандартная</label>
                    <input type="text"
                           placeholder="Введите стандартную цену"
                           defaultValue={this.state.priceStandard}
                           onChange={this.handleChangePricesState}
                           name="priceStandard"
                           className="form-control"
                           id="priceStandard"/>
                </div>
                <div className="form-group">
                    <label htmlFor="priceGood"
                           className="required-area">Цена средняя</label>
                    <input type="text"
                           placeholder="Введите среднюю цену"
                           defaultValue={this.state.priceGood}
                           name="priceGood"
                           onChange={this.handleChangePricesState}
                           className="form-control"
                           id="priceGood"/>
                </div>
                <div className="form-group">
                    <label htmlFor="priceBest"
                           className="required-area">Цена лучшая</label>
                    <input type="text"
                           placeholder="Введите лучшую цену"
                           defaultValue={this.state.priceBest}
                           name="priceBest"
                           onChange={this.handleChangePricesState}
                           className="form-control"
                           id="priceBest"/>
                </div>
                <div className="form-group">
                    <label htmlFor="priceIn"
                           className="required-area">Закупочная цена</label>
                    <input type="text"
                           placeholder=""
                           defaultValue={this.state.priceIn}
                           name="priceIn"
                           onChange={this.handleChangePricesState}
                           className="form-control"
                           id="priceIn"/>
                </div>
            </div>
        )
    }
}