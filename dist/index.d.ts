/**
 * Tools and utils needed everywhere
 */
/**
 * Object with any fields
 */
interface IObjectAny {
    [key: string]: any;
}
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
 * [[include: to-array.md]]
 */
declare function toArray(value: any): Array<any>;
/**
 * [[include: array-to-object.md]]
 * @param value
 * @param toKeys
 */
declare function arrayToObject(value: Array<any>, toKeys?: boolean | false): IObjectAny;
/**
 * [[include: object-to-array.md]]
 */
declare function objectToArray(value: object, toKeys?: boolean | false): Array<any>;
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
declare function setDefaults(obj: IObjectAny, name: string | number, value?: any): object;
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
declare function iterate(value: object | Array<any> | number, callback: Function, accumulate?: Array<any> | object | false, assign?: boolean | false): number | undefined | boolean | IObjectAny | Array<any>;
/**
 * [[include: iterate-keys.md]]
 * @param value
 * @param callback
 * @param accumulate
 */
declare function iterateKeys(value: object | Array<any>, callback: Function, accumulate?: Array<any> | object | false): number | undefined | boolean | IObjectAny | Array<any>;
/**
 * [[include: iterate-parallel.md]]
 * @param value
 * @param callback
 */
declare function iterateParallel(value: object | Array<any>, callback: Function): Promise<any>;
/**
 * Finds and deletes first encounter of value in target
 * @param target
 * @param value
 * @returns true if an element has been deleted, otherwise - false
 */
declare function findAndDelete(target: IObjectAny | Array<any>, value: any): boolean;
/**
 * Finds and deletes all encounters of value in target
 * @param target
 * @param value
 * @returns true if anything has been deleted, otherwise - false
 */
declare function findAndDeleteAll(target: IObjectAny | Array<any>, value: any): boolean;
export { nop, nop$, isAsyncFunction, isFunction, isUndefined, isArray, isObject, isNativeObject, isString, isNull, isBoolean, isNumber, isInteger, isPositiveInteger, isIterable, isJSON, isGUID, isGUIDv4, GUID, toArray, objectToArray, setDefaults, log, escapeRegExp, iterate, delay, iterateKeys, iterateParallel, arrayToObject, delay as sleep, // just a binding
findAndDelete, findAndDeleteAll };
