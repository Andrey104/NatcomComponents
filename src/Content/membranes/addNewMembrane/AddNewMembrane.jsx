import React from 'react';
import {connect} from 'react-redux';

import PricesList from '../../../components/addNewItem/PricesList';
import Loader from '../../../components/Loader';
import AddStocksDialog from '../../../components/AddStocksDialog/AddStocksDialog';
import ItemStocks from '../../../components/addNewItem/ItemStocks';
import ItemImages from '../../../components/addNewItem/ItemImages';
import {BaseApi} from '../../../services/base';
import {getAllColors, getAllTextures} from '../../../AC/parameters';
import {mapToArr} from '../../../helpers';
import './styles.css';

class AddNewMembrane extends React.Component {
    baseApi = new BaseApi();
    cutsPrices;
    harpoonPrices;
    stocks;
    defaultColor;
    defaultTexture;

    state = {
        name: '',
        harpoon: false,
        barcode: '',
        width: '',
        openAddStocksDialog: false,
        color: undefined,
        texture: undefined,
        stocks: [],
        images: []
    };

    componentWillMount = () => {
        this.props.getAllColors();
        this.props.getAllTextures();
    };

    handleChangeMembrane = event => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({[name]: value});
    };

    handleChangeMembraneHarpoon = event => {
        this.setState({harpoon: Boolean(event.target.checked)});
    };

    selectCutPrices = prices => this.cutsPrices = prices;

    selectHarpoonPrices = prices => this.harpoonPrices = prices;

    addStocks = stocks => {
        this.setState({
            openAddStocksDialog: !this.state.openAddStocksDialog,
            stocks
        });
        this.stocks = stocks.map(stock => ({stock: stock.id}));
    };

    addStocksState = () => this.setState({openAddStocksDialog: !this.state.openAddStocksDialog});

    addItemStocks = (value, index, state) => {
        this.stocks[index][state] = Number(value);
    };

    handleMembraneImages = images => this.setState({images});

    handleSubmit = event => {
        event.preventDefault();
        const newMembrane = this.getNewMembrane();
        this.baseApi
            .post(`items/membranes/`, newMembrane)
            .then(response => this.props.history.push(`/membranes/${response.data.id}`));
    };

    getNewMembrane() {
        const newMembrane = {
            name: this.state.name,
            width: this.state.width,
            price_standard: this.cutsPrices.priceStandard,
            price_best: this.cutsPrices.priceBest,
            price_good: this.cutsPrices.priceGood,
            can_harpoon: this.state.harpoon,
            stocks: this.stocks,
            add_images: this.state.images
        };
        if (this.state.harpoon) {
            newMembrane.price_standard_harpoon = this.harpoonPrices.priceStandard;
            newMembrane.price_best_harpoon = this.harpoonPrices.priceBest;
            newMembrane.price_good_harpoon = this.harpoonPrices.priceGood;
        }
        newMembrane.color = this.state.color || this.defaultColor;
        newMembrane.texture = this.state.texture || this.defaultTexture;
        newMembrane.barcode = this.state.barcode ? this.state.barcode : null;
        return newMembrane;
    }

    getDefaultValues() {
        const {colors, textures} = this.props;
        this.defaultColor = colors[0].id;
        this.defaultTexture = textures[0].id;
    }

    checkForm() {
        if (!this.state.name || !this.state.width) {
            return true;
        }
    }

    getDialogWindow() {
        if (this.state.openAddStocksDialog) {
            return (
                <AddStocksDialog header={'Добавить склады'}
                                 addStocks={this.addStocks}
                                 close={this.addStocksState}/>
            );
        }
    }

    getHarpoonPrices() {
        if (this.state.harpoon) {
            return (
                <div className="col-6">
                    <h5>Гарпун</h5>
                    <PricesList selectPricesList={this.selectHarpoonPrices}/>
                </div>
            );
        }
    }

    render() {
        const {colors, textures} = this.props;
        if (colors.length === 0 || textures.length === 0) {
            return (
                <div className="pre-loader-container">
                    <Loader/>
                </div>
            );
        }
        const dialogWindow = this.getDialogWindow();
        this.getDefaultValues();
        return (
            <form onSubmit={this.handleSubmit}
                  className="col-12">
                {dialogWindow}
                <div className="row">
                    <div className="col-6">
                        <div className="form-group row">
                            <label htmlFor="name"
                                   className="required-area col-sm-3 col-form-label">Название</label>
                            <div className="col-sm-9">
                                <input type="text"
                                       id="name"
                                       name="name"
                                       defaultValue={this.state.name}
                                       placeholder="Введите название полотна"
                                       onChange={this.handleChangeMembrane}
                                       className="form-control"/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="barcode"
                                   className="col-sm-3 col-form-label">Баркод</label>
                            <div className="col-sm-9">
                                <input type="text"
                                       id="barcode"
                                       name="barcode"
                                       defaultValue={this.state.barcode}
                                       placeholder="Введите баркод"
                                       onChange={this.handleChangeMembrane}
                                       className="form-control"/>
                            </div>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-group row">
                            <label htmlFor="width"
                                   className="required-area col-sm-3 col-form-label">Ширина</label>
                            <div className="col-sm-9">
                                <input type="text"
                                       defaultValue={this.state.width}
                                       placeholder="Введите ширину полотна"
                                       name="width"
                                       onChange={this.handleChangeMembrane}
                                       className="form-control"
                                       id="width"/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="required-area col-sm-3 col-form-label">Цвет</label>
                            <div className="col-sm-9">
                                <select className="form-control"
                                        onChange={this.handleChangeMembrane}
                                        name="color"
                                        defaultValue={this.defaultColor.id}>
                                    {colors.map(color => (
                                        <option value={color.id}
                                                key={color.id}>{color.description}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="required-area col-sm-3 col-form-label">Фактура</label>
                            <div className="col-sm-9">
                                <select className="form-control"
                                        name="texture"
                                        onChange={this.handleChangeMembrane}
                                        defaultValue={this.defaultTexture.id}>
                                    {textures.map(texture => (
                                        <option value={texture.id}
                                                key={texture.id}>{texture.description}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="form-group form-check">
                    <input type="checkbox"
                           className="form-check-input"
                           onChange={this.handleChangeMembraneHarpoon}
                           id="harpoon"/>
                    <label className="form-check-label"
                           htmlFor="harpoon">Можно использовать в гарпуне</label>
                </div>
                <div className="row">
                    <div className="col-6">
                        <h5>Отрезы</h5>
                        <PricesList selectPricesList={this.selectCutPrices}/>
                    </div>
                    {this.getHarpoonPrices()}
                </div>
                <button type="button"
                        className="btn btn-primary btn-sm"
                        onClick={this.addStocksState}>Добавить склады
                </button>
                <ItemStocks stocks={this.state.stocks}
                            addItemStocks={this.addItemStocks}/>
                <ItemImages handleItemImages={this.handleMembraneImages}/>
                <div className="text-right">
                    <button type="submit"
                            disabled={this.checkForm()}
                            className="btn btn-primary">Добавить полотно
                    </button>
                </div>
            </form>
        )
    }
}

export default connect((state) => ({
    colors: mapToArr(state.parameters.colors),
    textures: mapToArr(state.parameters.textures),
}), {getAllColors, getAllTextures})(AddNewMembrane);