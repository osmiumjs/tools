declare const asyncFunctionPattern: string;
/** Is value an *AsyncFunction* */
declare function isAsyncFunction(value: any, asyncPattern?: string): boolean;
/** Is value a *null* */
declare function isNull(value: any): boolean;
/** Is value an *undefined* */
declare function isUndefined(value: any): boolean;
/** Is value a *Function* */
declare function isFunction(value: any): boolean;
/** Is value an *Array* */
declare function isArray(value: any): boolean;
/**
 * Is value an *Array* with length == 0
 */
declare function isEmptyArray(value: any): boolean;
/** Is value an *object* */
declare function isObject(value: any): boolean;
/** Is value an *object* and without keys */
declare function isEmptyObject(value: any): boolean;
/** Is value a Native *Object* */
declare function isNativeObject(value: any): boolean;
/** Is value a *string* */
declare function isString(value: any): boolean;
/** Is value a *boolean* */
declare function isBoolean(value: any): boolean;
/** Is value a *number* */
declare function isNumber(value: any): boolean;
/** Is value an Integer *number* */
declare function isInteger(value: any): boolean;
/** Is valuse an Float */
declare function isFloat(value: any): boolean;
/** [[include: is-positive-integer.md]] */
declare function isPositiveInteger(value: any): boolean;
/** Is value symbol */
declare function isSymbol(value: any, name?: boolean | string): boolean;
/** Is value iterable (*object* or *Array* with not zero length) */
declare function isIterable(value: any): boolean;
/** Is value a JSON and can be decoded as *object* */
declare function isJSON(value: any): boolean;
/** Is value a valid GUIDv4 *string* */
declare function isGUIDv4(value: any): boolean;
/**
 * Is value a valid GUID *string*
 */
declare function isGUID(value: any): boolean;
/**
 * Is value a *RegExp*
 */
declare function isRegExp(value: any): boolean;
export { isArray, isString, isBoolean, isEmptyArray, isEmptyObject, isFloat, isFunction, isGUID, isGUIDv4, isAsyncFunction, isInteger, isJSON, isNativeObject, isIterable, isNull, isNumber, isPositiveInteger, isRegExp, isSymbol, isUndefined, isObject, asyncFunctionPattern };
