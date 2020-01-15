import {combineReducers} from 'redux';

import stocks from './stock';
import suppliers from './supplier';
import categories from './categories';
import products from './product';
import clients from './client';
import customPrices from './customPrice';
import supplies from '../Content/supplies/store/reducers/supplies';
import payments from './payment';
import orders from './order';
import users from './user';
import membranes from './membrane';
import drivers from './driver';
import cars from './car';
import parameters from './parameter';
import recipes from './recipe';
import services from './service';
import assemblies from './assembly';
import harpoons from './harpoon';
import modal from './modal';
import transferRequests from './transferRequest';
import items from './item';
import currentUser from "./currentUser";
import statistics from "./statistics";
import itemHistories from "./itemHistory";

export default combineReducers({
    stocks,
    suppliers,
    categories,
    products,
    clients,
    customPrices,
    supplies,
    payments,
    orders,
    users,
    membranes,
    drivers,
    cars,
    parameters,
    recipes,
    services,
    assemblies,
    harpoons,
    modal,
    transferRequests,
    items,
    currentUser,
    statistics,
    itemHistories
});