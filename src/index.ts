/**
 * Tools and utils needed everywhere
 */

import deepEqual from 'deep-equal';

/**
 * Object with any fields
 */
interface IObjectAny {
	[key: string]: any,
}

/**
 * @ignore
 * @private
 */
interface IIteration {
	'break': Function,
	accKeyName: string | number,
	key: Function,
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
	let afcText = value.toString().toLocaleLowerCase().replace(/\n/g, '').replace(/ /g, '');
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
 * [[include: to-array.md]]
 */
function toArray(value: any): Array<any> {
	return isArray(value) ? value : [value];
}


/**
 * [[include: array-to-object.md]]
 * @param value
 * @param toKeys
 */
function arrayToObject(value: Array<any>, toKeys?: boolean | false): IObjectAny {
	return (iterate(value, (row: any, idx: any, iter: IIteration) => {
		if (toKeys) {
			if (isInteger(row) || isString(row)) iter.key(idx + 1);
			return row;
		} else {
			iter.key(row);
			return idx + 1;
		}
	}, {})) as IObjectAny
}

/**
 * [[include: object-to-array.md]]
 */

function objectToArray(value: object, toKeys?: boolean | false): Array<any> {
	return iterate(value, (val: any, key: any) => toKeys ? key : val, []) as Array<any>;
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
function setDefaults(obj: IObjectAny, name: string | number, value?: any): object {
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
function iterate(value: object | Array<any> | number, callback: Function, accumulate?: Array<any> | object | false, assign?: boolean | false): number | undefined | boolean | IObjectAny | Array<any> {
	let breakFlag: boolean = false;

	function newIteration(index: string | number): IIteration {
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
	let ret = isObject(accumulate) ? accumulate : isArray(accumulate) ? accumulate : accumulate === true ? false : value;
	let pushRet = (val: any, iteration: any) => {
		if (isUndefined(val)) return;
		if (isObject(accumulate)) {
			(ret as IObjectAny)[iteration.accKeyName] = assign
				? Object.assign((ret as IObjectAny)[iteration.accKeyName] || {}, val)
				: val;
		}
		if (isArray(accumulate)) (ret as Array<any>).push(val);
		if (accumulate === true) ret = ret || val;
	};
	return isAsyncFunction(callback)
		? new Promise(async (resolve) => {
			if (isArray(value)) {
				for (let index = 0; index < (value as Array<any>).length; ++index) {
					if (breakFlag) break;
					await iterateInstanceAsync(callback, (value as IObjectAny)[index], index);
				}
				resolve(ret);
			}
			if (isObject(value)) {
				await iterate(Object.keys(value), async (index: string, _: any, iteration: IIteration) => {
					if (breakFlag) iteration.break();
					await iterateInstanceAsync(callback, (value as IObjectAny)[index], index);
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
				for (let index = 0; index < (value as Array<any>).length; ++index) {
					if (breakFlag) break;
					iterateInstance(callback, (value as Array<any>)[index], index);
				}
				return ret;
			}
			if (isObject(value)) {
				iterate(Object.keys(value), (index: any, _: any, iteration: IIteration) => {
					if (breakFlag) iteration.break();
					iterateInstance(callback, (value as IObjectAny)[index], index);
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
function iterateKeys(value: object | Array<any>, callback: Function, accumulate?: Array<any> | object | false): number | undefined | boolean | IObjectAny | Array<any> {
	return isAsyncFunction(callback)
		? (async () => await iterate(value, async (row: any, key: any, iteration: IIteration) => await callback(key, row, iteration), accumulate))()
		: iterate(value, (row: any, key: any, iteration: IIteration) => callback(key, row, iteration), accumulate);
}


/**
 * [[include: iterate-parallel.md]]
 * @param value
 * @param callback
 */
async function iterateParallel(value: object | Array<any>, callback: Function): Promise<any> {
	return Promise.all(iterate(value, (val: any, key: any, iter: any) => (async () => await callback(val, key, iter))(), []) as Array<any>);
}

/**
 * Finds and deletes first encounter of value in target
 * @param target
 * @param value
 * @returns true if an element has been deleted, otherwise - false
 */
function findAndDelete(target: IObjectAny | Array<any>, value: any): boolean {
	if (!isIterable(target)) return false;
	if (isArray(target)) {
		for (let i = 0; i < target.length; i++) {
			if (deepEqual((target as Array<any>)[i], value)) {
				target.splice(i, 1);
				return true;
			}
		}
	} else if (isObject(target)) {
		let keys = Object.keys(target);
		for (let i = 0; i < keys.length; i++) {
			if (deepEqual((target as IObjectAny)[keys[i]], value)) {
				delete (target as IObjectAny)[keys[i]];
				return true;
			}
		}
	}
	return false
}

/**
 * Finds and deletes all encounters of value in target
 * @param target
 * @param value
 * @returns true if anything has been deleted, otherwise - false
 */
function findAndDeleteAll(target: IObjectAny | Array<any>, value: any): boolean {
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
	delay as sleep, // just a binding
	findAndDelete,
	findAndDeleteAll
};