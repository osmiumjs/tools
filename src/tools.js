"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.delay = exports.toArray = exports.setDefaults = exports.objectToArray = exports.nop$ = exports.nop = exports.escapeRegExp = exports.arrayToObject = exports.UID = exports.GUID = void 0;
var iterations = require("./iteraions");
var validations = require("./validations");
/** [[include: guid.md]]
 *  @returns {string} GUIDv4 string
 */
function GUID(mask) {
    if (mask === void 0) { mask = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'; }
    return mask.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0;
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}
exports.GUID = GUID;
/** Generate 128bit unique id
 *  @param prefix
 *  @param mask
 */
function UID(prefix, mask) {
    if (prefix === void 0) { prefix = ''; }
    if (mask === void 0) { mask = 'xxxxxxxxxxxxxxxxxx-xxxxxx'; }
    return ("" + prefix + mask).replace(/[x]/g, function () { return (Math.random() * 36 | 0).toString(36)[Math.random() >= 0.5 ? 'toUpperCase' : 'toLowerCase'](); });
}
exports.UID = UID;
/** [[include: TAnyArray-to-object.md]]
 *  @param value
 *  @param toKeys
 */
function arrayToObject(value, toKeys) {
    return (iterations.iterate(value, function (row, idx, iter) {
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
    return iterations.iterate(value, function (val, key) { return toKeys ? key : val; }, []);
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
function nop$() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve) { return resolve(); })];
        });
    });
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
function delay(ms) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve) { return setTimeout(resolve, ms || 100); })];
        });
    });
}
exports.delay = delay;
