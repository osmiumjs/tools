"use strict";
/**
 * Tools and utils needed everywhere
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const deep_equal_1 = __importDefault(require("deep-equal"));
/**
 * [[include: guid.md]]
 * @returns {string} GUIDv4 string
 */
function GUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        let r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
exports.GUID = GUID;
/**
 * Generate 128bit unique id
 * @param prefix
 * @param mask
 */
function UID(prefix = '', mask = 'xxxxxxxxxxxxxxxxxx-xxxxxx') {
    return `${prefix}${mask}`.replace(/[x]/g, () => (Math.random() * 32 | 0).toString(36)[Math.random() >= 0.5 ? 'toUpperCase' : 'toLowerCase']());
}
exports.UID = UID;
/**
 * @ignore
 * @private
 */
function _testConstructor(constructorName, value) {
    return !isUndefined(value) && !isNull(value) && value.constructor && value.constructor.name === constructorName;
}
/**
 * Is value an *AsyncFunction*
 */
function isAsyncFunction(value) {
    if (!value)
        return false;
    const afcText = value.toString().toLocaleLowerCase().replace(/\n/g, '').replace(/ /g, '');
    return _testConstructor('AsyncFunction', value)
        || ((_testConstructor('Function', value) && (afcText.slice(afcText.indexOf('{')).indexOf('returnnewpromise(function($return,$error)') === 1))); //fast-async monkey-support
}
exports.isAsyncFunction = isAsyncFunction;
/**
 * Is value a *Function*
 */
function isFunction(value) {
    return _testConstructor('Function', value) || isAsyncFunction(value);
}
exports.isFunction = isFunction;
/**
 * Is value an *undefined*
 */
function isUndefined(value) {
    return typeof value === 'undefined';
}
exports.isUndefined = isUndefined;
/**
 * Is value an *Array*
 */
function isArray(value) {
    return _testConstructor('Array', value);
}
exports.isArray = isArray;
/**
 * Is value an *Array* with length == 0
 */
function isEmptyArray(value) {
    return isArray(value) && value.length === 0;
}
exports.isEmptyArray = isEmptyArray;
/**
 * Is value an *object*
 */
function isObject(value) {
    return ({}.toString.call(value)) === '[object Object]';
}
exports.isObject = isObject;
/**
 * Is value a Native *Object*
 */
function isNativeObject(value) {
    return _testConstructor('Object', value);
}
exports.isNativeObject = isNativeObject;
/**
 * Is value a *string*
 */
function isString(value) {
    return _testConstructor('String', value);
}
exports.isString = isString;
/**
 * Is value a *null*
 */
function isNull(value) {
    return Object.prototype.toString.call(value) === '[object Null]';
}
exports.isNull = isNull;
/**
 * Is value a *boolean*
 */
function isBoolean(value) {
    return Object.prototype.toString.call(value) === '[object Boolean]';
}
exports.isBoolean = isBoolean;
/**
 * Is value a *number*
 */
function isNumber(value) {
    return Number.isFinite(value);
}
exports.isNumber = isNumber;
/**
 * Is value an Integer *number*
 */
function isInteger(value) {
    return Number.isSafeInteger(value);
}
exports.isInteger = isInteger;
/**
 * Is valuse an Float
 */
function isFloat(value) {
    return isNumber(value) && !isInteger(value);
}
exports.isFloat = isFloat;
/**
 * [[include: is-positive-integer.md]]
 */
function isPositiveInteger(value) {
    return isInteger(value) && value >= 0;
}
exports.isPositiveInteger = isPositiveInteger;
/**
 * Is value iterable (*object* or *Array* with not zero length)
 */
function isIterable(value) {
    return (isObject(value) ? !!Object.keys(value).length : false) || (isArray(value) ? !!value.length : false);
}
exports.isIterable = isIterable;
/**
 * Is value a JSON and can be decoded as *object*
 */
function isJSON(value) {
    if (!isString(value))
        return false;
    try {
        const obj = JSON.parse(value);
        return !!obj && typeof obj === 'object';
    }
    catch (e) {
    }
    return false;
}
exports.isJSON = isJSON;
/**
 * Is value a valid GUIDv4 *string*
 */
function isGUIDv4(value) {
    return isString(value) && /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i.test(value);
}
exports.isGUIDv4 = isGUIDv4;
/**
 * Is value a valid GUID *string*
 */
function isGUID(value) {
    return isString(value) && /^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i.test(value);
}
exports.isGUID = isGUID;
/**
 * [[include: to-TAnyArray.md]]
 */
function toArray(value) {
    return isArray(value) ? value : [value];
}
exports.toArray = toArray;
/**
 * [[include: TAnyArray-to-object.md]]
 * @param value
 * @param toKeys
 */
function arrayToObject(value, toKeys) {
    return (iterate(value, (row, idx, iter) => {
        if (toKeys) {
            if (isInteger(row) || isString(row))
                iter.key(idx + 1);
            return row;
        }
        else {
            iter.key(row);
            return idx + 1;
        }
    }, {}));
}
exports.arrayToObject = arrayToObject;
/**
 * [[include: object-to-TAnyArray.md]]
 */
function objectToArray(value, toKeys) {
    return iterate(value, (val, key) => toKeys ? key : val, []);
}
exports.objectToArray = objectToArray;
/**
 * Sync void empty function (No Operation)
 */
function nop() {
}
exports.nop = nop;
/**
 * Async void empty function (No Operation Async)
 */
async function nop$() {
}
exports.nop$ = nop$;
/**
 * [[include: set-defaults.md]]
 */
function setDefaults(obj, name, value) {
    if (isUndefined(obj[name])) {
        obj[name] = value;
    }
    return obj;
}
exports.setDefaults = setDefaults;
/**
 * @deprecated
 * Escapes all special RegExp characters
 */
function escapeRegExp(value) {
    return value.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1');
}
exports.escapeRegExp = escapeRegExp;
/**
 * Waits for ms via async/await
 * @param ms time to wait or 100
 */
async function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms || 100));
}
exports.delay = delay;
exports.sleep = delay;
/**
 * @deprecated
 * @ignore
 */
function log(...msg) {
    console.log(...msg);
}
exports.log = log;
/**
 * [[include: iterate.md]]
 *
 * @param value
 * @param callback
 * @param accumulate
 * @param assign
 */
function iterate(value, callback, accumulate, assign) {
    let breakFlag = false;
    function newIteration(index) {
        let instance = {
            'break': () => breakFlag = true,
            accKeyName: index,
            key: (name) => instance.accKeyName = name
        };
        return instance;
    }
    let iterateInstanceAsync = async (callback, val, index) => {
        let iteration = newIteration(index);
        pushRet(await callback(val, index, iteration), iteration);
    };
    let iterateInstance = (callback, val, index) => {
        let iteration = newIteration(index);
        pushRet(callback(val, index, iteration), iteration);
    };
    let ret = (isObject(accumulate) || isArray(accumulate) || isString(accumulate) || isInteger(accumulate)) ? accumulate : accumulate === false ? false : value;
    let pushRet = (val, iteration) => {
        if (isUndefined(val))
            return;
        if (isObject(accumulate)) {
            ret[iteration.accKeyName] = assign
                ? Object.assign(ret[iteration.accKeyName] || {}, val)
                : val;
        }
        if (isArray(accumulate))
            ret.push(val);
        if (isString(accumulate))
            ret += val
                ? isFunction(val.toString)
                    ? val.toString(isInteger(val) ? undefined : 'utf8')
                    : val + ''
                : '';
        if (isInteger(accumulate))
            ret += isInteger(val) ? val : parseInt(val);
        if (accumulate === false)
            ret = ret || val;
    };
    return isAsyncFunction(callback)
        ? new Promise(async (resolve) => {
            if (isArray(value)) {
                for (let index = 0; index < value.length; ++index) {
                    if (breakFlag)
                        break;
                    await iterateInstanceAsync(callback, value[index], index);
                }
                resolve(ret);
            }
            if (isObject(value)) {
                await iterate(Object.keys(value), async (index, _, iteration) => {
                    if (breakFlag)
                        iteration.break();
                    await iterateInstanceAsync(callback, value[index], index);
                });
                resolve(ret);
            }
            if (isInteger(value)) {
                for (let index = 0; index < value; ++index) {
                    if (breakFlag)
                        break;
                    await iterateInstanceAsync(callback, index, index);
                }
                resolve(ret);
            }
            resolve(false);
        })
        : (() => {
            if (isArray(value)) {
                for (let index = 0; index < value.length; ++index) {
                    if (breakFlag)
                        break;
                    iterateInstance(callback, value[index], index);
                }
                return ret;
            }
            if (isObject(value)) {
                iterate(Object.keys(value), (index, _, iteration) => {
                    if (breakFlag)
                        iteration.break();
                    iterateInstance(callback, value[index], index);
                });
                return ret;
            }
            if (isInteger(value)) {
                for (let index = 0; index < value; ++index) {
                    if (breakFlag)
                        break;
                    iterateInstance(callback, index, index);
                }
                return ret;
            }
            return false;
        })();
}
exports.iterate = iterate;
/**
 * [[include: iterate-keys.md]]
 * @param value
 * @param callback
 * @param accumulate
 */
function iterateKeys(value, callback, accumulate) {
    return isAsyncFunction(callback)
        ? (async () => await iterate(value, async (row, key, iteration) => await callback(key, row, iteration), accumulate))()
        : iterate(value, (row, key, iteration) => callback(key, row, iteration), accumulate);
}
exports.iterateKeys = iterateKeys;
/**
 * [[include: iterate-parallel.md]]
 * @param value
 * @param callback
 */
async function iterateParallel(value, callback) {
    return Promise.all(iterate(value, (val, key, iter) => (async () => await callback(val, key, iter))(), []));
}
exports.iterateParallel = iterateParallel;
/**
 * Finds and deletes first encounter of value in target
 * @param target
 * @param value
 * @returns true if an element has been deleted, otherwise - false
 */
function findAndDelete(target, value) {
    if (!isIterable(target))
        return false;
    if (isArray(target)) {
        for (let i = 0; i < target.length; i++) {
            if (deep_equal_1.default(target[i], value)) {
                target.splice(i, 1);
                return true;
            }
        }
    }
    else if (isObject(target)) {
        const keys = Object.keys(target);
        for (let i = 0; i < keys.length; i++) {
            if (deep_equal_1.default(target[keys[i]], value)) {
                delete target[keys[i]];
                return true;
            }
        }
    }
    return false;
}
exports.findAndDelete = findAndDelete;
/**
 * Finds and deletes all encounters of value in target
 * @param target
 * @param value
 * @returns true if anything has been deleted, otherwise - false
 */
function findAndDeleteAll(target, value) {
    let flag = false;
    while (findAndDelete(target, value)) {
        flag = true;
    }
    return flag;
}
exports.findAndDeleteAll = findAndDeleteAll;
//# sourceMappingURL=index.js.map