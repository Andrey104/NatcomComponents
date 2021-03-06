import {ITEM_MEMBRANE, ITEM_PRODUCT, units} from "../constans";

export const phoneMask = ['+', '7', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

export const paymentTypes = ['Наличные', 'Карта', 'Терминал'];

export const orderStatuses = [
    'Черновик',
    'Подтвержден',
    'Сборка',
    'Готов',
    'Выдан',
    'Не выбран'
];

export const orderPaymentStatuses = [
    'Не оплачен',
    'Предоплата',
    'Оплачен'
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
    'Подтвержден',
    'Сборка',
    'Готов',
    'Выдан'
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
    if (dateStr){
        const date = new Date(dateStr);
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const day = ('0' + date.getDate()).slice(-2);
        return `${date.getFullYear()}-${month}-${day}`;
    } else {
        return null;
    }

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

export function priceFormat(price) {
    let formattedPrice;
    if (price){
        formattedPrice = Number(price).toFixed(2);
    } else {
        formattedPrice = "0.00";
    }
    return formattedPrice;
}

export function countFormat(count) {
    let formattedCount;
    if (count){
        formattedCount = Number(count).toFixed(2);
    } else {
        formattedCount = "0.00";
    }
    return formattedCount;
}

// Получение нового гарпуна
export const getNewHarpoon = harpoon => {
    console.log(harpoon);
    return {
        files: getFilesForNewHarpoon(harpoon.files),
        services: getServicesForNewHarpoon(harpoon.services),
        membranes: getMembranesForNewHarpoon(harpoon.membranes),
        harpoon_product: harpoon.product || harpoon.harpoon_product.id,
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
        count: membrane.count
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
    if (filters.harpoon) url += `harpoon=True&`;
    if (page) url += `page=${page}&`;
    if (url!== '') {
        url = '?' + url.slice(0, url.length - 1);
    }
    return url_prefix + url;
}

export function getUrlPayments(date, searchText, paymentType, page) {
    let url_prefix = '';
    let url = '';
    if (date) url += `date=${date}&`;
    if (searchText) url += `text=${searchText}&`;
    if (page) url += `page=${page}&`;
    if (paymentType) url += `type=${paymentType}&`;
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
    if (filters.harpoon) url += `harpoon=True&`;
    if (page) url += `page=${page}&`;
    if (url!== '') {
        url = '?' + url.slice(0, url.length - 1);
    }
    return url_prefix + url;
}

export function getUrlOrders(page, client, date) {
    let url_prefix = '';
    let url = '';
    if (client) url += `client=${client.id}&`;
    if (page) url += `page=${page}&`;
    if (date) url += `date=${date}&`;
    if (url!== '') {
        url = '?' + url.slice(0, url.length - 1);
    }
    return url_prefix + url;
}

export function getUrlItemHistory(itemId) {
    let url_prefix = '';
    let url = '';
    if (itemId) url += `item=${itemId}&`;
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
        return ('м.');
    }
}

export function dimensionsFormat(d) {
    let formatted;
    if (d){
        if (typeof d === 'string') {
            formatted = d;
        } else {
            formatted = d.toFixed(2);
        }
    } else {
        formatted = null;
    }
    return formatted;
}

export function getMembraneName(inMembrane) {
    const membrane = inMembrane.membrane;
    return (membrane.texture.description + ' ' +
        membrane.color.description + ' ' +
        membrane.name + ' (' + membrane.width +')');
}

export function getPositionSum(inItem, index) {
    let item = inItem.item;
    if (item.type === ITEM_PRODUCT) {
        if (inItem.count) {
            return (<div>{(inItem.count * item.price).toFixed(2)} руб</div>);
        } else {
            return <div>{(0).toFixed(2)} руб</div>;
        }
    }
    if (item.type === ITEM_MEMBRANE) {
        if (inItem.count) {
            return (<div>{(inItem.count * item.width * item.price).toFixed(2)} руб</div>);
        } else {
            return <div>{(0).toFixed(2)} руб</div>;
        }
    }
}

export function getPositionSumPriceNotInItem(inItem, index) {
    let item = inItem.item;
    if (item.type === ITEM_PRODUCT) {
        if (inItem.count) {
            return (<div>{(inItem.count * inItem.price).toFixed(2)} руб</div>);
        } else {
            return <div>{(0).toFixed(2)} руб</div>;
        }
    }
    if (item.type === ITEM_MEMBRANE) {
        if (inItem.count) {
            return (<div>{(inItem.count * item.width * inItem.price).toFixed(2)} руб</div>);
        } else {
            return <div>{(0).toFixed(2)} руб</div>;
        }
    }
}

export function getMembranePrice(membrane) {
    if (membrane.price) {
        return membrane.square * membrane.price;
    } else {
        return membrane.square * membrane.membrane.price;
    }
}


export function getArea(inItem) {
    let item = inItem.item;
    if (item.type === ITEM_PRODUCT) {
        return null;
    }
    if (item.type === ITEM_MEMBRANE) {
        // Тут вычисления производятся с некоторыми странными погрешностями,
        // но т.к. эти значения мы не отправляем на сервер, нам этого достаточно.
        if (inItem.count) {
            return (<div>({(inItem.count * item.width).toFixed(2)}) м²</div>);
        } else {
            return <div>({(0).toFixed(2)}) м²</div>;
        }
    }
}

export function getItemName(inItem) {
    let item = inItem.item;
    if (item.type === ITEM_PRODUCT) {
        return (<div>{item.name}</div>);
    }
    if (item.type === ITEM_MEMBRANE) {
        return (<div>{item.texture.description} {item.color.description} {item.name} ({item.width})</div>);
    }
}