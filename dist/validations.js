"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncFunctionPattern = exports.isObject = exports.isUndefined = exports.isSymbol = exports.isRegExp = exports.isPositiveInteger = exports.isNumber = exports.isNull = exports.isIterable = exports.isNativeObject = exports.isJSON = exports.isInteger = exports.isAsyncFunction = exports.isGUIDv4 = exports.isGUID = exports.isFunction = exports.isFloat = exports.isEmptyObject = exports.isEmptyArray = exports.isBoolean = exports.isString = exports.isArray = void 0;
const asyncFunctionPattern = '$TvNd3G0XQ1gN';
exports.asyncFunctionPattern = asyncFunctionPattern;
function testConstructor(constructorName, value) {
    return !isUndefined(value)
        && !isNull(value)
        && value.constructor &&
        value.constructor.name === constructorName;
}
/** Is value an *AsyncFunction* */
function isAsyncFunction(value, asyncPattern = '') {
    if (!value)
        return false;
    return testConstructor('AsyncFunction', value) ||
        ((testConstructor('Function', value)
            && (value.toString().indexOf(asyncPattern.length > 1 ? asyncPattern : asyncFunctionPattern) > 0
                || (value.toString().indexOf('return __awaiter(this') > 0 && value.toString().indexOf('return __generator(this') > 0))));
}
exports.isAsyncFunction = isAsyncFunction;
/** Is value a *null* */
function isNull(value) {
    return Object.prototype.toString.call(value) === '[object Null]';
}
exports.isNull = isNull;
/** Is value an *undefined* */
function isUndefined(value) {
    return typeof value === 'undefined';
}
exports.isUndefined = isUndefined;
/** Is value a *Function* */
function isFunction(value) {
    return testConstructor('Function', value)
        || isAsyncFunction(value);
}
exports.isFunction = isFunction;
/** Is value an *Array* */
function isArray(value) {
    return testConstructor('Array', value);
}
exports.isArray = isArray;
/**
 * Is value an *Array* with length == 0
 */
function isEmptyArray(value) {
    return isArray(value)
        && value.length === 0;
}
exports.isEmptyArray = isEmptyArray;
/** Is value an *object* */
function isObject(value) {
    return ({}.toString.call(value)) === '[object Object]';
}
exports.isObject = isObject;
/** Is value an *object* and without keys */
function isEmptyObject(value) {
    return isObject(value)
        && Object.keys(value).length === 0;
}
exports.isEmptyObject = isEmptyObject;
/** Is value a Native *Object* */
function isNativeObject(value) {
    return testConstructor('Object', value);
}
exports.isNativeObject = isNativeObject;
/** Is value a *string* */
function isString(value) {
    return testConstructor('String', value);
}
exports.isString = isString;
/** Is value a *boolean* */
function isBoolean(value) {
    return Object.prototype.toString.call(value) === '[object Boolean]';
}
exports.isBoolean = isBoolean;
/** Is value a *number* */
function isNumber(value) {
    return Number.isFinite(value) && !isNaN(parseFloat(value));
}
exports.isNumber = isNumber;
/** Is value an Integer *number* */
function isInteger(value) {
    return Number.isSafeInteger(value);
}
exports.isInteger = isInteger;
/** Is valuse an Float */
function isFloat(value) {
    return isNumber(value)
        && !isInteger(value);
}
exports.isFloat = isFloat;
/** [[include: is-positive-integer.md]] */
function isPositiveInteger(value) {
    return isInteger(value)
        && value >= 0;
}
exports.isPositiveInteger = isPositiveInteger;
/** Is value symbol */
function isSymbol(value, name = false) {
    return typeof value === 'symbol'
        && (!name || value.description === name);
}
exports.isSymbol = isSymbol;
/** Is value iterable (*object* or *Array* with not zero length) */
function isIterable(value) {
    return (isObject(value) ? !!Object.keys(value).length : false)
        || (isArray(value) ? !!value.length : false);
}
exports.isIterable = isIterable;
/** Is value a JSON and can be decoded as *object* */
function isJSON(value) {
    if (!isString(value))
        return false;
    try {
        const obj = JSON.parse(value);
        return !!obj && typeof obj === 'object';
    }
    catch (e) { }
    return false;
}
exports.isJSON = isJSON;
/** Is value a valid GUIDv4 *string* */
function isGUIDv4(value) {
    return isString(value)
        && /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i.test(value);
}
exports.isGUIDv4 = isGUIDv4;
/**
 * Is value a valid GUID *string*
 */
function isGUID(value) {
    return isString(value)
        && /^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i.test(value);
}
exports.isGUID = isGUID;
/**
 * Is value a *RegExp*
 */
function isRegExp(value) {
    return testConstructor('RegExp', value)
        || isAsyncFunction(value);
}
exports.isRegExp = isRegExp;
//# sourceMappingURL=validations.js.map