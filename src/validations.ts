// noinspection JSUnusedGlobalSymbols

const asyncFunctionPattern: string = '$TvNd3G0XQ1gN';

function testConstructor(constructorName: string, value: any): boolean {
	return !isUndefined(value)
	       && !isNull(value)
	       && value.constructor &&
	       value.constructor.name === constructorName;
}

/** Is value an *AsyncFunction* */
function isAsyncFunction(value: any, asyncPattern: string = ''): boolean {
	if (!value) return false;

	return testConstructor('AsyncFunction', value) ||
	       ((testConstructor('Function', value)
	         && (
		         value.toString().indexOf(asyncPattern.length > 1 ? asyncPattern : asyncFunctionPattern) > 0
		         || (value.toString().indexOf('return __awaiter(this') > 0 && value.toString().indexOf('return __generator(this') > 0)
	         )));

}

/** Is value a *null* */
function isNull(value: any): boolean {
	return Object.prototype.toString.call(value) === '[object Null]';
}

/** Is value an *undefined* */
function isUndefined(value: any): boolean {
	return typeof value === 'undefined';
}

/** Is value a *Function* */
function isFunction(value: any): boolean {
	return testConstructor('Function', value)
	       || isAsyncFunction(value);
}

/** Is value an *Array* */
function isArray(value: any): boolean {
	return testConstructor('Array', value);
}

/**
 * Is value an *Array* with length == 0
 */
function isEmptyArray(value: any): boolean {
	return isArray(value)
	       && value.length === 0;
}

/** Is value an *object* */
function isObject(value: any): boolean {
	return ({}.toString.call(value)) === '[object Object]';
}

/** Is value an *object* and without keys */
function isEmptyObject(value: any): boolean {
	return isObject(value)
	       && Object.keys(value).length === 0;
}

/** Is value a Native *Object* */
function isNativeObject(value: any): boolean {
	return testConstructor('Object', value);
}

/** Is value a *string* */
function isString(value: any): boolean {
	return testConstructor('String', value);
}

/** Is value a *boolean* */
function isBoolean(value: any): boolean {
	return Object.prototype.toString.call(value) === '[object Boolean]';
}

/** Is value a *number* */
function isNumber(value: any): boolean {
	return Number.isFinite(value) && !isNaN(parseFloat(value));
}

/** Is value an Integer *number* */
function isInteger(value: any): boolean {
	return Number.isSafeInteger(value);
}

/** Is valuse an Float */
function isFloat(value: any) {
	return isNumber(value)
	       && !isInteger(value);
}

/** [[include: is-positive-integer.md]] */
function isPositiveInteger(value: any): boolean {
	return isInteger(value)
	       && value >= 0;
}

/** Is value symbol */
function isSymbol(value: any, name: boolean | string = false) {
	return typeof value === 'symbol'
	       && (!name || (value as Symbol).description === name);
}

/** Is value iterable (*object* or *Array* with not zero length) */
function isIterable(value: any): boolean {
	return (isObject(value) ? !!Object.keys(value).length : false)
	       || (isArray(value) ? !!value.length : false);
}

/** Is value a JSON and can be decoded as *object* */
function isJSON(value: any): boolean {
	if (!isString(value)) return false;

	try {
		const obj: object = JSON.parse(value);
		return !!obj && typeof obj === 'object';
	} catch (e) {}

	return false;
}

/** Is value a valid GUIDv4 *string* */
function isGUIDv4(value: any): boolean {
	return isString(value)
	       && /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i.test(value);
}

/**
 * Is value a valid GUID *string*
 */
function isGUID(value: any): boolean {
	return isString(value)
	       && /^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i.test(value);
}

/**
 * Is value a *RegExp*
 */
function isRegExp(value: any): boolean {
	return testConstructor('RegExp', value)
	       || isAsyncFunction(value);
}

export {
	isArray,
	isString,
	isBoolean,
	isEmptyArray,
	isEmptyObject,
	isFloat,
	isFunction,
	isGUID,
	isGUIDv4,
	isAsyncFunction,
	isInteger,
	isJSON,
	isNativeObject,
	isIterable,
	isNull,
	isNumber,
	isPositiveInteger,
	isRegExp,
	isSymbol,
	isUndefined,
	isObject,
	asyncFunctionPattern
};
