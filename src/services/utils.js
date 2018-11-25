import {ITEM_MEMBRANE, ITEM_PRODUCT, units} from "../constans";

export const phoneMask = ['+', '7', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

export const paymentTypes = ['Наличный', 'Безналичный', 'Терминал'];

export const orderStatuses = [
    'Черновик',
    'Подтвержден',
    'Сборка',
    'Готов',
    'Продан',
    'Не выбран'
];

export const userTypes = [
    'Продавец',
    'Менеджер точки выдачи',
    'Менеджер главного склада',
    'Руководитель производства',
    'Администратор'
];

export const harpoonStatuses = [
    'Черновик',
    'Сборка',
    'Готов'
];

export const TABLET_DISPLAY_WIGHT = 768;
export const MOBILE_DISPLAY = 1;
export const PC_DISPLAY = 2;

export function getPhoneWithMask(phone) {
    let maskPhone;
    if (phone) {
        maskPhone = '+7(' + phone.slice(0, 3) + ')-' + phone.slice(3, 6) + '-' + phone.slice(6);
    } else {
        maskPhone = 'Не указан';
    }
    return maskPhone;
}

export function getPhoneWithoutMask(phoneWithMask) {
    let phone = '';
    for (let i = 3; i < phoneWithMask.length; i++) {
        if (phoneWithMask[i] !== ')' && phoneWithMask[i] !== ' ' &&
            phoneWithMask[i] !== '-' && phoneWithMask[i] !== '_') {
            phone += phoneWithMask[i];
        }
    }
    return phone;
}

function monthStringFormat(numberMonth) {
    const months = ['янв.', 'фев.', 'мрт.', 'апр.', 'мая', 'июн.',
        'июл.', 'авг.', 'сен.', 'окт.', 'нбр.', 'дек.'];
    return months[numberMonth];
}

export function getDate(dateStr) {
    const date = new Date(dateStr);
    return `${date.getDate()} ${monthStringFormat(date.getMonth())} ${date.getFullYear()}`;
}

export function getDateForServer(dateStr) {
    const date = new Date(dateStr);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${date.getFullYear()}-${month}-${day}`;
}

export function getDateTime(dateStr) {
    const date = new Date(dateStr);
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    return `${getDate(dateStr)} ${hours}:${minutes}`
}

export const checkMainStock = main => main ? 'Главный' : 'Второстепенный';

export const checkComment = comment => {
    return comment ? comment : 'Комментрий отсутвует';
};

export const getUserStatus = status => status ? 'Заблокирован' : 'Не заблокирован';

export const checkAddress = address => {
    return address ? address : 'Адрес не указан';
};

export const checkPrepayment = prepayment => prepayment ? 'Есть' : 'Нет';

export const checkSubcategory = subcategory => {
    return subcategory ? subcategory.name : 'Подкатегория отсутвует';
};

export function moneyFormat(money) {
    let formattedMoney;
    if (typeof money === 'string') {
        formattedMoney = money.slice(0, money.length - 3);
    } else {
        formattedMoney = String(money);
    }
    if (formattedMoney.length > 3) {
        for (let i = formattedMoney.length - 3; i > -1; i -= 3) {
            formattedMoney = formattedMoney.slice(0, i) + ' ' + formattedMoney.slice(i);
        }
    }
    return formattedMoney;
}

export function countFormat(count) {
    if (typeof count === 'string') {
        return count.slice(0, count.length - 3);
    }
    return count;
}

// Получение нового гарпуна
export const getNewHarpoon = harpoon => {
    return {
        files: getFilesForNewHarpoon(harpoon.files),
        services: getServicesForNewHarpoon(harpoon.services),
        membranes: getMembranesForNewHarpoon(harpoon.membranes),
        harpoon_product: harpoon.product,
        comment: harpoon.comment,
    }
};

const getFilesForNewHarpoon = files => files.map(file => ({file: file.id}));

const getServicesForNewHarpoon = services => {
    return services.map(service => ({
        service: service.service.id,
        count: service.count
    }));
};

const getMembranesForNewHarpoon = membranes => {
    return membranes.map(membrane => ({
        membrane: membrane.membrane.id,
        count: membrane.membraneLength
    }));
};

// ----------------------------------------

export function getUniqueElementsArr(newArr, oldArr) {
    let uniqueArr = [];
    for (let i = 0; i < newArr.length; i++) {
        let k = 0;
        for (let j = 0; j < oldArr.length; j++) {
            if (newArr[i] === oldArr[j]) {
                k++;
                break;
            }
        }
        if (k === 0) {
            uniqueArr.push(newArr[i]);
        }
    }
    return uniqueArr;
}

export function objectIsEmpty(obj) {
    for (const key in obj) {
        return false;
    }
    return true;
}

export function getItemsInfoParams(items) {
    let params = '?';
    for (const orderItem of items) {
        params += `id=${orderItem.item.item}&`;
    }
    return params.slice(0, params.length - 1);
}

export function changeItemsStocks(items, serverItems, stock) {
    return items.map(itemArr => {
        const serverItem = serverItems.find(itemArrServer =>
            itemArrServer.id === itemArr.item.id
        );
        const newStock = serverItem.stocks.find(stockArr =>
            stockArr.stock.id === stock.id
        );
        if (!stock.main) {
            if (itemArr.stocks.length > 1) {
                itemArr.stocks = itemArr.stocks.map(stockArr => {
                    if (!stockArr.stock.main) {
                        stockArr = newStock;
                    }
                    return stockArr;
                });
                if (!itemArr.currentStock.stock.main) {
                    itemArr.currentStock = newStock;
                }
            } else if (itemArr.stocks.length === 1) {
                itemArr.stocks.push(newStock);
            }
            return itemArr;
        } else {
            let arr = [];
            arr.push(newStock);
            itemArr.stocks = arr;
            itemArr.currentStock = newStock;
            return itemArr;
        }
    });
}

export function getUrl(filters, page, client) {
    let url_prefix = '';
    let url = '';
    if (client) {
        url_prefix += `stocks/`;
        url += `client=${client.id}&`;
    }
    if (filters.searchText) url += `text=${filters.searchText}&`;
    if (filters.category) url += `category=${filters.category}&`;
    if (filters.subcategory) url += `subcategory=${filters.subcategory}&`;
    if (page) url += `page=${page}&`;
    if (url!== '') {
        url = '?' + url.slice(0, url.length - 1);
    }
    return url_prefix + url;
}

export function getUrlMembranes(filters, page, client) {
    let url_prefix = '';
    let url = '';
    if (client) {
        url_prefix += `stocks/`;
        url += `client=${client.id}&`;
    }
    if (filters.searchText) url += `text=${filters.searchText}&`;
    if (filters.color) url += `color=${filters.color}&`;
    if (filters.texture) url += `texture=${filters.texture}&`;
    if (filters.harpoon) url += `harpoon=${filters.harpoon}&`;
    if (page) url += `page=${page}&`;
    if (url!== '') {
        url = '?' + url.slice(0, url.length - 1);
    }
    return url_prefix + url;
}

export function displayError(text, type){
    let errText = 'Что-то пошло не так :(';
    if (type === 'SERVER') {
        errText = 'Ошибка запроса к серверу: ' + text;
    } else {
        if (text) errText = text;
    }
    alert(errText);
}

export function getUnit(item) {
    if (item.item.type === ITEM_PRODUCT) {
        return (units[item.item.unit - 1]);
    }
    if (item.item.type === ITEM_MEMBRANE) {
        // Полотна измеряются в БД в метрах погонных, для клиента мы расчитываем м.кв
        return ('м');
    }
}
