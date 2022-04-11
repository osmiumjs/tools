// noinspection JSUnusedGlobalSymbols
import * as validation from './validations';
import {mapToArray} from './tools';

interface IIteration {
	break: Function,
	accKeyName: string | number,
	key: Function,
	shift: Function,
	repeat: Function,
	skip: Function,
	length: number
}

type RecordIndexes = string | number | symbol;

/** [[include: iterate.md]] */
async function iterate<ArrayType>(value: Array<ArrayType>, callback: (row: ArrayType, index: number, iteration: IIteration) => Promise<void>): Promise<void>
async function iterate<ArrayType, CbRetType>(value: Array<ArrayType>, callback: (row: ArrayType, index: number, iteration: IIteration) => Promise<CbRetType | void>, accumulate: Array<CbRetType>, assign?: boolean): Promise<Array<CbRetType>>
async function iterate<ArrayType, CbRetType>(value: Array<ArrayType>, callback: (row: ArrayType, index: number, iteration: IIteration) => Promise<CbRetType | void>, accumulate: Record<RecordIndexes, CbRetType>, assign?: boolean): Promise<Record<RecordIndexes, CbRetType>>
async function iterate<ObjectType>(value: Record<RecordIndexes, ObjectType>, callback: (row: ObjectType, index: string, iteration: IIteration) => Promise<void>): Promise<void>
async function iterate<ObjectType, CbRetType>(value: Record<RecordIndexes, ObjectType>, callback: (row: ObjectType, index: string, iteration: IIteration) => Promise<CbRetType | void>, accumulate: Array<CbRetType>, assign?: boolean): Promise<Record<RecordIndexes, CbRetType>>
async function iterate<ObjectType, CbRetType>(value: Record<RecordIndexes, ObjectType>, callback: (row: ObjectType, index: string, iteration: IIteration) => Promise<CbRetType | void>, accumulate: Record<RecordIndexes, CbRetType>, assign?: boolean): Promise<Record<RecordIndexes, CbRetType>>
async function iterate(value: number, callback: (row: number, index: number, iteration: IIteration) => Promise<void>): Promise<void>
async function iterate<CbRetType>(value: number, callback: (row: number, index: number, iteration: IIteration) => Promise<CbRetType | void>, accumulate: Array<CbRetType>, assign?: boolean): Promise<Array<CbRetType>>
async function iterate<CbRetType>(value: number, callback: (row: number, index: number, iteration: IIteration) => Promise<CbRetType | void>, accumulate: Record<RecordIndexes, CbRetType>, assign?: boolean): Promise<Record<RecordIndexes, CbRetType>>
async function iterate<MapIndexType, MapValueType>(value: Map<MapIndexType, MapValueType>, callback: (row: MapValueType, index: MapIndexType, iteration: IIteration) => Promise<void>): Promise<void>
async function iterate<MapIndexType, MapValueType, CbRetType>(value: Map<MapIndexType, MapValueType>, callback: (row: MapValueType, index: MapIndexType, iteration: IIteration) => Promise<CbRetType | void>, accumulate: Array<CbRetType>, assign?: boolean): Promise<Array<CbRetType>>
async function iterate<MapIndexType, MapValueType, CbRetType>(value: Map<MapIndexType, MapValueType>, callback: (row: MapValueType, index: MapIndexType, iteration: IIteration) => Promise<CbRetType | void>, accumulate: Record<RecordIndexes, CbRetType>, assign?: boolean): Promise<Record<RecordIndexes, CbRetType>>
async function iterate<SetValueType>(value: Set<SetValueType>, callback: (row: SetValueType, index: number, iteration: IIteration) => Promise<void>): Promise<void>
async function iterate<SetValueType, CbRetType>(value: Set<SetValueType>, callback: (row: SetValueType, index: number, iteration: IIteration) => Promise<CbRetType | void>, accumulate: Array<CbRetType>, assign?: boolean): Promise<Array<CbRetType>>
async function iterate<SetValueType, CbRetType>(value: Set<SetValueType>, callback: (row: SetValueType, index: number, iteration: IIteration) => Promise<CbRetType | void>, accumulate: Record<RecordIndexes, CbRetType>, assign?: boolean): Promise<Record<RecordIndexes, CbRetType>>
function iterate<ArrayType>(value: Array<ArrayType>, callback: (row: ArrayType, index: number, iteration: IIteration) => void): void
function iterate<ArrayType, CbRetType>(value: Array<ArrayType>, callback: (row: ArrayType, index: number, iteration: IIteration) => CbRetType | void, accumulate: Array<CbRetType>, assign?: boolean): Array<CbRetType>
function iterate<ArrayType, CbRetType>(value: Array<ArrayType>, callback: (row: ArrayType, index: number, iteration: IIteration) => CbRetType | void, accumulate: Record<RecordIndexes, CbRetType>, assign?: boolean): Record<RecordIndexes, CbRetType>
function iterate<ObjectType>(value: Record<RecordIndexes, ObjectType>, callback: (row: ObjectType, index: string, iteration: IIteration) => void): void
function iterate<ObjectType, CbRetType>(value: Record<RecordIndexes, ObjectType>, callback: (row: ObjectType, index: string, iteration: IIteration) => CbRetType | void, accumulate: Array<CbRetType>, assign?: boolean): Record<RecordIndexes, CbRetType>
function iterate<ObjectType, CbRetType>(value: Record<RecordIndexes, ObjectType>, callback: (row: ObjectType, index: string, iteration: IIteration) => CbRetType | void, accumulate: Record<RecordIndexes, CbRetType>, assign?: boolean): Record<RecordIndexes, CbRetType>
function iterate(value: number, callback: (row: number, index: number, iteration: IIteration) => void): void
function iterate<CbRetType>(value: number, callback: (row: number, index: number, iteration: IIteration) => CbRetType | void, accumulate: Array<CbRetType>, assign?: boolean): Array<CbRetType>
function iterate<CbRetType>(value: number, callback: (row: number, index: number, iteration: IIteration) => CbRetType | void, accumulate: Record<RecordIndexes, CbRetType>, assign?: boolean): Record<RecordIndexes, CbRetType>
function iterate<MapIndexType, MapValueType>(value: Map<MapIndexType, MapValueType>, callback: (row: MapValueType, index: MapIndexType, iteration: IIteration) => void): void
function iterate<MapIndexType, MapValueType, CbRetType>(value: Map<MapIndexType, MapValueType>, callback: (row: MapValueType, index: MapIndexType, iteration: IIteration) => CbRetType | void, accumulate: Array<CbRetType>, assign?: boolean): Array<CbRetType>
function iterate<MapIndexType, MapValueType, CbRetType>(value: Map<MapIndexType, MapValueType>, callback: (row: MapValueType, index: MapIndexType, iteration: IIteration) => CbRetType | void, accumulate: Record<RecordIndexes, CbRetType>, assign?: boolean): Record<RecordIndexes, CbRetType>
function iterate<SetValueType>(value: Set<SetValueType>, callback: (row: SetValueType, index: number, iteration: IIteration) => void): void
function iterate<SetValueType, CbRetType>(value: Set<SetValueType>, callback: (row: SetValueType, index: number, iteration: IIteration) => CbRetType | void, accumulate: Array<CbRetType>, assign?: boolean): Array<CbRetType>
function iterate<SetValueType, CbRetType>(value: Set<SetValueType>, callback: (row: SetValueType, index: number, iteration: IIteration) => CbRetType | void, accumulate: Record<RecordIndexes, CbRetType>, assign?: boolean): Record<RecordIndexes, CbRetType>
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
				if (validation.isSet(value)) {
					value = [...value];
				}

				if (validation.isArray(value)) {
					for (let index = 0; index < (value as Array<any>).length; ++index) {
						if (breakFlag) break;
						if (shift) {
							index += shift;
							shift = 0;
						}

						await iterateInstanceAsync(value[index], index, value.length);
					}
					return resolve(ret);
				}

				if (validation.isMap(value)) {
					const array = mapToArray(value);
					for (let index = 0; index < array.length; ++index) {
						if (breakFlag) break;
						if (shift) {
							index += shift;
							shift = 0;
						}

						await iterateInstanceAsync(array[index][1], array[index][0], array.length);
					}
					return resolve(ret);
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
					return resolve(ret);
				}
			} catch (e) {
				reject(e);
			}
			resolve(false);
		})
	       : (() => {
			if (validation.isSet(value)) {
				value = [...value];
			}

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

			if (validation.isMap(value)) {
				const array = mapToArray(value);
				for (let index = 0; index < array.length; ++index) {
					if (breakFlag) break;
					if (shift) {
						index += shift;
						shift = 0;
					}

					iterateInstance(array[index][1], array[index][0], array.length);
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
async function iterateKeys<ArrayType>(value: Array<ArrayType>, callback: (index: number, row: ArrayType, iteration: IIteration) => Promise<void>): Promise<void>
async function iterateKeys<ArrayType, CbRetType>(value: Array<ArrayType>, callback: (index: number, row: ArrayType, iteration: IIteration) => Promise<CbRetType | void>, accumulate: Array<CbRetType>, assign?: boolean): Promise<Array<CbRetType>>
async function iterateKeys<ArrayType, CbRetType>(value: Array<ArrayType>, callback: (index: number, row: ArrayType, iteration: IIteration) => Promise<CbRetType | void>, accumulate: Record<RecordIndexes, CbRetType>, assign?: boolean): Promise<Record<RecordIndexes, CbRetType>>
async function iterateKeys<ObjectType>(value: Record<RecordIndexes, ObjectType>, callback: (index: string, row: ObjectType, iteration: IIteration) => Promise<void>): Promise<void>
async function iterateKeys<ObjectType, CbRetType>(value: Record<RecordIndexes, ObjectType>, callback: (index: string, row: ObjectType, iteration: IIteration) => Promise<CbRetType | void>, accumulate: Array<CbRetType>, assign?: boolean): Promise<Record<RecordIndexes, CbRetType>>
async function iterateKeys<ObjectType, CbRetType>(value: Record<RecordIndexes, ObjectType>, callback: (index: string, row: ObjectType, iteration: IIteration) => Promise<CbRetType | void>, accumulate: Record<RecordIndexes, CbRetType>, assign?: boolean): Promise<Record<RecordIndexes, CbRetType>>
async function iterateKeys(value: number, callback: (index: number, row: number, iteration: IIteration) => Promise<void>): Promise<void>
async function iterateKeys<CbRetType>(value: number, callback: (index: number, row: number, iteration: IIteration) => Promise<CbRetType | void>, accumulate: Array<CbRetType>, assign?: boolean): Promise<Array<CbRetType>>
async function iterateKeys<CbRetType>(value: number, callback: (index: number, row: number, iteration: IIteration) => Promise<CbRetType | void>, accumulate: Record<RecordIndexes, CbRetType>, assign?: boolean): Promise<Record<RecordIndexes, CbRetType>>
async function iterateKeys<MapIndexType, MapValueType>(value: Map<MapIndexType, MapValueType>, callback: (index: MapIndexType, row: MapValueType, iteration: IIteration) => Promise<void>): Promise<void>
async function iterateKeys<MapIndexType, MapValueType, CbRetType>(value: Map<MapIndexType, MapValueType>, callback: (index: MapIndexType, row: MapValueType, iteration: IIteration) => Promise<CbRetType | void>, accumulate: Array<CbRetType>, assign?: boolean): Promise<Array<CbRetType>>
async function iterateKeys<MapIndexType, MapValueType, CbRetType>(value: Map<MapIndexType, MapValueType>, callback: (index: MapIndexType, row: MapValueType, iteration: IIteration) => Promise<CbRetType | void>, accumulate: Record<RecordIndexes, CbRetType>, assign?: boolean): Promise<Record<RecordIndexes, CbRetType>>
async function iterateKeys<SetValueType>(value: Set<SetValueType>, callback: (index: number, row: SetValueType, iteration: IIteration) => Promise<void>): Promise<void>
async function iterateKeys<SetValueType, CbRetType>(value: Set<SetValueType>, callback: (index: number, row: SetValueType, iteration: IIteration) => Promise<CbRetType | void>, accumulate: Array<CbRetType>, assign?: boolean): Promise<Array<CbRetType>>
async function iterateKeys<SetValueType, CbRetType>(value: Set<SetValueType>, callback: (index: number, row: SetValueType, iteration: IIteration) => Promise<CbRetType | void>, accumulate: Record<RecordIndexes, CbRetType>, assign?: boolean): Promise<Record<RecordIndexes, CbRetType>>
function iterateKeys<ArrayType>(value: Array<ArrayType>, callback: (index: number, row: ArrayType, iteration: IIteration) => void): void
function iterateKeys<ArrayType, CbRetType>(value: Array<ArrayType>, callback: (index: number, row: ArrayType, iteration: IIteration) => CbRetType | void, accumulate: Array<CbRetType>, assign?: boolean): Array<CbRetType>
function iterateKeys<ArrayType, CbRetType>(value: Array<ArrayType>, callback: (index: number, row: ArrayType, iteration: IIteration) => CbRetType | void, accumulate: Record<RecordIndexes, CbRetType>, assign?: boolean): Record<RecordIndexes, CbRetType>
function iterateKeys<ObjectType>(value: Record<RecordIndexes, ObjectType>, callback: (index: string, row: ObjectType, iteration: IIteration) => void): void
function iterateKeys<ObjectType, CbRetType>(value: Record<RecordIndexes, ObjectType>, callback: (index: string, row: ObjectType, iteration: IIteration) => CbRetType | void, accumulate: Array<CbRetType>, assign?: boolean): Record<RecordIndexes, CbRetType>
function iterateKeys<ObjectType, CbRetType>(value: Record<RecordIndexes, ObjectType>, callback: (index: string, row: ObjectType, iteration: IIteration) => CbRetType | void, accumulate: Record<RecordIndexes, CbRetType>, assign?: boolean): Record<RecordIndexes, CbRetType>
function iterateKeys(value: number, callback: (index: number, row: number, iteration: IIteration) => void): void
function iterateKeys<CbRetType>(value: number, callback: (index: number, row: number, iteration: IIteration) => CbRetType | void, accumulate: Array<CbRetType>, assign?: boolean): Array<CbRetType>
function iterateKeys<CbRetType>(value: number, callback: (index: number, row: number, iteration: IIteration) => CbRetType | void, accumulate: Record<RecordIndexes, CbRetType>, assign?: boolean): Record<RecordIndexes, CbRetType>
function iterateKeys<MapIndexType, MapValueType>(value: Map<MapIndexType, MapValueType>, callback: (index: MapIndexType, row: MapValueType, iteration: IIteration) => void): void
function iterateKeys<MapIndexType, MapValueType, CbRetType>(value: Map<MapIndexType, MapValueType>, callback: (index: MapIndexType, row: MapValueType, iteration: IIteration) => CbRetType | void, accumulate: Array<CbRetType>, assign?: boolean): Array<CbRetType>
function iterateKeys<MapIndexType, MapValueType, CbRetType>(value: Map<MapIndexType, MapValueType>, callback: (index: MapIndexType, row: MapValueType, iteration: IIteration) => CbRetType | void, accumulate: Record<RecordIndexes, CbRetType>, assign?: boolean): Record<RecordIndexes, CbRetType>
function iterateKeys<SetValueType>(value: Set<SetValueType>, callback: (index: number, row: SetValueType, iteration: IIteration) => void): void
function iterateKeys<SetValueType, CbRetType>(value: Set<SetValueType>, callback: (index: number, row: SetValueType, iteration: IIteration) => CbRetType | void, accumulate: Array<CbRetType>, assign?: boolean): Array<CbRetType>
function iterateKeys<SetValueType, CbRetType>(value: Set<SetValueType>, callback: (index: number, ow: SetValueType, iteration: IIteration) => CbRetType | void, accumulate: Record<RecordIndexes, CbRetType>, assign?: boolean): Record<RecordIndexes, CbRetType>
function iterateKeys(value: any, callback: (index: any, row: any, iteration: IIteration) => any, accumulate?: any, assign?: boolean): any {
	return validation.isAsyncFunction(callback)
	       ? (async () => iterate(value, async (row: any, index: string | number, iteration: IIteration) => callback(index, row, iteration), accumulate, assign))()
	       : iterate(value, (row: any, index: string | number, iteration: IIteration) => callback(index, row, iteration), accumulate, assign);
}

/** [[include: iterate-parallel.md]] */
async function iterateParallel<ArrayType>(value: Array<ArrayType>, callback: (row: ArrayType, index: number, iteration: IIteration) => Promise<void>): Promise<void>
async function iterateParallel<ArrayType, CbRetType>(value: Array<ArrayType>, callback: (row: ArrayType, index: number, iteration: IIteration) => Promise<CbRetType | void>, accumulate: Array<CbRetType>, assign?: boolean): Promise<Array<CbRetType>>
async function iterateParallel<ArrayType, CbRetType>(value: Array<ArrayType>, callback: (row: ArrayType, index: number, iteration: IIteration) => Promise<CbRetType | void>, accumulate: Record<RecordIndexes, CbRetType>, assign?: boolean): Promise<Record<RecordIndexes, CbRetType>>
async function iterateParallel<ObjectType>(value: Record<RecordIndexes, ObjectType>, callback: (row: ObjectType, index: string, iteration: IIteration) => Promise<void>): Promise<void>
async function iterateParallel<ObjectType, CbRetType>(value: Record<RecordIndexes, ObjectType>, callback: (row: ObjectType, index: string, iteration: IIteration) => Promise<CbRetType | void>, accumulate: Array<CbRetType>, assign?: boolean): Promise<Record<RecordIndexes, CbRetType>>
async function iterateParallel<ObjectType, CbRetType>(value: Record<RecordIndexes, ObjectType>, callback: (row: ObjectType, index: string, iteration: IIteration) => Promise<CbRetType | void>, accumulate: Record<RecordIndexes, CbRetType>, assign?: boolean): Promise<Record<RecordIndexes, CbRetType>>
async function iterateParallel<MapIndexType, MapValueType>(value: Map<MapIndexType, MapValueType>, callback: (row: MapValueType, index: MapIndexType, iteration: IIteration) => Promise<void>): Promise<void>
async function iterateParallel<MapIndexType, MapValueType, CbRetType>(value: Map<MapIndexType, MapValueType>, callback: (row: MapValueType, index: MapIndexType, iteration: IIteration) => Promise<CbRetType | void>, accumulate: Array<CbRetType>, assign?: boolean): Promise<Record<RecordIndexes, CbRetType>>
async function iterateParallel<MapIndexType, MapValueType, CbRetType>(value: Map<MapIndexType, MapValueType>, callback: (row: MapValueType, index: MapIndexType, iteration: IIteration) => Promise<CbRetType | void>, accumulate: Record<RecordIndexes, CbRetType>, assign?: boolean): Promise<Record<RecordIndexes, CbRetType>>
async function iterateParallel<SetValueType>(value: Set<SetValueType>, callback: (row: SetValueType, index: number, iteration: IIteration) => Promise<void>): Promise<void>
async function iterateParallel<SetValueType, CbRetType>(value: Set<SetValueType>, callback: (row: SetValueType, index: number, iteration: IIteration) => Promise<CbRetType | void>, accumulate: Array<CbRetType>, assign?: boolean): Promise<Record<RecordIndexes, CbRetType>>
async function iterateParallel<SetValueType, CbRetType>(value: Set<SetValueType>, callback: (row: SetValueType, index: number, iteration: IIteration) => Promise<CbRetType | void>, accumulate: Record<RecordIndexes, CbRetType>, assign?: boolean): Promise<Record<RecordIndexes, CbRetType>>
async function iterateParallel(value: any, callback: (v: any, k: any, iteration: IIteration) => any): Promise<any> {
	return Promise.all(iterate(value, (val: any, key: any, iter: IIteration) => (() => {
		(async () => callback(val, key, iter))();
	})(), []) as any);
}

async function iterateParallelLimit<ArrayType>(limit: number, value: Array<ArrayType>, callback: (row: ArrayType, index: number, iteration: IIteration) => Promise<void>): Promise<void>
async function iterateParallelLimit<ObjectType>(limit: number, value: Record<RecordIndexes, ObjectType>, callback: (row: ObjectType, index: string, iteration: IIteration) => Promise<void>): Promise<void>
async function iterateParallelLimit<MapIndexType, MapValueType>(limit: number, value: Map<MapIndexType, MapValueType>, callback: (row: MapValueType, index: MapIndexType, iteration: IIteration) => Promise<void>): Promise<void>
async function iterateParallelLimit<SetValueType>(limit: number, value: Set<SetValueType>, callback: (row: SetValueType, index: number, iteration: IIteration) => Promise<void>): Promise<void>
async function iterateParallelLimit(limit: number, value: any, callback: (v: any, k: any, iteration: IIteration) => any): Promise<void> {
	let len: number = 0;
	let cnt = 0;

	if (validation.isMap(value)) len = value.size;
	if (validation.isSet(value)) len = value.size;
	if (validation.isArray(value)) len = value.length;
	if (validation.isObject(value)) len = (Object.keys(value)).length;
	if (len === 0) return;

	await iterate(Math.ceil(len / limit), async (idx: number) => {
		let pr = iterate(limit, (_: any, key: any, iter: any) => {
			if (cnt >= len) return iter.break();

			cnt++;

			const oIdx = (idx * limit) + key;

			let cKey;
			let cValue;

			if (validation.isObject(value)) {
				cKey = Object.keys(value)[oIdx];
				cValue = value[cKey];
			}
			if (validation.isArray(value)) {
				cKey = oIdx;
				cValue = value[cKey];
			}
			if (validation.isMap(value)) {
				cKey = [...value.keys()][oIdx];
				cValue = value.get(cKey);
			}
			if (validation.isSet(value)) {
				cKey = oIdx;
				cValue = [...value][cKey];
			}

			return (async () => callback(cValue, cKey, iter))();
		}, []);

		return Promise.all(pr);
	}, []);
}

async function iterateChunk<RowType>(size: number, val: Record<RecordIndexes, RowType>, cb: (rows: Record<RecordIndexes, RowType>, iter: IIteration) => void): Promise<void>
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
