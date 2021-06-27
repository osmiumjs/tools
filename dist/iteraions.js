"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.iterateParallelLimit = exports.iterateParallel = exports.iterateKeys = exports.iterate = void 0;
const validation = require("./validations");
function iterate(value, callback, accumulate, assign) {
    let breakFlag = false;
    function newIteration(index) {
        let instance = {
            break: () => breakFlag = true,
            accKeyName: index,
            key: (name) => instance.accKeyName = name
        };
        return instance;
    }
    let iterateInstanceAsync = async (val, index) => {
        let iteration = newIteration(index);
        pushRet(await callback(val, index, iteration), iteration);
    };
    let iterateInstance = (val, index) => {
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
    let pushRet = (val, iteration) => {
        if (validation.isUndefined(val))
            return;
        if (validation.isObject(accumulate)) {
            (ret)[iteration.accKeyName]
                = assign
                    ? Object.assign((ret)[iteration.accKeyName] || {}, val)
                    : val;
        }
        if (validation.isArray(accumulate))
            ret.push(val);
        if (validation.isString(accumulate)) {
            ret
                += val
                    ? validation.isFunction(val.toString)
                        ? val.toString(validation.isInteger(val) ? undefined : 'utf8')
                        : val + ''
                    : '';
        }
        if (validation.isInteger(accumulate)) {
            ret
                += validation.isInteger(val)
                    ? val
                    : parseInt(val);
        }
        if (accumulate === false)
            ret = ret || val;
    };
    return validation.isAsyncFunction(callback)
        ? new Promise(async (resolve, reject) => {
            try {
                if (validation.isArray(value)) {
                    for (let index = 0; index < value.length; ++index) {
                        if (breakFlag)
                            break;
                        await iterateInstanceAsync(value[index], index);
                    }
                    resolve(ret);
                }
                if (validation.isObject(value)) {
                    await iterate(Object.keys(value), async (index, _, iteration) => {
                        if (breakFlag)
                            iteration.break();
                        await iterateInstanceAsync(value[index], index);
                    });
                    resolve(ret);
                }
                if (validation.isInteger(value)) {
                    for (let index = 0; index < value; ++index) {
                        if (breakFlag)
                            break;
                        await iterateInstanceAsync(index, index);
                    }
                    resolve(ret);
                }
            }
            catch (e) {
                reject(e);
            }
            resolve(false);
        })
        : (() => {
            if (validation.isArray(value)) {
                for (let index = 0; index < value.length; ++index) {
                    if (breakFlag)
                        break;
                    iterateInstance(value[index], index);
                }
                return ret;
            }
            if (validation.isObject(value)) {
                iterate(Object.keys(value), (index, _, iteration) => {
                    if (breakFlag)
                        iteration.break();
                    iterateInstance(value[index], index);
                });
                return ret;
            }
            if (validation.isInteger(value)) {
                for (let index = 0; index < value; ++index) {
                    if (breakFlag)
                        break;
                    iterateInstance(index, index);
                }
                return ret;
            }
            return false;
        })();
}
exports.iterate = iterate;
function iterateKeys(value, callback, accumulate, assign) {
    return validation.isAsyncFunction(callback)
        ? (async () => await iterate(value, async (row, index, iteration) => await callback(index, row, iteration), accumulate, assign))()
        : iterate(value, (row, index, iteration) => callback(index, row, iteration), accumulate, assign);
}
exports.iterateKeys = iterateKeys;
async function iterateParallel(value, callback) {
    return Promise.all(iterate(value, (val, key, iter) => (async () => await callback(val, key, iter))(), []));
}
exports.iterateParallel = iterateParallel;
async function iterateParallelLimit(limit, value, callback) {
    let len = 0;
    let cnt = 0;
    if (validation.isArray(value))
        len = (value).length;
    if (validation.isObject(value))
        len = (Object.keys(value)).length;
    if (len === 0)
        return [];
    return iterate(Math.ceil(len / limit), async (idx) => {
        let pr = iterate(limit, (val, key, iter) => {
            if (cnt >= len)
                return iter.break();
            cnt++;
            const oIdx = (idx * limit) + key;
            const cKey = validation.isObject(value) ? Object.keys(value)[oIdx] : oIdx;
            const cValue = value[cKey];
            return (async () => await callback(cValue, cKey, iter))();
        }, []);
        return Promise.all(pr);
    }, []);
}
exports.iterateParallelLimit = iterateParallelLimit;
//# sourceMappingURL=iteraions.js.map