import {
	nop,
	nop$,
	isUndefined,
	isNull,
	isBoolean,
	isString,
	isNumber,
	isInteger,
	isFloat,
	isPositiveInteger,
	isArray,
	isObject,
	isIterable,
	isNativeObject,
	isGUID,
	isGUIDv4,
	isJSON,
	isAsyncFunction,
	isFunction,
	GUID,
	toArray,
	objectToArray,
	setDefaults,
	iterate,
	delay,
	findAndDelete,
	findAndDeleteAll,
} from '../src/';

import {expect} from 'chai'
import 'mocha'

const guid_ok = '458aed41-197b-4d87-9889-bf92ddf1a3c5';
const guid_fv4 = '458aed41-197b-1d87-9889-bf92ddf1a3c5';
const guid_f1 = '458qed41-197b-4d87-9889-bf92ddf1a3c5';
const guid_f2 = '458aed41-197b-4d87-989-bf92ddf1a3c5';

describe('Tools::isUndefined', function () {
	it('should return true for undefined', function () {
		expect(isUndefined(undefined)).to.equal(true);
	});
	it('should return false for everything else', function () {
		expect(isUndefined(null)).to.equal(false);
		expect(isUndefined({})).to.equal(false);
		expect(isUndefined([])).to.equal(false);
		expect(isUndefined(0)).to.equal(false);
		expect(isUndefined(123)).to.equal(false);
		expect(isUndefined(false)).to.equal(false);
	});
});

describe('Tools::isNull', function () {
	it('should return true for null', function () {
		expect(isNull(null)).to.equal(true);
	});
	it('should return false for everything else', function () {
		expect(isNull(undefined)).to.equal(false);
		expect(isNull(false)).to.equal(false);
		expect(isNull({})).to.equal(false);
		expect(isNull([])).to.equal(false);
		expect(isNull(0)).to.equal(false);
		expect(isNull(123)).to.equal(false);
	});
});

describe('Tools::isBoolean', function () {
	it('should return true for boolean', function () {
		expect(isBoolean(true)).to.equal(true);
		expect(isBoolean(false)).to.equal(true);
	});
	it('should return false for everything else', function () {
		expect(isBoolean(undefined)).to.equal(false);
		expect(isBoolean(null)).to.equal(false);
		expect(isBoolean({})).to.equal(false);
		expect(isBoolean([])).to.equal(false);
		expect(isBoolean(1)).to.equal(false);
		expect(isBoolean(0)).to.equal(false);
		expect(isBoolean('123')).to.equal(false);
	});
});

describe('Tools::isString', function () {
	it('should return true for a string', function () {
		expect(isString('123')).to.equal(true);
	});
	it('should return false for everything else', function () {
		expect(isString(undefined)).to.equal(false);
		expect(isString(null)).to.equal(false);
		expect(isString(false)).to.equal(false);
		expect(isString(0)).to.equal(false);
		expect(isString(123)).to.equal(false);
		expect(isString('asd'.split(''))).to.equal(false);
	});
});

describe('Tools::isNumber', function () {
	it('should return true for a number', function () {
		expect(isNumber(0)).to.equal(true);
		expect(isNumber(-1)).to.equal(true);
		expect(isNumber(1)).to.equal(true);
		expect(isNumber(0.123)).to.equal(true);
	});
	it('should return false for everything else', function () {
		expect(isNumber('0.123')).to.equal(false);
		expect(isNumber(undefined)).to.equal(false);
		expect(isNumber(null)).to.equal(false);
		expect(isNumber([])).to.equal(false);
		expect(isNumber({})).to.equal(false);
		expect(isNumber('')).to.equal(false);
	});
});

describe('Tools::isInteger', function () {
	it('should return true for an integer', function () {
		expect(isInteger(123)).to.equal(true);
		expect(isInteger(0)).to.equal(true);
		expect(isInteger(-123)).to.equal(true);
	});
	it('should return false if not integer', function () {
		expect(isInteger(0.123)).to.equal(false);
		expect(isInteger(-0.123123)).to.equal(false);
		expect(isInteger(null)).to.equal(false);
		expect(isInteger(undefined)).to.equal(false);
	});
});

describe('Tools::isFloat', function () {
	it('should return true for an float', function () {
		expect(isFloat(0.123)).to.equal(true);
		expect(isFloat(-0.123)).to.equal(true);
	});
	it('should return false if not integer', function () {
		expect(isFloat(0)).to.equal(false);
		expect(isFloat(123)).to.equal(false);
		expect(isFloat(-123)).to.equal(false);
		expect(isFloat(null)).to.equal(false);
		expect(isFloat(undefined)).to.equal(false);
	});
});

describe('Tools::isPositiveInteger', function () {
	it('should return true for a positive integer or 0', function () {
		expect(isPositiveInteger(0)).to.equal(true);
		expect(isPositiveInteger(123)).to.equal(true);
	});
	it('should return false for everything else', function () {
		expect(isPositiveInteger(-123)).to.equal(false);
		expect(isPositiveInteger('')).to.equal(false);
		expect(isPositiveInteger(null)).to.equal(false);
		expect(isPositiveInteger(undefined)).to.equal(false);
		expect(isPositiveInteger({})).to.equal(false);
		expect(isPositiveInteger([])).to.equal(false);
	});
});

describe('Tools::isArray', function () {
	it('should return true for TAnyArray', function () {
		expect(isArray([])).to.equal(true);
		expect(isArray([1, 3])).to.equal(true);
	});
	it('should return false for everything else', function () {
		expect(isArray({})).to.equal(false);
		expect(isArray(null)).to.equal(false);
		expect(isArray(undefined)).to.equal(false);
		expect(isArray('123')).to.equal(false);
	});
});

describe('Tools::isObject', function () {
	it('should return true for object', function () {
		expect(isObject({})).to.equal(true);
		expect(isObject({x: 10})).to.equal(true);
	});
	it('should return false for everything else', function () {
		expect(isObject(null)).to.equal(false);
		expect(isObject(undefined)).to.equal(false);
		expect(isObject('123')).to.equal(false);
		expect(isObject([])).to.equal(false);
		expect(isObject(123)).to.equal(false);
	});
});

describe('Tools::isIterable', function () {
	it('should return true if object or TAnyArray with non-zero length', function () {
		expect(isIterable([1, 2])).to.equal(true);
		expect(isIterable({x: 10})).to.equal(true);
	});
	it('should return false for everything else', function () {
		expect(isIterable({})).to.equal(false);
		expect(isIterable([])).to.equal(false);
		expect(isIterable('123')).to.equal(false);
		expect(isIterable('')).to.equal(false);
		expect(isIterable(123)).to.equal(false);
		expect(isIterable(null)).to.equal(false);
		expect(isIterable(undefined)).to.equal(false);
	});
});

describe('Tools::isNativeObject', function () {
	it('should return true for a Native Object', function () {
		expect(isNativeObject({})).to.equal(true);
	});
	it('should return false for everything else', function () {
		expect(isNativeObject([])).to.equal(false);
		expect(isNativeObject(null)).to.equal(false);
		expect(isNativeObject(undefined)).to.equal(false);
		expect(isNativeObject(123)).to.equal(false);
		expect(isNativeObject('')).to.equal(false);
	});
});

describe('Tools::isGUID', function () {
	it('should return true for any GUID', function () {
		expect(isGUID(guid_ok)).to.equal(true);
		expect(isGUID(guid_fv4)).to.equal(true);
	});
	it('should return false if not a GUID', function () {
		expect(isGUID(guid_f1)).to.equal(false);
		expect(isGUID(guid_f2)).to.equal(false);
	});
});

describe('Tools::isGUIDv4', function () {
	it('should return true if GUIDv4', function () {
		expect(isGUIDv4(guid_ok)).to.equal(true);
	});
	it('should return false if everything else', function () {
		expect(isGUIDv4(guid_fv4)).to.equal(false);
		expect(isGUIDv4(guid_f1)).to.equal(false);
		expect(isGUIDv4(guid_f2)).to.equal(false);
	});
});

describe('Tools::isJSON', function () {
	const dt = JSON.stringify({x: 10, y: 20});
	it('should return true if value can be parsed to object', function () {
		expect(isJSON(dt)).to.equal(true);
	});
	it('should return false for everything else', function () {
		expect(isJSON({})).to.equal(false);
		expect(isJSON('')).to.equal(false);
		expect(isJSON(123)).to.equal(false);
	});
});

describe('Tools::isAsyncFunction', function () {
	it('should return true for async function', function () {
		expect(isAsyncFunction(nop$)).to.equal(true);
	});
	it('should return false for everything else', function () {
		expect(isAsyncFunction(nop)).to.equal(false);
		expect(isAsyncFunction(123)).to.equal(false);
		expect(isFunction(null)).to.equal(false);
		expect(isFunction(undefined)).to.equal(false);
		expect(isFunction('')).to.equal(false);
	});
});

describe('Tools::isFunction', function () {
	it('should return true if Function', function () {
		expect(isFunction(nop)).to.equal(true);
		expect(isFunction(nop$)).to.equal(true);
	});
	it('should return false if not a function', function () {
		expect(isFunction(null)).to.equal(false);
		expect(isFunction(undefined)).to.equal(false);
		expect(isFunction('')).to.equal(false);
		expect(isFunction(123)).to.equal(false);
	});
});

describe('Tools::GUID', function () {
	it('should generate a valid GUIDv4', function () {
		expect(isGUID(GUID())).to.equal(true);
	});
});

describe('Tools::toArray', function () {
	it('should not touch if already an TAnyArray', function () {
		let arr = [1, 2];
		expect(toArray(arr)).to.equal(arr);
	});
	it('should put value into an TAnyArray if not an TAnyArray', function () {
		let i = 1;
		expect(toArray(i)).to.deep.equal([1]);
	});
});

describe('Tools::objectToArray', function () {
	it('should create TAnyArray from object', function () {
		expect(objectToArray({x: 1, y: 2})).to.deep.equal([1, 2]);
		expect(objectToArray({x: 1, y: 2}, true)).to.deep.equal(['x', 'y']);
	});
});

describe('Tools::setDefaults', function () {
	it('should not set already defined props', function () {
		let obj = {x: 10};
		expect(setDefaults(obj, 'x', 12)).to.deep.equal({x: 10});
	});
	it('should set not defined props', function () {
		let obj = {x: 10};
		expect(setDefaults(obj, 'y', 12)).to.deep.equal({x: 10, y: 12});
	});
});

describe('Tools::delay', function () {
	// @ts-ignore
	it('should w8 via async await', async function () {
		let begin = Date.now();
		await delay(300);
		expect(Date.now() - begin).to.be.greaterThan(250);
	});
});

describe('Tools::iterate', function () {
	it('should iterate through numbers', function () {
		let arr = (iterate(10, (val: any) => {
			return val;
		}, [])) as Array<any>;
		expect(arr.length).to.equal(10);
	});
	it('should iterate through objects', function () {
		let arr = (iterate({x: 10, y: 20, z: 30}, (val: any) => {
			return val;
		}, [])) as Array<any>;
		expect(arr.length).to.equal(3);
	});
	it('should iterate through arrays', function () {
		let arr = (iterate([1, 2, 3], (val: any) => {
			return val;
		}, [])) as Array<any>;
		expect(arr.length).to.equal(3);
	});
});

describe('Tools::findAndDelete', function () {
	it('should find and delete value in target', function () {
		let t1 = [1, 2, 2, 3];
		let t2 = {x: 1, y: 2, z: 2, c: 3};
		findAndDelete(t1, 2);
		findAndDelete(t2, 2);
		expect(t1).to.deep.equal([1, 2, 3]);
		expect(t2).to.deep.equal({x: 1, z: 2, c: 3});

	});
	it('should deep equal', function () {
		let t1 = [{x: 10}, {y: 20}];
		findAndDelete(t1, {y: 20});
		expect(t1).to.deep.equal([{x: 10}]);
	});
	it('should not delete if not iterable or if no such elem', function () {
		let t1 = [1, 2, 3];
		findAndDelete(t1, 10);
		expect(t1.length).to.equal(3);
		expect(findAndDelete([], 'asd')).to.equal(false);
	});
});

describe('Tools::findAndDeleteAll', function () {
	it('should delete all entries', function () {
		let t1 = [1, 2, 2, 3];
		let t2 = {x: 1, y: 2, z: 2, c: 3};
		findAndDeleteAll(t1, 2);
		findAndDeleteAll(t2, 2);
		expect(t1).to.deep.equal([1, 3]);
		expect(t2).to.deep.equal({x: 1, c: 3});
	});
});
