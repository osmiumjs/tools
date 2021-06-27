import * as validation from './validations';
import * as types from './types';
import {TIterableValue} from './types';

interface IIteration {
	break: Function,
	accKeyName: types.TStringOrNumber,
	key: Function
}

/** [[include: iterate.md]]
 * @param value
 * @param callback
 * @param accumulate
 * @param assign
 */
function iterate<T = any, U = any>(value: Array<T>, callback: (row: T, index: number, iteration: IIteration) => U, accumulate?: types.TAccumulate, assign?: types.TAssign): types.TIterateResult
function iterate<T extends Object, U = any>(value: { [key: string]: T }, callback: (row: T, index: string, iteration: IIteration) => U, accumulate?: types.TAccumulate, assign?: types.TAssign): types.TIterateResult
function iterate<U = any>(value: string, callback: (row: string, index: number, iteration: IIteration) => U, accumulate?: types.TAccumulate, assign?: types.TAssign): types.TIterateResult
function iterate<U = any>(value: number, callback: (row: number, index: number, iteration: IIteration) => U, accumulate?: types.TAccumulate, assign?: types.TAssign): types.TIterateResult
function iterate(value: any, callback: (row: any, index: any, iteration: IIteration) => any, accumulate?: types.TAccumulate, assign?: types.TAssign): types.TIterateResult {
	let breakFlag: boolean = false;

	function newIteration(index: types.TStringOrNumber): IIteration {
		let instance = {
			break     : () => breakFlag = true,
			accKeyName: index,
			key       : (name: string) => instance.accKeyName = name
		};
		return instance;
	}

	let iterateInstanceAsync = async (val: any, index: types.TStringOrNumber) => {
		let iteration = newIteration(index);

		pushRet(await callback(val, index, iteration), iteration);
	};

	let iterateInstance = (val: any, index: types.TStringOrNumber) => {
		let iteration = newIteration(index);

		pushRet(callback(val, index, iteration), iteration);
	};

	let ret = validation.isObject(accumulate)
	          || validation.isArray(accumulate)
	          || validation.isString(accumulate)
	          || validation.isInteger(accumulate)
	          ? accumulate
	          : accumulate === false
	            ? false
	            : value;

	let pushRet = (val: any, iteration: IIteration) => {
		if (validation.isUndefined(val)) return;

		if (validation.isObject(accumulate)) {
			(ret)[iteration.accKeyName]
				= assign
				  ? Object.assign((ret)[iteration.accKeyName] || {}, val)
				  : val;
		}

		if (validation.isArray(accumulate)) ret.push(val);

		if (validation.isString(accumulate)) {
			(ret as string)
				+= val
				   ? validation.isFunction(val.toString)
				     ? val.toString(validation.isInteger(val) ? undefined : 'utf8')
				     : val + ''
				   : '';
		}

		if (validation.isInteger(accumulate)) {
			(ret as number)
				+= validation.isInteger(val)
				   ? val
				   : parseInt(val);
		}

		if (accumulate === false) ret = ret || val;
	};

	return validation.isAsyncFunction(callback)
	       ? new Promise(async (resolve, reject) => {
			try {
				if (validation.isArray(value)) {
					for (let index = 0; index < (value as Array<any>).length; ++index) {
						if (breakFlag) break;
						await iterateInstanceAsync(value[index], index);
					}
					resolve(ret);
				}

				if (validation.isObject(value)) {
					await iterate(Object.keys(value), async (index, _: any, iteration: IIteration) => {
						if (breakFlag) iteration.break();
						await iterateInstanceAsync(value[index], index);
					});
					resolve(ret);
				}

				if (validation.isInteger(value)) {
					for (let index = 0; index < value; ++index) {
						if (breakFlag) break;
						await iterateInstanceAsync(index, index);
					}
					resolve(ret);
				}
			} catch (e) {
				reject(e);
			}
			resolve(false);
		})
	       : (() => {
			if (validation.isArray(value)) {
				for (let index = 0; index < value.length; ++index) {
					if (breakFlag) break;

					iterateInstance(value[index], index);
				}
				return ret;
			}

			if (validation.isObject(value)) {
				iterate(Object.keys(value), (index: types.TStringOrNumber, _: any, iteration: IIteration) => {
					if (breakFlag) iteration.break();

					iterateInstance(value [index], index);
				});
				return ret;
			}

			if (validation.isInteger(value)) {
				for (let index = 0; index < value; ++index) {
					if (breakFlag) break;

					iterateInstance(index, index);
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
 * @param assign
 */
function iterateKeys<T = any, U = any>(value: Array<T>, callback: (index: number, row: T, iteration: IIteration) => U, accumulate?: types.TAccumulate, assign?: types.TAssign): types.TIterateResult
function iterateKeys<T extends Object, U = any>(value: { [key: string]: T }, callback: (index: string, row: T, iteration: IIteration) => U, accumulate?: types.TAccumulate, assign?: types.TAssign): types.TIterateResult
function iterateKeys<U = any>(value: string, callback: (index: number, row: string, iteration: IIteration) => U, accumulate?: types.TAccumulate, assign?: types.TAssign): types.TIterateResult
function iterateKeys<U = any>(value: number, callback: (index: number, row: number, iteration: IIteration) => U, accumulate?: types.TAccumulate, assign?: types.TAssign): types.TIterateResult
function iterateKeys(value: any, callback: (index: any, row: any, iteration: IIteration) => any, accumulate?: types.TAccumulate, assign?: types.TAssign): types.TIterateResult {
	return validation.isAsyncFunction(callback)
	       ? (async () => await iterate(value, async (row: any, index: types.TStringOrNumber, iteration: IIteration) => await callback(index, row, iteration), accumulate, assign))()
	       : iterate(value, (row: any, index: types.TStringOrNumber, iteration: IIteration) => callback(index, row, iteration), accumulate, assign);
}

/**
 * [[include: iterate-parallel.md]]
 * @param value
 * @param callback
 */
async function iterateParallel<T = any, U = any>(value: Array<T>, callback: (row: T, index: number, iteration: IIteration) => U): types.TIteratePromiseResult
async function iterateParallel<T extends Object, U = any>(value: { [key: string]: T }, callback: (row: T, index: string, iteration: IIteration) => U): types.TIteratePromiseResult
async function iterateParallel<U = any>(value: string, callback: (row: string, index: number, iteration: IIteration) => U): types.TIteratePromiseResult
async function iterateParallel<U = any>(value: number, callback: (row: number, index: number, iteration: IIteration) => U): types.TIteratePromiseResult
async function iterateParallel(value: any, callback: (v: any, k: any, iteration: IIteration) => any): types.TIteratePromiseResult {
	return Promise.all(iterate(value, (val: any, key: types.TStringOrNumber, iter: IIteration) => (async () => await callback(val, key, iter))(), []) as types.TAnyArray);
}

async function iterateParallelLimit<T = any, U = any>(limit: number, value: Array<T>, callback: (row: T, index: number, iteration: IIteration) => U): types.TIteratePromiseResult
async function iterateParallelLimit<T extends Object, U = any>(limit: number, value: { [key: string]: T }, callback: (row: T, index: string, iteration: IIteration) => U): types.TIteratePromiseResult
async function iterateParallelLimit<U = any>(limit: number, value: string, callback: (row: string, index: number, iteration: IIteration) => U): types.TIteratePromiseResult
async function iterateParallelLimit<U = any>(limit: number, value: number, callback: (row: number, index: number, iteration: IIteration) => U): types.TIteratePromiseResult
async function iterateParallelLimit(limit: number, value: any, callback: (v: any, k: any, iteration: IIteration) => any): types.TIteratePromiseResult {
	let len: number = 0;
	let cnt = 0;

	if (validation.isArray(value)) len = (value).length;
	if (validation.isObject(value)) len = (Object.keys(value)).length;
	if (len === 0) return [];

	return iterate(Math.ceil(len / limit), async (idx) => {
		let pr = iterate(limit, (val: any, key: any, iter: any) => {
			if (cnt >= len) return iter.break();

			cnt++;

			const oIdx = ((idx as number) * limit) + key;
			const cKey = validation.isObject(value) ? Object.keys(value)[oIdx] : oIdx;
			const cValue = (value as types.TAnyArray)[cKey];

			return (async () => await callback(cValue, cKey, iter))();
		}, []) as types.TAnyArray;

		return Promise.all(pr);
	}, []);
}

export {
	iterate,
	iterateKeys,
	iterateParallel,
	iterateParallelLimit
};
