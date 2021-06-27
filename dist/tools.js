"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.delay = exports.toArray = exports.setDefaults = exports.objectToArray = exports.nop$ = exports.nop = exports.escapeRegExp = exports.arrayToObject = exports.UID = exports.GUID = void 0;
const iterations = require("./iteraions");
const validations = require("./validations");
/** [[include: guid.md]]
 *  @returns {string} GUIDv4 string
 */
function GUID(mask = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx') {
    return mask.replace(/[xy]/g, (c) => {
        let r = Math.random() * 16 | 0;
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}
exports.GUID = GUID;
/** Generate 128bit unique id
 *  @param prefix
 *  @param mask
 */
function UID(prefix = '', mask = 'xxxxxxxxxxxxxxxxxx-xxxxxx') {
    return `${prefix}${mask}`.replace(/[x]/g, () => (Math.random() * 36 | 0).toString(36)[Math.random() >= 0.5 ? 'toUpperCase' : 'toLowerCase']());
}
exports.UID = UID;
/** [[include: TAnyArray-to-object.md]]
 *  @param value
 *  @param toKeys
 */
function arrayToObject(value, toKeys) {
    return (iterations.iterate(value, (row, idx, iter) => {
        if (toKeys) {
            if (validations.isInteger(row) || validations.isString(row))
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
/** [[include: object-to-TAnyArray.md]] */
function objectToArray(value, toKeys) {
    return iterations.iterate(value, (val, key) => toKeys ? key : val, []);
}
exports.objectToArray = objectToArray;
/** [[include: to-TAnyArray.md]] */
function toArray(value) {
    return validations.isArray(value) ? value : [value];
}
exports.toArray = toArray;
/** Sync void empty function (No Operation) */
function nop() { }
exports.nop = nop;
/** Async void empty function (No Operation Async) */
async function nop$() {
    return new Promise(resolve => resolve());
}
exports.nop$ = nop$;
/** [[include: set-defaults.md]] */
function setDefaults(obj, name, value) {
    if (validations.isUndefined(obj[name])) {
        obj[name] = value;
    }
    return obj;
}
exports.setDefaults = setDefaults;
/** Escapes all special RegExp characters */
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
//# sourceMappingURL=tools.js.map