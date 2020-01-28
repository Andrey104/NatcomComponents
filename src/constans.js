export const GET_ALL_STOCKS = 'GET_ALL_STOCKS';
export const ADD_NEW_STOCK = 'ADD_NEW_STOCK';
export const GET_STOCK_DETAIL = 'GET_STOCK_DETAIL';
export const EDIT_STOCK = 'EDIT_STOCK';

export const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS';
export const GET_NEXT_PRODUCTS = 'GET_NEXT_PRODUCTS';
export const GET_PRODUCT = 'GET_PRODUCT';
export const DELETE_PRODUCTS_FROM_STORE = 'DELETE_PRODUCTS_FROM_STORE';
export const SAVE_PRODUCTS_FILTERS = 'SAVE_PRODUCTS_FILTERS';
export const SET_PRODUCTS_CLIENT = 'SET_PRODUCTS_CLIENT';
export const SET_PRODUCT_TYPE = 'SET_PRODUCT_TYPE';

export const GET_ALL_CLIENTS = 'GET_ALL_CLIENTS';
export const GET_NEXT_CLIENTS = 'GET_NEXT_CLIENTS';
export const GET_CLIENT = 'GET_CLIENT';
export const GET_CLIENT_CREDIT = 'GET_CLIENT_CREDIT';
export const EDIT_CLIENT = 'EDIT_CLIENT';
export const ADD_NEW_CLIENT = 'ADD_NEW_CLIENT';

export const GET_ALL_CUSTOM_PRICES = 'GET_ALL_CUSTOM_PRICES';
export const DELETE_CUSTOM_PRICE = 'DELETE_CUSTOM_PRICE';
export const EDIT_CUSTOM_PRICE = 'EDIT_CUSTOM_PRICE';

export const GET_ALL_PAYMENTS = 'GET_ALL_PAYMENTS';
export const GET_NEXT_PAYMENTS = 'GET_NEXT_PAYMENTS';
export const GET_PAYMENT = 'GET_PAYMENT';
export const SET_PAYMENT_FILTER_PARAMS = 'SET_PAYMENT_FILTER_PARAMS';
export const SET_PAYMENT_TYPE_FILTER_PARAMS = 'SET_PAYMENT_TYPE_FILTER_PARAMS';
export const GET_PAYMENTS_SUM = 'GET_PAYMENTS_SUM';

export const SET_PAYMENT_ADD_DATA = 'SET_PAYMENT_ADD_DATA';
export const CLEAR_PAYMENT_ADD_DATA = 'CLEAR_PAYMENT_ADD_DATA';

export const GET_ALL_ORDERS = 'GET_ALL_ORDERS';
export const GET_NEXT_ORDERS = 'GET_NEXT_ORDERS';
export const GET_ORDER = 'GET_ORDER';
export const SAVE_ORDER_INFO_IN_STORE = 'SAVE_ORDER_INFO_IN_STORE';
export const ADD_PAYMENT_IN_ORDER = 'ADD_PAYMENT_IN_ORDER';
export const REJECT_ORDER = 'REJECT_ORDER';

export const GET_ALL_USERS = 'GET_ALL_USERS';
export const GET_NEXT_USERS = 'GET_NEXT_USERS';
export const GET_USER = 'GET_USER';
export const BLOCK_USER = 'BLOCK_USER';
export const CHANGE_USER_PASSWORD = 'CHANGE_USER_PASSWORD';

export const GET_CURRENT_USER = 'GET_CURRENT_USER';

export const GET_ALL_MEMBRANES = 'GET_ALL_MEMBRANES';
export const GET_NEXT_MEMBRANES = 'GET_NEXT_MEMBRANES';
export const GET_MEMBRANE = 'GET_MEMBRANE';
export const DELETE_MEMBRANES_FROM_STORE = 'DELETE_MEMBRANES_FROM_STORE';
export const SAVE_MEMBRANES_FILTERS = 'SAVE_MEMBRANES_FILTERS';

export const GET_ALL_DRIVERS = 'GET_ALL_DRIVERS';
export const GET_NEXT_DRIVERS = 'GET_NEXT_DRIVERS';
export const GET_DRIVER = 'GET_DRIVER';

export const GET_ALL_CARS = 'GET_ALL_CARS';
export const GET_NEXT_CARS = 'GET_NEXT_CARS';
export const GET_CAR = 'GET_CAR';

export const GET_ALL_COLORS = 'GET_ALL_COLORS';
export const GET_ALL_TEXTURES = 'GET_ALL_TEXTURES';

export const GET_ALL_RECIPES = 'GET_ALL_RECIPES';
export const GET_NEXT_RECIPES = 'GET_NEXT_RECIPES';
export const GET_RECIPE = 'GET_RECIPE';

export const GET_ALL_SERVICES = 'GET_ALL_SERVICES';
export const GET_NEXT_SERVICES = 'GET_NEXT_SERVICES';
export const GET_SERVICE = 'GET_SERVICE';

export const GET_ALL_ASSEMBLIES = 'GET_ALL_ASSEMBLIES';
export const GET_NEXT_ASSEMBLIES = 'GET_NEXT_ASSEMBLIES';
export const GET_ASSEMBLY = 'GET_ASSEMBLY';

export const GET_ALL_HARPOONS = 'GET_ALL_HARPOONS';
export const GET_NEXT_HARPOONS = 'GET_NEXT_HARPOONS';
export const GET_HARPOON = 'GET_HARPOON';

export const GET_ALL_TRANSFER_REQUESTS = 'GET_ALL_TRANSFER_REQUESTS';
export const GET_NEXT_TRANSFER_REQUESTS = 'GET_NEXT_TRANSFER_REQUESTS';
export const GET_TRANSFER_REQUEST = 'GET_TRANSFER_REQUEST';

export const SAVE_HARPOON_IN_ORDER = 'SAVE_HARPOON_IN_ORDER';
export const EDIT_HARPOON_IN_ORDER = 'EDIT_HARPOON_IN_ORDER';
export const SAVE_HARPOON = 'SAVE_HARPOON';

export const OPEN_MODAL_WINDOW = 'OPEN_MODAL_WINDOW';
export const CLOSE_MODAL_WINDOW = 'CLOSE_MODAL_WINDOW';
export const OPEN_ADD_ITEMS = 'OPEN_ADD_ITEMS';
export const OPEN_ADD_CLIENT = 'OPEN_ADD_CLIENT';
export const OPEN_ADD_SUPPLIER = 'OPEN_ADD_SUPPLIER';
export const PAYMENT_CLIENT_ADD_MODAL = 'PAYMENT_CLIENT_ADD_MODAL';

export const GET_ALL_ITEM_HISTORY = 'GET_ALL_ITEM_HISTORY';

export const SAVE_ITEMS_INFO = 'SAVE_ITEMS_INFO';

export const SET_ITEM_DIALOG_STATE = 'SET_ITEM_DIALOG_STATE';

export const SET_ORDERS_DATE = 'SET_ORDERS_DATE';
export const ADD_CUSTOM_POSITION_TO_ORDER = 'ADD_CUSTOM_POSITION_TO_ORDER';


export const GET_SUM = 'GET_SUM';
export const GET_PROFIT = 'GET_PROFIT';

export const START = '_START';
export const SUCCESS = '_SUCCESS';
export const FAIL = '_FAIL';

export const units = ['шт.', 'уп.', 'м.п.', 'кг.', 'м.кв.'];
export const serviceTypes = ['Шов', 'Внутренний вырез', 'Углы', 'Другие услуги (гарпун)', 'Остальные услуги'];
export const transferRequestType = ['Заказ', 'Недостаток', 'Гарпун'];

export const TRANSFER_REQUEST_ORDER = 0;
export const TRANSFER_REQUEST_LACK = 1;
export const TRANSFER_REQUEST_HARPOON = 2;

export const ITEM_PRODUCT = 0;
export const ITEM_MEMBRANE = 1;

// export const orderStatuses = [
//     'Черновик',
//     'Подтвержден',
//     'Сборка',
//     'Готов',
//     'Продан',
//     'Не выбран'
// ];

export const ORDER_DRAFT_STATUS = 0;
export const ORDER_CONFIRM_STATUS = 1;
export const ORDER_ASSEMBLE_STATUS = 2;
export const ORDER_READY_STATUS = 3;
export const ORDER_FINAL_STATUS = 4;

export const ORDER_PAYMENT_NO_PAYMENT_STATUS = 0;
export const ORDER_PAYMENT_PREPAYMENT_STATUS = 1;
export const ORDER_PAYMENT_FULL_STATUS = 2;

export const ITEM_HISTORY_TYPE_ORDER = 0;
export const ITEM_HISTORY_TYPE_SUPPLY = 1;
export const ITEM_HISTORY_TYPE_RETURN_ORDER = 2;
