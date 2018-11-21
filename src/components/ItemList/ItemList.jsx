import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import Loader from '../Loader/index';
import AddButton from '../AddButton/index'
import ProductCard from './ProductCard/index';
import MembraneCard from './MembraneCard/index';
import InfiniteScrollOverride from '../../services/InfiniteScrollOverride';
import {mapToArr} from '../../helpers';
import {getAllProducts, getNextProducts, setProductsClient} from '../../AC/products';
import history from '../../history';
import {getCurrentUser} from "../../AC/currentUser";
import {UsersService} from "../../services/users.service";
import {getAllMembranes, getNextMembranes} from "../../AC/membranes";


class ItemList extends React.Component {
    // Архитектура этого компонента больше похожа на полную жесть, но как есть :)
    static propTypes = {
        client: PropTypes.object,
        selectMode: PropTypes.bool,
        handleSubmit: PropTypes.func,
        membraneMode: PropTypes.bool,
        harpoonMode: PropTypes.bool,
    };

    constructor(props) {
        super(props);
        // Клиента не зависимо от полотен или продуктов будем брать из продуктов.
        // Можно позже это поправить и вынести клиенов в независимую часть в сторе.
        if (this.props.selectMode && this.props.client) {
            this.props.setProductsClient(this.props.client);
        } else {
            // Сбрасываем в сторе клиента, если нам нужен общий вид
            this.props.setProductsClient(null);
        }
    }

    componentDidMount() {
        this.load();
    };

    componentDidUpdate(prevProps) {
        // Здесь можно выполнять сайд эффекты
        if (this.props.membraneMode !== prevProps.membraneMode) {
            this.load();
        }
    };

    load = () => {
        if (this.props.membraneMode) {
            this.props.getAllMembranes(this.props.filtersMembranes, this.props.client);
        } else {
            this.props.getAllProducts(this.props.filtersProducts, this.props.client);
        }
    };

    loadNext = () => {
        if (this.props.membraneMode) {
            this.props.getNextMembranes(this.props.filtersMembranes, this.props.nextPageNumberMembranes, this.props.client);
        } else {
            this.props.getNextProducts(this.props.filtersProducts, this.props.nextPageNumberProducts, this.props.client);
        }
    };

    handleClick = item => () => {
        if (this.props.selectMode) {
            this.props.handleSubmit(item);
        } else {
            if (this.props.membraneMode) {
                history.push(`/membranes/${item.id}`);
            } else {
                history.push(`/products/${item.id}`);
            }
        }
    };

    openAddItem = () => {
        if (this.props.membraneMode) {
            history.push('/membranes/add');
        } else {
            history.push('/products/add');
        }
    };


    hasMore = () => {
        if (this.props.membraneMode) {
            return this.props.hasMoreMembranes
        } else {
            return this.props.hasMoreProducts
        }
    };


    getProductsBody(products) {
        if (!products.length) {
            return (
                <tr>
                    <td colSpan='5'>Товары не найдены</td>
                </tr>
            );
        }
        return products.map((product) => (
            <ProductCard key={product.id}
                         selectMode={this.props.selectMode}
                         handleClick={this.handleClick}
                         product={product}/>
        ));
    }

    getMembraneBody(membranes) {
        if (!membranes.length) {
            return (
                <tr>
                    <td colSpan='5'>Полотна не найдены</td>
                </tr>
            );
        }
        return membranes.map((membrane, index) => (
                <MembraneCard key={membrane.id}
                              selectMode={this.props.selectMode}
                              handleClick={this.handleClick}
                              harpoonMode={this.props.harpoonMode}
                              membrane={membrane}/>
            )
        );
    }

    getBody() {
        if (this.props.membraneMode) {
            return this.getMembraneBody(this.props.membranes);
        } else {
            return this.getProductsBody(this.props.products);
        }
    }

    getAddButton() {
        let addButton = null;
        if (UsersService.mainManagerPermission()) {
            addButton = <AddButton openAdd={this.openAddItem}/>
        }
        return addButton;
    }

    getTableHead() {
        let tHead = null;
        if (this.props.membraneMode && !this.props.selectMode) {
            tHead = (
                <tr>
                    <th scope="col">Артикул</th>
                    <th scope="col">Наименование</th>
                    <th scope="col">В наличии</th>
                    <th scope="col">Цена</th>
                    <th scope="col">Цена в гарпуне</th>
                </tr>
            );
        } else {
            tHead = (
                <tr>
                    <th scope="col">Артикул</th>
                    <th scope="col">Наименование</th>
                    <th scope="col">В наличии</th>
                    <th scope="col">Цена</th>
                </tr>
            );
        }
        return tHead;
    }

    // getLoader() {
    //     if (isLoading && products.length === 0) {
    //         return (
    //             <div className="pre-loader-container">
    //                 <Loader/>
    //             </div>
    //         );
    //     }
    // }

    render() {
        const {selectMode, hasMoreProducts} = this.props;
        const loader = hasMoreProducts ? <Loader/> : false;
        return (
            <InfiniteScrollOverride
                pageStart={1}
                loadMore={this.loadNext}
                hasMore={this.hasMore}
                useWindow={false}
                isDialog={selectMode}>
                <div className="row">
                    <div className="col-12">
                        <table className="table table-hover table-bordered">
                            <thead className="thead-light">
                            {this.getTableHead()}
                            </thead>
                            <tbody>
                            {this.getBody()}
                            </tbody>
                        </table>
                        {/*{loader}*/}
                    </div>
                    {this.getAddButton()}
                </div>
            </InfiniteScrollOverride>
        )
    }
}


export default connect((state) => ({
    products: mapToArr(state.products.products),
    membranes: mapToArr(state.membranes.entries),
    currentStockId: state.currentUser.stock,
    isLoading: state.products.isLoading,
    filtersProducts: state.products.filters,
    filtersMembranes: state.membranes.filters,
    storeClient: state.products.client,
    nextPageNumberProducts: state.products.nextPageNumber,
    nextPageNumberMembranes: state.membranes.nextPageNumber,
    hasMoreProducts: state.products.hasMoreProducts,
    hasMoreMembranes: state.products.hasMoreMembranes
}), {
    getCurrentUser,
    getAllProducts,
    getNextProducts,
    setProductsClient,
    getNextMembranes,
    getAllMembranes
})(ItemList);