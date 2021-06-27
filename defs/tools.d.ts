import * as types from './types';
/** [[include: guid.md]]
 *  @returns {string} GUIDv4 string
 */
declare function GUID(mask?: string): string;
/** Generate 128bit unique id
 *  @param prefix
 *  @param mask
 */
declare function UID(prefix?: string, mask?: string): string;
/** [[include: TAnyArray-to-object.md]]
 *  @param value
 *  @param toKeys
 */
declare function arrayToObject(value: types.TAnyArray, toKeys?: boolean | false): types.TAnyObject;
/** [[include: object-to-TAnyArray.md]] */
declare function objectToArray(value: object, toKeys?: boolean | false): Array<any>;
/** [[include: to-TAnyArray.md]] */
declare function toArray<T = any>(value: T | Array<T>): Array<T>;
/** Sync void empty function (No Operation) */
declare function nop(): void;
/** Async void empty function (No Operation Async) */
declare function nop$(): Promise<void>;
/** [[include: set-defaults.md]] */
declare function setDefaults(obj: types.TAnyObject, name: types.TStringOrNumber, value?: any): object;
/** Escapes all special RegExp characters */
declare function escapeRegExp(value: string): string;
/**
 * Waits for ms via async/await
 * @param ms time to wait or 100
 */
declare function delay(ms?: number): Promise<void>;
export { GUID, UID, arrayToObject, escapeRegExp, nop, nop$, objectToArray, setDefaults, toArray, delay };
