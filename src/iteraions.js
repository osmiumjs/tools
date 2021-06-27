"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.iterateParallelLimit = exports.iterateParallel = exports.iterateKeys = exports.iterate = void 0;
var validation = require("./validations");
var types = require("./types");
/** [[include: iterate.md]]
 * @param value
 * @param callback
 * @param accumulate
 * @param assign
 */
function iterate(value, callback, accumulate, assign) {
    var _this = this;
    var breakFlag = false;
    function newIteration(index) {
        var instance = {
            'break': function () { return breakFlag = true; },
            accKeyName: index,
            key: function (name) { return instance.accKeyName = name; }
        };
        return instance;
    }
    var iterateInstanceAsync = function (val, index) { return __awaiter(_this, void 0, void 0, function () {
        var iteration, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    iteration = newIteration(index);
                    _a = pushRet;
                    return [4 /*yield*/, callback(val, index, iteration)];
                case 1:
                    _a.apply(void 0, [_b.sent(), iteration]);
                    return [2 /*return*/];
            }
        });
    }); };
    var iterateInstance = function (val, index) {
        var iteration = newIteration(index);
        pushRet(callback(val, index, iteration), iteration);
    };
    var ret = validation.isObject(accumulate) ||
        validation.isArray(accumulate) ||
        validation.isString(accumulate) ||
        validation.isInteger(accumulate)
        ? accumulate
        : accumulate === false
            ? false
            : value;
    var pushRet = function (val, iteration) {
        if (validation.isUndefined(val))
            return;
        if (validation.isObject(accumulate)) {
            ret[iteration.accKeyName] =
                assign
                    ? Object.assign(ret[iteration.accKeyName] || {}, val)
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
        if (validation.isInteger(accumulate))
            ret += validation.isInteger(val) ? val : parseInt(val);
        if (accumulate === false)
            ret = ret || val;
    };
    return validation.isAsyncFunction(callback)
        ? new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var index, index, e_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 13, , 14]);
                        if (!validation.isArray(value)) return [3 /*break*/, 5];
                        index = 0;
                        _a.label = 1;
                    case 1:
                        if (!(index < value.length)) return [3 /*break*/, 4];
                        if (breakFlag)
                            return [3 /*break*/, 4];
                        return [4 /*yield*/, iterateInstanceAsync(value[index], index)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        ++index;
                        return [3 /*break*/, 1];
                    case 4:
                        resolve(ret);
                        _a.label = 5;
                    case 5:
                        if (!validation.isObject(value)) return [3 /*break*/, 7];
                        return [4 /*yield*/, iterate(Object.keys(value), function (index, _, iteration) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (breakFlag)
                                                iteration["break"]();
                                            return [4 /*yield*/, iterateInstanceAsync(value[index], index)];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 6:
                        _a.sent();
                        resolve(ret);
                        _a.label = 7;
                    case 7:
                        if (!validation.isInteger(value)) return [3 /*break*/, 12];
                        index = 0;
                        _a.label = 8;
                    case 8:
                        if (!(index < value)) return [3 /*break*/, 11];
                        if (breakFlag)
                            return [3 /*break*/, 11];
                        return [4 /*yield*/, iterateInstanceAsync(index, index)];
                    case 9:
                        _a.sent();
                        _a.label = 10;
                    case 10:
                        ++index;
                        return [3 /*break*/, 8];
                    case 11:
                        resolve(ret);
                        _a.label = 12;
                    case 12: return [3 /*break*/, 14];
                    case 13:
                        e_1 = _a.sent();
                        reject(e_1);
                        return [3 /*break*/, 14];
                    case 14:
                        resolve(false);
                        return [2 /*return*/];
                }
            });
        }); })
        : (function () {
            if (validation.isArray(value)) {
                // @ts-ignore
                for (var index = 0; index < value.length; ++index) {
                    if (breakFlag) {
                        break;
                    }
                    // @ts-ignore
                    iterateInstance(value[index], index);
                }
                return ret;
            }
            if (validation.isObject(value)) {
                iterate(Object.keys(value), function (index, _, iteration) {
                    if (breakFlag)
                        iteration["break"]();
                    iterateInstance(value[index], index);
                });
                return ret;
            }
            if (validation.isInteger(value)) {
                for (var index = 0; index < value; ++index) {
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
/**
 * [[include: iterate-keys.md]]
 * @param value
 * @param callback
 * @param accumulate
 * @param assign
 */
function iterateKeys(value, callback, accumulate, assign) {
    var _this = this;
    return validation.isAsyncFunction(callback)
        ? (function () { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, iterate(value, function (row, key, iteration) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, callback(key, row, iteration)];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        }); }); }, accumulate, assign)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); })()
        : iterate(value, function (row, key, iteration) { return callback(key, row, iteration); }, accumulate, assign);
}
exports.iterateKeys = iterateKeys;
/**
 * [[include: iterate-parallel.md]]
 * @param value
 * @param callback
 */
function iterateParallel(value, callback) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            return [2 /*return*/, Promise.all(iterate(value, function (val, key, iter) { return (function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, callback(val, key, iter)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                }); }); })(); }, []))];
        });
    });
}
exports.iterateParallel = iterateParallel;
/**
 * @param limit
 * @param value
 * @param callback
 */
function iterateParallelLimit(limit, value, callback) {
    return __awaiter(this, void 0, void 0, function () {
        var len, cnt;
        var _this = this;
        return __generator(this, function (_a) {
            len = 0;
            cnt = 0;
            if (validation.isArray(value))
                len = value.length;
            if (validation.isObject(value))
                len = (Object.keys(value)).length;
            if (len === 0)
                return [2 /*return*/, []];
            return [2 /*return*/, iterate(Math.ceil(len / limit), function (idx) { return __awaiter(_this, void 0, void 0, function () {
                    var pr;
                    var _this = this;
                    return __generator(this, function (_a) {
                        pr = iterate(limit, function (val, key, iter) {
                            if (cnt >= len) {
                                iter["break"]();
                                return;
                            }
                            cnt++;
                            var oIdx = (idx * limit) + key;
                            var cKey = validation.isObject(value) ? Object.keys(value)[oIdx] : oIdx;
                            var cValue = value[cKey];
                            return (function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, callback(cValue, cKey, iter)];
                                    case 1: return [2 /*return*/, _a.sent()];
                                }
                            }); }); })();
                        }, []);
                        return [2 /*return*/, Promise.all(pr)];
                    });
                }); }, [])];
        });
    });
}
exports.iterateParallelLimit = iterateParallelLimit;
