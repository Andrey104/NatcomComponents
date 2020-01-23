import {OrderedMap} from 'immutable';

export function arrToMap(arr, DataRecord = OrderedMap) {
    return arr.reduce((acc, item) => acc.set(item.id, new DataRecord(item)), new OrderedMap({}));
}

export function objToMap(obj, DataRecord) {
    return new DataRecord(obj);
}

export function mapToArr(obj) {
    return obj.valueSeq().toArray();
}

export function mapToObj(obj) {
    if (obj === undefined) return undefined;
    return obj.toObject();
}