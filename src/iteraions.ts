// noinspection JSUnusedGlobalSymbols
import * as validation from './validations';

interface IIteration {
	break: Function,
	accKeyName: string | number,
	key: Function,
	shift: Function,
	repeat: Function,
	skip: Function,
	length: number
}

/** [[include: iterate.md]] */
async function iterate<ArrayType>(value: Array<ArrayType>, callback: (row: ArrayType, index: number, iteration: IIteration) => Promise<void>): Promise<Array<ArrayType>>
async function iterate<ArrayType, CbRetType>(value: Array<ArrayType>, callback: (row: ArrayType, index: number, iteration: IIteration) => Promise<CbRetType | void>): Promise<Array<CbRetType>>
async function iterate<ArrayType, CbRetType>(value: Array<ArrayType>, callback: (row: ArrayType, index: number, iteration: IIteration) => Promise<CbRetType | void>, accumulate: Array<CbRetType>, assign?: boolean): Promise<Array<CbRetType>>
async function iterate<ArrayType, CbRetType>(value: Array<ArrayType>, callback: (row: ArrayType, index: number, iteration: IIteration) => Promise<CbRetType | void>, accumulate: { [key: string]: CbRetType }, assign?: boolean): Promise<{ [key: string]: CbRetType }>
async function iterate<ObjectType>(value: { [key: string]: ObjectType }, callback: (row: ObjectType, index: string, iteration: IIteration) => Promise<void>): Promise<{ [key: string]: ObjectType }>
async function iterate<ObjectType, CbRetType>(value: { [key: string]: ObjectType }, callback: (row: ObjectType, index: string, iteration: IIteration) => Promise<CbRetType | void>): Promise<{ [key: string]: CbRetType }>
async function iterate<ObjectType, CbRetType>(value: { [key: string]: ObjectType }, callback: (row: ObjectType, index: string, iteration: IIteration) => Promise<CbRetType | void>, accumulate: Array<CbRetType>, assign?: boolean): Promise<{ [key: string]: CbRetType }>
async function iterate<ObjectType, CbRetType>(value: { [key: string]: ObjectType }, callback: (row: ObjectType, index: string, iteration: IIteration) => Promise<CbRetType | void>, accumulate: { [key: string]: CbRetType }, assign?: boolean): Promise<{ [key: string]: CbRetType }>
async function iterate(value: string, callback: (row: string, index: number, iteration: IIteration) => Promise<void>): Promise<void>
async function iterate<CbRetType>(value: string, callback: (row: string, index: number, iteration: IIteration) => Promise<CbRetType | void>, accumulate: Array<CbRetType>, assign?: boolean): Promise<Array<CbRetType>>
async function iterate<CbRetType>(value: string, callback: (row: string, index: number, iteration: IIteration) => Promise<CbRetType | void>, accumulate: { [key: string]: CbRetType }, assign?: boolean): Promise<{ [key: string]: CbRetType }>
async function iterate(value: number, callback: (row: number, index: number, iteration: IIteration) => Promise<void>): Promise<void>
async function iterate<CbRetType>(value: number, callback: (row: number, index: number, iteration: IIteration) => Promise<CbRetType | void>, accumulate: Array<CbRetType>, assign?: boolean): Promise<Array<CbRetType>>
async function iterate<CbRetType>(value: number, callback: (row: number, index: number, iteration: IIteration) => Promise<CbRetType | void>, accumulate: { [key: string]: CbRetType }, assign?: boolean): Promise<{ [key: string]: CbRetType }>
function iterate<ArrayType>(value: Array<ArrayType>, callback: (row: ArrayType, index: number, iteration: IIteration) => void): Array<ArrayType>
function iterate<ArrayType, CbRetType>(value: Array<ArrayType>, callback: (row: ArrayType, index: number, iteration: IIteration) => CbRetType | void): Array<CbRetType>
function iterate<ArrayType, CbRetType>(value: Array<ArrayType>, callback: (row: ArrayType, index: number, iteration: IIteration) => CbRetType | void, accumulate: Array<CbRetType>, assign?: boolean): Array<CbRetType>
function iterate<ArrayType, CbRetType>(value: Array<ArrayType>, callback: (row: ArrayType, index: number, iteration: IIteration) => CbRetType | void, accumulate: { [key: string]: CbRetType }, assign?: boolean): { [key: string]: CbRetType }
function iterate<ObjectType>(value: { [key: string]: ObjectType }, callback: (row: ObjectType, index: string, iteration: IIteration) => void): { [key: string]: ObjectType }
function iterate<ObjectType, CbRetType>(value: { [key: string]: ObjectType }, callback: (row: ObjectType, index: string, iteration: IIteration) => CbRetType | void): { [key: string]: CbRetType }
function iterate<ObjectType, CbRetType>(value: { [key: string]: ObjectType }, callback: (row: ObjectType, index: string, iteration: IIteration) => CbRetType | void, accumulate: Array<CbRetType>, assign?: boolean): { [key: string]: CbRetType }
function iterate<ObjectType, CbRetType>(value: { [key: string]: ObjectType }, callback: (row: ObjectType, index: string, iteration: IIteration) => CbRetType | void, accumulate: { [key: string]: CbRetType }, assign?: boolean): { [key: string]: CbRetType }
function iterate(value: string, callback: (row: string, index: number, iteration: IIteration) => void): void
function iterate<CbRetType>(value: string, callback: (row: string, index: number, iteration: IIteration) => CbRetType | void, accumulate: Array<CbRetType>, assign?: boolean): Array<CbRetType>
function iterate<CbRetType>(value: string, callback: (row: string, index: number, iteration: IIteration) => CbRetType | void, accumulate: { [key: string]: CbRetType }, assign?: boolean): { [key: string]: CbRetType }
function iterate(value: number, callback: (row: number, index: number, iteration: IIteration) => void): void
function iterate<CbRetType>(value: number, callback: (row: number, index: number, iteration: IIteration) => CbRetType | void, accumulate: Array<CbRetType>, assign?: boolean): Array<CbRetType>
function iterate<CbRetType>(value: number, callback: (row: number, index: number, iteration: IIteration) => CbRetType | void, accumulate: { [key: string]: CbRetType }, assign?: boolean): { [key: string]: CbRetType }
function iterate(value: any, callback: (row: any, index: any, iteration: IIteration) => any, accumulate?: any, assign?: boolean): any {
	let breakFlag: boolean = false;
	let shift: number = 0;

	function newIteration(index: string | number, length: number): IIteration {
		const instance: IIteration = {
			break     : () => breakFlag = true,
			accKeyName: index,
			key       : (name: string) => instance.accKeyName = name,
			shift     : (pos = 0) => shift = pos,
			repeat    : () => shift = -1,
			skip      : () => shift = 1,
			length
		};
		return instance;
	}

	let iterateInstanceAsync = async (val: any, index: string | number, length: number) => {
		let iteration = newIteration(index, length);

		pushRet(await callback(val, index, iteration), iteration);
	};

	let iterateInstance = (val: any, index: string | number, length: number) => {
		let iteration = newIteration(index, length);

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

		if (validation.isArray(accumulate)) (ret as [any]).push(val);

		if (validation.isString(accumulate)) {
			(ret as string)
				+= val
				   ? validation.isFunction(val.toString)
				     ? val.toString()
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
						if (shift) {
							index += shift;
							shift = 0;
						}

						await iterateInstanceAsync(value[index], index, value.length);
					}
					resolve(ret);
				}

				if (validation.isObject(value)) {
					const objectKeys = Object.keys(value);
					await iterate(objectKeys, async (index, _: any, iteration: IIteration) => {
						if (breakFlag) iteration.break();

						await iterateInstanceAsync(value[index], index, objectKeys.length);
						if (shift) {
							iteration.shift(shift);
							shift = 0;
						}

					});
					resolve(ret);
				}

				if (validation.isInteger(value)) {
					for (let index = 0; index < value; ++index) {
						if (breakFlag) break;
						if (shift) {
							index += shift;
							shift = 0;
						}

						await iterateInstanceAsync(index, index, value);
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
					if (shift) {
						index += shift;
						shift = 0;
					}

					iterateInstance(value[index], index, value.length);
				}
				return ret;
			}

			if (validation.isObject(value)) {
				const objectKeys = Object.keys(value);
				iterate(objectKeys, (index: string | number, _: any, iteration: IIteration) => {
					if (breakFlag) iteration.break();

					iterateInstance(value [index], index, objectKeys.length);

					if (shift) {
						iteration.shift(shift);
						shift = 0;
					}
				});
				return ret;
			}

			if (validation.isInteger(value)) {
				for (let index = 0; index < value; ++index) {
					if (breakFlag) break;
					if (shift) {
						index += shift;
						shift = 0;
					}

					iterateInstance(index, index, value);
				}
				return ret;
			}

			return false;
		})();
}

/** [[include: iterate-keys.md]] */
async function iterateKeys<ArrayType>(value: Array<ArrayType>, callback: (index: number, row: ArrayType, iteration: IIteration) => Promise<void>): Promise<Array<ArrayType>>
async function iterateKeys<ArrayType, CbRetType>(value: Array<ArrayType>, callback: (index: number, row: ArrayType, iteration: IIteration) => Promise<CbRetType | void>): Promise<Array<CbRetType>>
async function iterateKeys<ArrayType, CbRetType>(value: Array<ArrayType>, callback: (index: number, row: ArrayType, iteration: IIteration) => Promise<CbRetType | void>, accumulate: Array<CbRetType>, assign?: boolean): Promise<Array<CbRetType>>
async function iterateKeys<ArrayType, CbRetType>(value: Array<ArrayType>, callback: (index: number, row: ArrayType, iteration: IIteration) => Promise<CbRetType | void>, accumulate: { [key: string]: CbRetType }, assign?: boolean): Promise<{ [key: string]: CbRetType }>
async function iterateKeys<ObjectType>(value: { [key: string]: ObjectType }, callback: (index: string, row: ObjectType, iteration: IIteration) => Promise<void>): Promise<{ [key: string]: ObjectType }>
async function iterateKeys<ObjectType, CbRetType>(value: { [key: string]: ObjectType }, callback: (index: string, row: ObjectType, iteration: IIteration) => Promise<CbRetType | void>): Promise<{ [key: string]: CbRetType }>
async function iterateKeys<ObjectType, CbRetType>(value: { [key: string]: ObjectType }, callback: (index: string, row: ObjectType, iteration: IIteration) => Promise<CbRetType | void>, accumulate: Array<CbRetType>, assign?: boolean): Promise<{ [key: string]: CbRetType }>
async function iterateKeys<ObjectType, CbRetType>(value: { [key: string]: ObjectType }, callback: (index: string, row: ObjectType, iteration: IIteration) => Promise<CbRetType | void>, accumulate: { [key: string]: CbRetType }, assign?: boolean): Promise<{ [key: string]: CbRetType }>
async function iterateKeys(value: string, callback: (index: number, row: string, iteration: IIteration) => Promise<void>): Promise<void>
async function iterateKeys<CbRetType>(value: string, callback: (index: number, row: string, iteration: IIteration) => Promise<CbRetType | void>, accumulate: Array<CbRetType>, assign?: boolean): Promise<Array<CbRetType>>
async function iterateKeys<CbRetType>(value: string, callback: (index: number, row: string, iteration: IIteration) => Promise<CbRetType | void>, accumulate: { [key: string]: CbRetType }, assign?: boolean): Promise<{ [key: string]: CbRetType }>
async function iterateKeys(value: number, callback: (index: number, row: number, iteration: IIteration) => Promise<void>): Promise<void>
async function iterateKeys<CbRetType>(value: number, callback: (index: number, row: number, iteration: IIteration) => Promise<CbRetType | void>, accumulate: Array<CbRetType>, assign?: boolean): Promise<Array<CbRetType>>
async function iterateKeys<CbRetType>(value: number, callback: (index: number, row: number, iteration: IIteration) => Promise<CbRetType | void>, accumulate: { [key: string]: CbRetType }, assign?: boolean): Promise<{ [key: string]: CbRetType }>
function iterateKeys<ArrayType>(value: Array<ArrayType>, callback: (index: number, row: ArrayType, iteration: IIteration) => void): Array<ArrayType>
function iterateKeys<ArrayType, CbRetType>(value: Array<ArrayType>, callback: (index: number, row: ArrayType, iteration: IIteration) => CbRetType | void): Array<CbRetType>
function iterateKeys<ArrayType, CbRetType>(value: Array<ArrayType>, callback: (index: number, row: ArrayType, iteration: IIteration) => CbRetType | void, accumulate: Array<CbRetType>, assign?: boolean): Array<CbRetType>
function iterateKeys<ArrayType, CbRetType>(value: Array<ArrayType>, callback: (index: number, row: ArrayType, iteration: IIteration) => CbRetType | void, accumulate: { [key: string]: CbRetType }, assign?: boolean): { [key: string]: CbRetType }
function iterateKeys<ObjectType>(value: { [key: string]: ObjectType }, callback: (index: string, row: ObjectType, iteration: IIteration) => void): { [key: string]: ObjectType }
function iterateKeys<ObjectType, CbRetType>(value: { [key: string]: ObjectType }, callback: (index: string, row: ObjectType, iteration: IIteration) => CbRetType | void): { [key: string]: CbRetType }
function iterateKeys<ObjectType, CbRetType>(value: { [key: string]: ObjectType }, callback: (index: string, row: ObjectType, iteration: IIteration) => CbRetType | void, accumulate: Array<CbRetType>, assign?: boolean): { [key: string]: CbRetType }
function iterateKeys<ObjectType, CbRetType>(value: { [key: string]: ObjectType }, callback: (index: string, row: ObjectType, iteration: IIteration) => CbRetType | void, accumulate: { [key: string]: CbRetType }, assign?: boolean): { [key: string]: CbRetType }
function iterateKeys(value: string, callback: (index: number, row: string, iteration: IIteration) => void): void
function iterateKeys<CbRetType>(value: string, callback: (index: number, row: string, iteration: IIteration) => CbRetType | void, accumulate: Array<CbRetType>, assign?: boolean): Array<CbRetType>
function iterateKeys<CbRetType>(value: string, callback: (index: number, row: string, iteration: IIteration) => CbRetType | void, accumulate: { [key: string]: CbRetType }, assign?: boolean): { [key: string]: CbRetType }
function iterateKeys(value: number, callback: (index: number, row: number, iteration: IIteration) => void): void
function iterateKeys<CbRetType>(value: number, callback: (index: number, row: number, iteration: IIteration) => CbRetType | void, accumulate: Array<CbRetType>, assign?: boolean): Array<CbRetType>
function iterateKeys<CbRetType>(value: number, callback: (index: number, row: number, iteration: IIteration) => CbRetType | void, accumulate: { [key: string]: CbRetType }, assign?: boolean): { [key: string]: CbRetType }
function iterateKeys(value: any, callback: (index: any, row: any, iteration: IIteration) => any, accumulate?: any, assign?: boolean): any {
	return validation.isAsyncFunction(callback)
	       ? (async () => iterate(value, async (row: any, index: string | number, iteration: IIteration) => callback(index, row, iteration), accumulate, assign))()
	       : iterate(value, (row: any, index: string | number, iteration: IIteration) => callback(index, row, iteration), accumulate, assign);
}

/** [[include: iterate-parallel.md]] */
async function iterateParallel<ArrayType>(value: Array<ArrayType>, callback: (row: ArrayType, index: number, iteration: IIteration) => Promise<void>): Promise<Array<ArrayType>>
async function iterateParallel<ArrayType, CbRetType>(value: Array<ArrayType>, callback: (row: ArrayType, index: number, iteration: IIteration) => Promise<CbRetType | void>): Promise<Array<CbRetType>>
async function iterateParallel<ArrayType, CbRetType>(value: Array<ArrayType>, callback: (row: ArrayType, index: number, iteration: IIteration) => Promise<CbRetType | void>, accumulate: Array<CbRetType>, assign?: boolean): Promise<Array<CbRetType>>
async function iterateParallel<ArrayType, CbRetType>(value: Array<ArrayType>, callback: (row: ArrayType, index: number, iteration: IIteration) => Promise<CbRetType | void>, accumulate: { [key: string]: CbRetType }, assign?: boolean): Promise<{ [key: string]: CbRetType }>
async function iterateParallel<ObjectType>(value: { [key: string]: ObjectType }, callback: (row: ObjectType, index: string, iteration: IIteration) => Promise<void>): Promise<{ [key: string]: ObjectType }>
async function iterateParallel<ObjectType, CbRetType>(value: { [key: string]: ObjectType }, callback: (row: ObjectType, index: string, iteration: IIteration) => Promise<CbRetType | void>): Promise<{ [key: string]: CbRetType }>
async function iterateParallel<ObjectType, CbRetType>(value: { [key: string]: ObjectType }, callback: (row: ObjectType, index: string, iteration: IIteration) => Promise<CbRetType | void>, accumulate: Array<CbRetType>, assign?: boolean): Promise<{ [key: string]: CbRetType }>
async function iterateParallel<ObjectType, CbRetType>(value: { [key: string]: ObjectType }, callback: (row: ObjectType, index: string, iteration: IIteration) => Promise<CbRetType | void>, accumulate: { [key: string]: CbRetType }, assign?: boolean): Promise<{ [key: string]: CbRetType }>
async function iterateParallel(value: any, callback: (v: any, k: any, iteration: IIteration) => any): Promise<any> {
	return Promise.all(iterate(value, (val: any, key: any, iter: IIteration) =>
			(() => {(async () => callback(val, key, iter))();})()
		, []) as any);
}

async function iterateParallelLimit<ArrayType>(limit: number, value: Array<ArrayType>, callback: (row: ArrayType, index: number, iteration: IIteration) => Promise<void>): Promise<Array<ArrayType>>
async function iterateParallelLimit<ObjectType>(limit: number, value: { [key: string]: ObjectType }, callback: (row: ObjectType, index: string, iteration: IIteration) => Promise<void>): Promise<{ [key: string]: ObjectType }>
async function iterateParallelLimit(limit: number, value: any, callback: (v: any, k: any, iteration: IIteration) => any): Promise<any> {
	let len: number = 0;
	let cnt = 0;

	if (validation.isArray(value)) len = (value).length;
	if (validation.isObject(value)) len = (Object.keys(value)).length;
	if (len === 0) return [];

	return iterate(Math.ceil(len / limit), async (idx:number) => {
		let pr = iterate(limit, (val: any, key: any, iter: any) => {
			if (cnt >= len) return iter.break();

			cnt++;

			const oIdx = (idx * limit) + key;
			const cKey = validation.isObject(value) ? Object.keys(value)[oIdx] : oIdx;
			const cValue = (value)[cKey];

			return (async () => callback(cValue, cKey, iter))();
		}, []);

		return Promise.all(pr);
	}, []);
}

async function iterateChunk<RowType>(size: number, val: { [key: string]: RowType }, cb: (rows: { [key: string]: RowType }, iter: IIteration) => void): Promise<void>
async function iterateChunk<RowType>(size: number, val: Array<RowType>, cb: (rows: Array<RowType>, idxs: Array<RowType>, iter: IIteration) => void): Promise<void>
async function iterateChunk(size: any, val: any, cb: any): Promise<void> {
	let outArrRow: any[] = [];
	let outArrIdx: any[] = [];
	let outObjRow: { [key: string]: any } = {};
	let chunkCnt = 0;
	let totalCnt = 0;

	if (!validation.isArray(val) && !validation.isObject(val)) return;

	await iterate(val, async (row, idx, iter) => {
		chunkCnt++;
		totalCnt++;

		if (validation.isArray(val)) {
			outArrRow.push(row);
			outArrIdx.push(idx);

			if (chunkCnt < size && iter.length !== totalCnt) return;
			await cb(outArrRow, outArrIdx, iter);

			chunkCnt = 0;
			outArrRow = [];
			outArrIdx = [];
			return;
		}
		outObjRow[`${idx}`] = row;

		if (chunkCnt < size && iter.length !== totalCnt) return;
		await cb(outObjRow, iter);
		chunkCnt = 0;
		outObjRow = {};
	});
}

export {
	iterate,
	iterateKeys,
	iterateParallel,
	iterateParallelLimit,
	iterateChunk
};
