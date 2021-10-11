import * as types from './types';
interface IIteration {
    break: Function;
    accKeyName: types.TStringOrNumber;
    key: Function;
    shift: Function;
    repeat: Function;
    skip: Function;
}
/** [[include: iterate.md]]
 * @param value
 * @param callback
 * @param accumulate
 * @param assign
 */
declare function iterate<T = any, U = any>(value: Array<T>, callback: (row: T, index: number, iteration: IIteration) => U, accumulate?: types.TAccumulate, assign?: types.TAssign): types.TIterateResult;
declare function iterate<T extends Object, U = any>(value: {
    [key: string]: T;
}, callback: (row: T, index: string, iteration: IIteration) => U, accumulate?: types.TAccumulate, assign?: types.TAssign): types.TIterateResult;
declare function iterate<U = any>(value: string, callback: (row: string, index: number, iteration: IIteration) => U, accumulate?: types.TAccumulate, assign?: types.TAssign): types.TIterateResult;
declare function iterate<U = any>(value: number, callback: (row: number, index: number, iteration: IIteration) => U, accumulate?: types.TAccumulate, assign?: types.TAssign): types.TIterateResult;
/**
 * [[include: iterate-keys.md]]
 * @param value
 * @param callback
 * @param accumulate
 * @param assign
 */
declare function iterateKeys<T = any, U = any>(value: Array<T>, callback: (index: number, row: T, iteration: IIteration) => U, accumulate?: types.TAccumulate, assign?: types.TAssign): types.TIterateResult;
declare function iterateKeys<T extends Object, U = any>(value: {
    [key: string]: T;
}, callback: (index: string, row: T, iteration: IIteration) => U, accumulate?: types.TAccumulate, assign?: types.TAssign): types.TIterateResult;
declare function iterateKeys<U = any>(value: string, callback: (index: number, row: string, iteration: IIteration) => U, accumulate?: types.TAccumulate, assign?: types.TAssign): types.TIterateResult;
declare function iterateKeys<U = any>(value: number, callback: (index: number, row: number, iteration: IIteration) => U, accumulate?: types.TAccumulate, assign?: types.TAssign): types.TIterateResult;
/**
 * [[include: iterate-parallel.md]]
 * @param value
 * @param callback
 */
declare function iterateParallel<T = any, U = any>(value: Array<T>, callback: (row: T, index: number, iteration: IIteration) => U): types.TIteratePromiseResult;
declare function iterateParallel<T extends Object, U = any>(value: {
    [key: string]: T;
}, callback: (row: T, index: string, iteration: IIteration) => U): types.TIteratePromiseResult;
declare function iterateParallel<U = any>(value: string, callback: (row: string, index: number, iteration: IIteration) => U): types.TIteratePromiseResult;
declare function iterateParallel<U = any>(value: number, callback: (row: number, index: number, iteration: IIteration) => U): types.TIteratePromiseResult;
declare function iterateParallelLimit<T = any, U = any>(limit: number, value: Array<T>, callback: (row: T, index: number, iteration: IIteration) => U): types.TIteratePromiseResult;
declare function iterateParallelLimit<T extends Object, U = any>(limit: number, value: {
    [key: string]: T;
}, callback: (row: T, index: string, iteration: IIteration) => U): types.TIteratePromiseResult;
declare function iterateParallelLimit<U = any>(limit: number, value: string, callback: (row: string, index: number, iteration: IIteration) => U): types.TIteratePromiseResult;
declare function iterateParallelLimit<U = any>(limit: number, value: number, callback: (row: number, index: number, iteration: IIteration) => U): types.TIteratePromiseResult;
export { iterate, iterateKeys, iterateParallel, iterateParallelLimit };
