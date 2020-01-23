import Switch from "react-router-dom/es/Switch";
import Route from "react-router-dom/es/Route";
import React from 'react'

import CategoriesPage from './categories/CategoriesPage';
import StocksPage from './stocks/StocksPage';
import SuppliersRouter from './suppliers/components/SuppliersRouter';
import ProductsRouter from './products/ProductsRouter';
import ClientsRouter from './clients/ClientsRouter';
import SuppliesRouter from './supplies/components/SuppliesRouter';
import PaymentsRouter from './payments/PaymentsRouter';
import OrdersRouter from './orders/OrdersRouter';
import UsersPage from './users/UsersPage';
import MembranesRouter from './membranes/MembranesRouter';
import DriversPage from './drivers/DriversPage';
import CarsPage from './cars/CarsPage';
import RecipesPage from './recipes/RecipesPage';
import ServicesRouter from './services/ServicesRouter';
import AssembliesRouter from './assemblies/AssembliesRouter';
import HarpoonsRouter from './harpoons/HarpoonsRouter';
import TransferRequestsRouter from './transfers/transferRequests/TransferRequestsRouter';
import Statistics from "./statistics/statistics/Statistics";
import ItemHistory from "./items/itemHistory/ItemHistory";

export default class extends React.Component {
    render() {
        return (
            <div>
                <div className='content-container container'>
                    <main>
                        <Switch className="main-page">
                            <Route exact path='/' component={OrdersRouter}/>
                            <Route path='/stocks/:stockId' component={StocksPage}/>
                            <Route path='/stocks' component={StocksPage}/>
                            <Route path='/suppliers/:supplierId' component={SuppliersRouter}/>
                            <Route exact path='/suppliers' component={SuppliersRouter}/>
                            <Route exact path='/categories/:categoryId' component={CategoriesPage}/>
                            <Route exact path='/categories' component={CategoriesPage}/>
                            <Route exact path='/products' component={ProductsRouter}/>
                            <Route exact path='/products/add' component={ProductsRouter}/>
                            <Route exact path='/products/:productId' component={ProductsRouter}/>
                            <Route exact path='/products/:productId/edit' component={ProductsRouter}/>
                            <Route exact path='/clients' component={ClientsRouter}/>
                            <Route exact path='/clients/:clientId' component={ClientsRouter}/>
                            <Route exact path='/supplies/' component={SuppliesRouter}/>
                            <Route exact path='/supplies/add_supply' component={SuppliesRouter}/>
                            <Route exact path='/supplies/:supplyId' component={SuppliesRouter}/>
                            <Route exact path='/supplies/:supplyId/edit' component={SuppliesRouter}/>
                            <Route exact path='/payments' component={PaymentsRouter}/>
                            <Route exact path='/payments/add_payment' component={PaymentsRouter}/>
                            <Route exact path='/orders' component={OrdersRouter}/>
                            <Route exact path='/orders/add_order' component={OrdersRouter}/>
                            <Route exact path='/orders/add_order/add_harpoon' component={OrdersRouter}/>
                            <Route exact path='/orders/:orderId' component={OrdersRouter}/>
                            <Route exact path='/orders/:orderId/edit' component={OrdersRouter}/>
                            <Route exact path='/users' component={UsersPage}/>
                            <Route exact path='/users/add_user' component={UsersPage}/>
                            <Route exact path='/users/:userId' component={UsersPage}/>
                            <Route exact path='/users/:userId/edit' component={UsersPage}/>
                            <Route exact path='/membranes' component={MembranesRouter}/>
                            <Route exact path='/membranes/add_membrane' component={MembranesRouter}/>
                            <Route exact path='/membranes/:membraneId' component={MembranesRouter}/>
                            <Route exact path='/membranes/:membraneId/edit' component={MembranesRouter}/>
                            <Route exact path='/drivers' component={DriversPage}/>
                            <Route exact path='/drivers/:driverId' component={DriversPage}/>
                            <Route exact path='/cars' component={CarsPage}/>
                            <Route exact path='/cars/:carId' component={CarsPage}/>
                            <Route exact path='/recipes' component={RecipesPage}/>
                            <Route exact path='/recipes/add_recipe' component={RecipesPage}/>
                            <Route exact path='/recipes/:recipeId' component={RecipesPage}/>
                            <Route exact path='/recipes/:recipeId/edit_recipe' component={RecipesPage}/>
                            <Route exact path='/services' component={ServicesRouter}/>
                            <Route exact path='/services/:serviceId' component={ServicesRouter}/>
                            <Route exact path='/assemblies' component={AssembliesRouter}/>
                            <Route exact path='/assemblies/:assemblyId' component={AssembliesRouter}/>
                            <Route exact path='/harpoons' component={HarpoonsRouter}/>
                            <Route exact path='/harpoons/:harpoonId' component={HarpoonsRouter}/>
                            <Route exact path='/harpoons/:harpoonId/edit' component={HarpoonsRouter}/>
                            <Route exact path='/transfer_requests' component={TransferRequestsRouter}/>
                            <Route exact path='/transfer_requests/:transferRequestId'
                                   component={TransferRequestsRouter}/>
                            <Route exact path='/statistics' component={Statistics}/>
                            <Route exact path='/products/history/:itemId' component={ItemHistory}/>
                            <Route exact path='/membrane/history/:itemId' component={ItemHistory}/>
                        </Switch>
                    </main>
                </div>
            </div>
        )
    }
}
