/**
 * Tools and utils needed everywhere
 */
/**
 * Object with any fields
 */
declare type TAnyObject = {
    [key: string]: any;
};
/**
 * Array with any element's type
 */
declare type TAnyArray = Array<any>;
/**
 * String or number
 */
declare type TStringOrNumber = string | number;
/**
 * Promise with all possible iterate return values
 */
declare type TIteratePromiseResult = Promise<number | undefined | boolean | TAnyObject | TAnyArray>;
/**
 * All possible iterate return values (include TIteratePromiseResult for async mode)
 */
declare type TIterateResult = number | undefined | boolean | TAnyObject | TAnyArray | TIteratePromiseResult;
/**
 * [[include: guid.md]]
 * @returns {string} GUIDv4 string
 */
declare function GUID(): string;
/**
 * Is value an *AsyncFunction*
 */
declare function isAsyncFunction(value: any): boolean;
/**
 * Is value a *Function*
 */
declare function isFunction(value: any): boolean;
/**
 * Is value an *undefined*
 */
declare function isUndefined(value: any): boolean;
/**
 * Is value an *Array*
 */
declare function isArray(value: any): boolean;
/**
 * Is value an *object*
 */
declare function isObject(value: any): boolean;
/**
 * Is value a Native *Object*
 */
declare function isNativeObject(value: any): boolean;
/**
 * Is value a *string*
 */
declare function isString(value: any): boolean;
/**
 * Is value a *null*
 */
declare function isNull(value: any): boolean;
/**
 * Is value a *boolean*
 */
declare function isBoolean(value: any): boolean;
/**
 * Is value a *number*
 */
declare function isNumber(value: any): boolean;
/**
 * Is value an Integer *number*
 */
declare function isInteger(value: any): boolean;
/**
 * [[include: is-positive-integer.md]]
 */
declare function isPositiveInteger(value: any): boolean;
/**
 * Is value iterable (*object* or *Array* with not zero length)
 */
declare function isIterable(value: any): boolean;
/**
 * Is value a JSON and can be decoded as *object*
 */
declare function isJSON(value: any): boolean;
/**
 * Is value a valid GUIDv4 *string*
 */
declare function isGUIDv4(value: any): boolean;
/**
 * Is value a valid GUID *string*
 */
declare function isGUID(value: any): boolean;
/**
 * [[include: to-TAnyArray.md]]
 */
declare function toArray(value: any): TAnyArray;
/**
 * [[include: TAnyArray-to-object.md]]
 * @param value
 * @param toKeys
 */
declare function arrayToObject(value: TAnyArray, toKeys?: boolean | false): TAnyObject;
/**
 * [[include: object-to-TAnyArray.md]]
 */
declare function objectToArray(value: object, toKeys?: boolean | false): TAnyArray;
/**
 * Sync void empty function (No Operation)
 */
declare function nop(): void;
/**
 * Async void empty function (No Operation Async)
 */
declare function nop$(): Promise<void>;
/**
 * [[include: set-defaults.md]]
 */
declare function setDefaults(obj: TAnyObject, name: TStringOrNumber, value?: any): object;
/**
 * @deprecated
 * Escapes all special RegExp characters
 */
declare function escapeRegExp(value: string): string;
/**
 * Waits for ms via async/await
 * @param ms time to wait or 100
 */
declare function delay(ms?: number): Promise<void>;
/**
 * @deprecated
 * @ignore
 */
declare function log(...msg: any): void;
/**
 * [[include: iterate.md]]
 *
 * @param value
 * @param callback
 * @param accumulate
 * @param assign
 */
declare function iterate(value: object | TAnyArray | number, callback: Function, accumulate?: TAnyArray | object | false, assign?: boolean | false): TIterateResult;
/**
 * [[include: iterate-keys.md]]
 * @param value
 * @param callback
 * @param accumulate
 */
declare function iterateKeys(value: object | TAnyArray, callback: Function, accumulate?: TAnyArray | object | false): TIterateResult;
/**
 * [[include: iterate-parallel.md]]
 * @param value
 * @param callback
 */
declare function iterateParallel(value: object | TAnyArray, callback: Function): TIteratePromiseResult;
/**
 * Finds and deletes first encounter of value in target
 * @param target
 * @param value
 * @returns true if an element has been deleted, otherwise - false
 */
declare function findAndDelete(target: TAnyObject | TAnyArray, value: any): boolean;
/**
 * Finds and deletes all encounters of value in target
 * @param target
 * @param value
 * @returns true if anything has been deleted, otherwise - false
 */
declare function findAndDeleteAll(target: TAnyObject | TAnyArray, value: any): boolean;
export { nop, nop$, isAsyncFunction, isFunction, isUndefined, isArray, isObject, isNativeObject, isString, isNull, isBoolean, isNumber, isInteger, isPositiveInteger, isIterable, isJSON, isGUID, isGUIDv4, GUID, toArray, objectToArray, setDefaults, log, escapeRegExp, iterate, delay, iterateKeys, iterateParallel, arrayToObject, delay as sleep, // alias for sleep
findAndDelete, findAndDeleteAll };
