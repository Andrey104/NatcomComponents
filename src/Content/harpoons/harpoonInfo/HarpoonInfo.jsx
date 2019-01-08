import React from 'react';
import {connect} from 'react-redux';

import AddMembranes from './AddMembranes/index';
import AddServices from './AddServices/index';
import AddProduct from './AddProduct/index';
import AddFiles from './AddFiles/index';
import Loader from '../../../components/Loader';
import CommentField from '../../../components/CommentField';
import ResultParameters from './ResultParameters';
import {getAllProducts} from '../../../AC/products';
import {deleteItemsFromStore} from '../../../AC/items';
import {mapToArr} from '../../../helpers';
import history from '../../../history';
import './styles.css';
import {getMembranePrice} from "../../../services/utils";

class HarpoonInfo extends React.Component {
    comment = null;
    membranesPrice = 0;
    servicesPrice = 0;
    resultHarpoonPrice;
    product;
    btnText = 'Добавить';

    constructor(props) {
        super(props);
        const {harpoonSave} = this.props;
        if (harpoonSave.harpoon) {
            const {harpoon} = harpoonSave;
            this.comment = harpoon.comment;
            this.membranesPrice = harpoon.membranesPrice;
            this.servicesPrice = harpoon.servicesPrice;
            this.product = harpoon.product;
            this.state = {
                membranes: harpoon.membranes,
                services: harpoon.services,
                files: harpoon.files,
                openDialogWindow: false,
            };
            this.btnText = 'Изменить';
        } else {
            this.state = {
                membranes: [],
                services: [],
                files: [],
                openDialogWindow: false
            };
        }
        this.calc();
    }

    componentDidMount = () => {
        const {harpoonSave, getAllProducts} = this.props;
        if (harpoonSave) {
            const filters = {
                searchText: null,
                category: null,
                subcategory: null,
                harpoon: true
            };
            getAllProducts(filters, harpoonSave.client);
        }
        if (harpoonSave.client === null || harpoonSave.client === undefined) {
            history.push(`/orders/add_order`);
        }
    };

    addMembranes = (membranes, membranesPrice) => {
        this.setState({membranes});
        this.membranesPrice = membranesPrice;
    };

    addServices = (services, servicesPrice) => {
        this.setState({services});
        this.servicesPrice = servicesPrice;
    };

    addProduct = product => this.product = product;

    addFiles = files => this.setState({files});

    addComment = comment => this.comment = comment;

    dialogWindowState = () => this.setState({openDialogWindow: !this.state.openDialogWindow});

    handleCancel = () => history.push(this.props.backUrl);

    handleSubmit = event => {
        event.preventDefault();
        const {harpoonProducts} = this.props;
        const newHarpoon = this.state;
        newHarpoon.product = this.product ? this.product : harpoonProducts[0].id;
        newHarpoon.comment = this.comment;
        newHarpoon.resultHarpoonPrice = this.resultHarpoonPrice;
        newHarpoon.membranesPrice = this.membranesPrice;
        newHarpoon.servicesPrice = this.servicesPrice;
        newHarpoon.id = Date.now();
        this.props.handleSubmit(newHarpoon);
    };

    checkForm() {
        // const {membranes, services} = this.state;
        // if (!membranes.length) {
        //     return true;
        // } else if (membranes.length > 1) {
        //     const seam = services.find(service => service.service.type === 1);
        //     if (!seam)
        //         return true;
        // }
        return false;
    }


    getHarpoonSize(membranes, services) {
        let harpoonSize = 0;
        for (const membrane of membranes) {
            harpoonSize += (Number(membrane.membrane.width) + membrane.count) * 2;
        }
        if (services.length) {
            for (const service of services) {
                if (service.service.type === 1) {
                    harpoonSize -= 2 * service.count;
                } else if (service.service.type === 2) {
                    harpoonSize += service.count;
                }
            }
        }
        return harpoonSize;
    }

    getAddServices(harpoonSave) {
        return (
            <AddServices dialogWindowState={this.dialogWindowState}
                         harpoon={harpoonSave.harpoon}
                         addServices={this.addServices}
                         client={harpoonSave.client}/>
        );
    }

    getResultParameters() {
        if (this.state.membranes.length) {
            this.resultHarpoonPrice = this.membranesPrice + this.servicesPrice;
            return (
                <ResultParameters resultHarpoonPrice={this.resultHarpoonPrice}/>
            )
        }
    };

    getServiceResultPrice(services) {
        let resultPrice = 0;
        for (const service of services) {
            resultPrice += service.price * services.count;
        }
        return resultPrice;
    };

    getMembraneResultPrice(membranes) {
        let resultPrice = 0;
        for (const membrane of membranes) {
            resultPrice += getMembranePrice(membrane);
        }
        return resultPrice;
    };

    calc() {
        this.membranesPrice = this.getMembraneResultPrice(this.state.membranes);
        this.servicesPrice = this.getServiceResultPrice(this.state.services);
        this.resultHarpoonPrice = this.membranesPrice + this.servicesPrice;
    }

    render() {
        const {harpoonSave, isLoading, harpoonProducts} = this.props;
        if (!harpoonSave || isLoading) {
            return <Loader/>
        }
        return (
            <div>
                <AddMembranes dialogWindowState={this.dialogWindowState}
                              harpoon={harpoonSave.harpoon}
                              addMembranes={this.addMembranes}
                              client={harpoonSave.client}/>
                {this.getAddServices(harpoonSave)}
                <div className="row product-files-container">
                    <div className="col-6">
                        {harpoonProducts.length && <AddProduct harpoonProducts={harpoonProducts}
                                                               product={this.product}
                                                               addProduct={this.addProduct}/>}
                        <p>Длина гарпуна: {this.getHarpoonSize(this.state.membranes, this.state.services)}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <AddFiles addFiles={this.addFiles}
                                  files={this.state.files}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-8">
                        <CommentField commentName={'гарпуну'}
                                      comment={this.comment}
                                      addComment={this.addComment}/>
                    </div>
                </div>
                {this.getResultParameters()}
                <div className="col-sm-12 text-right btn-container">
                    <button type="button"
                            onClick={this.handleCancel}
                            className="btn btn-primary btn-secondary">Отмена
                    </button>
                    <button type="submit"
                            onClick={this.handleSubmit}
                            disabled={this.checkForm()}
                            className="btn btn-primary pull-right">{this.btnText}
                    </button>
                </div>
            </div>
        )
    }

    componentWillUnmount = () => this.props.deleteItemsFromStore();
}

export default connect((state) => ({
    harpoonSave: state.harpoons.harpoonSave,
    harpoonProducts: mapToArr(state.products.products),
    isLoading: state.products.isLoading
}), {getAllProducts, deleteItemsFromStore})(HarpoonInfo);