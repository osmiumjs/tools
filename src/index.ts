/**
 * Tools and utils needed everywhere
 */

import deepEqual from 'deep-equal';

/**
 * Object with any fields
 */
type TAnyObject = { [key: string]: any };

/**
 * Array with any element's type
 */
type TAnyArray = Array<any>;

/**
 * Promise with any return type
 */
type TAnyPromise = Promise<any>;

/**
 * String or number
 */
type TStringOrNumber = string | number;

/**
 * All possible iterate return values
 */
type TIterateDataResult = TStringOrNumber | undefined | boolean | TAnyObject | TAnyArray;

/**
 * Promise with all possible iterate return values
 */
type TIteratePromiseResult = Promise<TIterateDataResult>;

/**
 * All possible iterate return values (include TIteratePromiseResult for async mode)
 */
type TIterateResult = TIterateDataResult | TIteratePromiseResult;

/**
 * @ignore
 * @private
 */
interface IIteration {
	'break': Function,
	accKeyName: TStringOrNumber,
	key: Function
}

/**
 * [[include: guid.md]]
 * @returns {string} GUIDv4 string
 */
function GUID(): string {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
		let r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
		return v.toString(16);
	});
}

/**
 * @ignore
 * @private
 */
function _testConstructor(constructorName: string, value: any): boolean {
	return !isUndefined(value) && !isNull(value) && value.constructor && value.constructor.name === constructorName;
}

/**
 * Is value an *AsyncFunction*
 */
function isAsyncFunction(value: any): boolean {
	if (!value) return false;
	const afcText = value.toString().toLocaleLowerCase().replace(/\n/g, '').replace(/ /g, '');
	return _testConstructor('AsyncFunction', value)
		|| ((_testConstructor('Function', value) && (afcText.slice(afcText.indexOf('{')).indexOf('returnnewpromise(function($return,$error)') === 1))); //fast-async monkey-support
}

/**
 * Is value a *Function*
 */
function isFunction(value: any): boolean {
	return _testConstructor('Function', value) || isAsyncFunction(value);
}

/**
 * Is value an *undefined*
 */
function isUndefined(value: any): boolean {
	return typeof value === 'undefined';
}

/**
 * Is value an *Array*
 */
function isArray(value: any): boolean {
	return _testConstructor('Array', value);
}

/**
 * Is value an *object*
 */
function isObject(value: any): boolean {
	return ({}.toString.call(value)) === '[object Object]';
}

/**
 * Is value a Native *Object*
 */
function isNativeObject(value: any): boolean {
	return _testConstructor('Object', value);
}

/**
 * Is value a *string*
 */
function isString(value: any): boolean {
	return _testConstructor('String', value);
}

/**
 * Is value a *null*
 */
function isNull(value: any): boolean {
	return Object.prototype.toString.call(value) === '[object Null]';
}

/**
 * Is value a *boolean*
 */
function isBoolean(value: any): boolean {
	return Object.prototype.toString.call(value) === '[object Boolean]';
}

/**
 * Is value a *number*
 */
function isNumber(value: any): boolean {
	return Number.isFinite(value);
}

/**
 * Is value an Integer *number*
 */
function isInteger(value: any): boolean {
	return Number.isSafeInteger(value);
}

/**
 * [[include: is-positive-integer.md]]
 */
function isPositiveInteger(value: any): boolean {
	return isInteger(value) && value >= 0;
}

/**
 * Is value iterable (*object* or *Array* with not zero length)
 */
function isIterable(value: any): boolean {
	return (isObject(value) ? !!Object.keys(value).length : false) || (isArray(value) ? !!value.length : false);
}


/**
 * Is value a JSON and can be decoded as *object*
 */
function isJSON(value: any): boolean {
	if (!isString(value)) return false;
	try {
		const obj: object = JSON.parse(value);
		return !!obj && typeof obj === 'object';
	} catch (e) {
	}
	return false;
}

/**
 * Is value a valid GUIDv4 *string*
 */
function isGUIDv4(value: any): boolean {
	return isString(value) && /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i.test(value);
}

/**
 * Is value a valid GUID *string*
 */
function isGUID(value: any): boolean {
	return isString(value) && /^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i.test(value);
}


/**
 * [[include: to-TAnyArray.md]]
 */
function toArray(value: any): TAnyArray {
	return isArray(value) ? value : [value];
}


/**
 * [[include: TAnyArray-to-object.md]]
 * @param value
 * @param toKeys
 */
function arrayToObject(value: TAnyArray, toKeys?: boolean | false): TAnyObject {
	return (iterate(value, (row: any, idx: any, iter: IIteration) => {
		if (toKeys) {
			if (isInteger(row) || isString(row)) iter.key(idx + 1);
			return row;
		} else {
			iter.key(row);
			return idx + 1;
		}
	}, {})) as TAnyObject
}

/**
 * [[include: object-to-TAnyArray.md]]
 */

function objectToArray(value: object, toKeys?: boolean | false): TAnyArray {
	return iterate(value, (val: any, key: any) => toKeys ? key : val, []) as TAnyArray;
}

/**
 * Sync void empty function (No Operation)
 */
function nop(): void {
}

/**
 * Async void empty function (No Operation Async)
 */
async function nop$(): Promise<void> {
}

/**
 * [[include: set-defaults.md]]
 */
function setDefaults(obj: TAnyObject, name: TStringOrNumber, value?: any): object {
	if (isUndefined(obj[name])) {
		obj[name] = value;
	}
	return obj;
}

/**
 * @deprecated
 * Escapes all special RegExp characters
 */
function escapeRegExp(value: string): string {
	return value.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1');
}

/**
 * Waits for ms via async/await
 * @param ms time to wait or 100
 */
async function delay(ms?: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms || 100));
}

/**
 * @deprecated
 * @ignore
 */
function log(...msg: any): void {
	console.log(...msg);
}

/**
 * [[include: iterate.md]]
 *
 * @param value
 * @param callback
 * @param accumulate
 * @param assign
 */
function iterate(value: object | TAnyArray | number, callback: Function, accumulate?: TStringOrNumber | TAnyArray | object | false, assign?: boolean | false): TIterateResult {
	let breakFlag: boolean = false;

	function newIteration(index: TStringOrNumber): IIteration {
		let instance = {
			'break': () => breakFlag = true,
			accKeyName: index,
			key: (name: string) => instance.accKeyName = name
		};
		return instance;
	}

	let iterateInstanceAsync = async (callback: any, val: any, index: any) => {
		let iteration = newIteration(index);
		pushRet(await callback(val, index, iteration), iteration);
	};
	let iterateInstance = (callback: any, val: any, index: any) => {
		let iteration = newIteration(index);
		pushRet(callback(val, index, iteration), iteration);
	};
	let ret = (isObject(accumulate) || isArray(accumulate) || isString(accumulate) || isInteger(accumulate)) ? accumulate : accumulate === false ? false : value;

	let pushRet = (val: any, iteration: any) => {
		if (isUndefined(val)) return;
		if (isObject(accumulate)) {
			(ret as TAnyObject)[iteration.accKeyName] = assign
				? Object.assign((ret as TAnyObject)[iteration.accKeyName] || {}, val)
				: val;
		}
		if (isArray(accumulate)) (ret as TAnyArray).push(val);
		if (isString(accumulate)) (ret as string) += val
			? isFunction(val.toString)
				? val.toString('utf8')
				: val + ''
			: '';
		if (isInteger(accumulate)) (ret as number) += isInteger(val) ? val : parseInt(val);
		if (accumulate === false) ret = ret || val;
	};
	return isAsyncFunction(callback)
		? new Promise(async (resolve) => {
			if (isArray(value)) {
				for (let index = 0; index < (value as TAnyArray).length; ++index) {
					if (breakFlag) break;
					await iterateInstanceAsync(callback, (value as TAnyObject)[index], index);
				}
				resolve(ret);
			}
			if (isObject(value)) {
				await iterate(Object.keys(value), async (index: string, _: any, iteration: IIteration) => {
					if (breakFlag) iteration.break();
					await iterateInstanceAsync(callback, (value as TAnyObject)[index], index);
				});
				resolve(ret);
			}
			if (isInteger(value)) {
				for (let index = 0; index < (value as unknown as number); ++index) {
					if (breakFlag) break;
					await iterateInstanceAsync(callback, index, index);
				}
				resolve(ret);
			}
			resolve(false);
		})
		: (() => {
			if (isArray(value)) {
				for (let index = 0; index < (value as TAnyArray).length; ++index) {
					if (breakFlag) break;
					iterateInstance(callback, (value as TAnyArray)[index], index);
				}
				return ret;
			}
			if (isObject(value)) {
				iterate(Object.keys(value), (index: any, _: any, iteration: IIteration) => {
					if (breakFlag) iteration.break();
					iterateInstance(callback, (value as TAnyObject)[index], index);
				});
				return ret;
			}
			if (isInteger(value)) {
				for (let index = 0; index < (value as unknown as number); ++index) {
					if (breakFlag) break;
					iterateInstance(callback, index, index);
				}
				return ret;
			}
			return false;
		})();
}

/**
 * [[include: iterate-keys.md]]
 * @param value
 * @param callback
 * @param accumulate
 */
function iterateKeys(value: object | TAnyArray, callback: Function, accumulate?: TAnyArray | object | false): TIterateResult {
	return isAsyncFunction(callback)
		? (async () => await iterate(value, async (row: any, key: any, iteration: IIteration) => await callback(key, row, iteration), accumulate))()
		: iterate(value, (row: any, key: any, iteration: IIteration) => callback(key, row, iteration), accumulate);
}

/**
 * [[include: iterate-parallel.md]]
 * @param value
 * @param callback
 */
async function iterateParallel(value: object | TAnyArray, callback: Function): TIteratePromiseResult {
	return Promise.all(iterate(value, (val: any, key: any, iter: any) => (async () => await callback(val, key, iter))(), []) as TAnyArray);
}

/**
 * Finds and deletes first encounter of value in target
 * @param target
 * @param value
 * @returns true if an element has been deleted, otherwise - false
 */
function findAndDelete(target: TAnyObject | TAnyArray, value: any): boolean {
	if (!isIterable(target)) return false;
	if (isArray(target)) {
		for (let i = 0; i < target.length; i++) {
			if (deepEqual((target as TAnyArray)[i], value)) {
				target.splice(i, 1);
				return true;
			}
		}
	} else if (isObject(target)) {
		const keys = Object.keys(target);
		for (let i = 0; i < keys.length; i++) {
			if (deepEqual((target as TAnyObject)[keys[i]], value)) {
				delete (target as TAnyObject)[keys[i]];
				return true;
			}
		}
	}
	return false;
}

/**
 * Finds and deletes all encounters of value in target
 * @param target
 * @param value
 * @returns true if anything has been deleted, otherwise - false
 */
function findAndDeleteAll(target: TAnyObject | TAnyArray, value: any): boolean {
	let flag = false;
	while (findAndDelete(target, value)) {
		flag = true;
	}
	return flag;
}

export {
	nop,
	nop$,
	isAsyncFunction,
	isFunction,
	isUndefined,
	isArray,
	isObject,
	isNativeObject,
	isString,
	isNull,
	isBoolean,
	isNumber,
	isInteger,
	isPositiveInteger,
	isIterable,
	isJSON,
	isGUID,
	isGUIDv4,

	GUID,
	toArray,
	objectToArray,
	setDefaults,
	log,
	escapeRegExp,
	iterate,
	delay,
	iterateKeys,
	iterateParallel,
	arrayToObject,
	delay as sleep, // alias for sleep
	findAndDelete,
	findAndDeleteAll
};
