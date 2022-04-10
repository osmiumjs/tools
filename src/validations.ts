// noinspection JSUnusedGlobalSymbols
import exp = require('constants');

const asyncFunctionPattern: string = '$TvNd3G0XQ1gN';

function testConstructor(constructorName: string, value: any): boolean {
	return !isUndefined(value)
		&& !isNull(value)
		&& value.constructor &&
		value.constructor.name === constructorName;
}

/** Is value an *AsyncFunction* */
export function isAsyncFunction(value: any, asyncPattern: string = ''): boolean {
	if (!value) return false;

	return testConstructor('AsyncFunction', value) ||
		(testConstructor('Function', value)
			&& (
				value.toString().indexOf(asyncPattern.length > 1 ? asyncPattern : asyncFunctionPattern) > 0
				|| (value.toString().indexOf('return __awaiter(this') > 0 && value.toString().indexOf('return __generator(this') > 0)
			));

}

/** Is value a *null* */
export function isNull(value: any): boolean {
	return Object.prototype.toString.call(value) === '[object Null]';
}

/** Is value an *undefined* */
export function isUndefined(value: any): boolean {
	return typeof value === 'undefined';
}

/** Is value a *Function* */
export function isFunction(value: any): boolean {
	return testConstructor('Function', value)
		|| isAsyncFunction(value);
}

/** Is value an *Array* */
export function isArray(value: any): boolean {
	return testConstructor('Array', value);
}

/**
 * Is value an *Array* with length == 0
 */
export function isEmptyArray(value: any): boolean {
	return isArray(value)
		&& value.length === 0;
}

/** Is value an *object* */
export function isObject(value: any): boolean {
	return ({}.toString.call(value)) === '[object Object]';
}

/** Is value an *object* and without keys */
export function isEmptyObject(value: any): boolean {
	return isObject(value)
		&& Object.keys(value).length === 0;
}

/** Is value a Native *Object* */
export function isNativeObject(value: any): boolean {
	return testConstructor('Object', value);
}

/** Is value a *string* */
export function isString(value: any): boolean {
	return testConstructor('String', value);
}

/** Is value a *boolean* */
export function isBoolean(value: any): boolean {
	return Object.prototype.toString.call(value) === '[object Boolean]';
}

/** Is value a *number* */
export function isNumber(value: any): boolean {
	return Number.isFinite(value) && !isNaN(parseFloat(value));
}

/** Is value an Integer *number* */
export function isInteger(value: any): boolean {
	return Number.isSafeInteger(value);
}

/** Is valuse an Float */
export function isFloat(value: any) {
	return isNumber(value)
		&& !isInteger(value);
}

/** [[include: is-positive-integer.md]] */
export function isPositiveInteger(value: any): boolean {
	return isInteger(value)
		&& value >= 0;
}

/** Is value symbol */
export function isSymbol(value: any, name: boolean | string = false) {
	return typeof value === 'symbol'
		&& (!name || (value as Symbol).description === name);
}

/** Is value iterable (*object* or *Array* with not zero length) */
export function isIterable(value: any): boolean {
	return (isObject(value) ? !!Object.keys(value).length : false)
		|| (isArray(value) ? !!value.length : false);
}

/** Is value a JSON and can be decoded as *object* */
export function isJSON(value: any): boolean {
	if (!isString(value)) return false;

	try {
		const obj: object = JSON.parse(value);
		return !!obj && typeof obj === 'object';
	} catch (e) {}

	return false;
}

/** Is value a valid GUIDv4 *string* */
export function isGUIDv4(value: any): boolean {
	return isString(value)
		&& /^[\dA-F]{8}-[\dA-F]{4}-4[\dA-F]{3}-[89AB][\dA-F]{3}-[\dA-F]{12}$/i.test(value);
}

/**
 * Is value a valid GUID *string*
 */
export function isGUID(value: any): boolean {
	return isString(value)
		&& /^[\dA-F]{8}-[\dA-F]{4}-[\dA-F]{4}-[\dA-F]{4}-[\dA-F]{12}$/i.test(value);
}

/**
 * Is value a *RegExp*
 */
export function isRegExp(value: any): boolean {
	return testConstructor('RegExp', value)
		|| isAsyncFunction(value);
}

export function isMap(value: any): boolean {
	return value instanceof Map;
}

export function isSet(value: any): boolean {
	return value instanceof Set;
}