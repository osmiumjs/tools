const assert = require('assert');
const tools = require('../index');
const testTypes = require('./testTypes');
require('sugar').extend();

describe('Common tools', function () {
	it('GUID()', function () {
		assert.equal(tools.isGUIDv4(tools.GUID()), true);
	});

	describe('is* functions', function () {
		const guid_ok = '458aed41-197b-4d87-9889-bf92ddf1a3c5';
		const guid_fv4 = '458aed41-197b-1d87-9889-bf92ddf1a3c5';
		const guid_f1 = '458qed41-197b-4d87-9889-bf92ddf1a3c5';
		const guid_f2 = '458aed41-197b-4d87-989-bf92ddf1a3c5';

		it('isGUIDv4()', function () {
			assert.equal(tools.isGUIDv4(guid_ok), true);
			assert.equal(tools.isGUIDv4(guid_fv4), false);
			assert.equal(tools.isGUIDv4(guid_f1), false);
			assert.equal(tools.isGUIDv4(guid_f2), false);
		});

		it('isGUID()', function () {
			assert.equal(tools.isGUID(guid_ok), true);
			assert.equal(tools.isGUID(guid_fv4), true);
			assert.equal(tools.isGUID(guid_f1), false);
			assert.equal(tools.isGUID(guid_f2), false);
		});
		it('isFunction()', function () {
			testTypes(tools.isFunction, {generatorFunction: true, asyncFunction: true, function: true});
		});

		it('isGeneratorFunction()', function () {
			testTypes(tools.isGeneratorFunction, {generatorFunction: true});
		});

		it('isAsyncFunction()', function () {
			testTypes(tools.isGeneratorFunction, {generatorFunction: true});
		});
		it('isUndefined()', function () {
			testTypes(tools.isUndefined, {undefined: true});
		});
		it('isArray()', function () {
			testTypes(tools.isArray, {array: true, nullArray: true});
		});
		it('isObject()', function () {
			testTypes(tools.isObject, {object: true, nullObject: true});
		});
		it('isString()', function () {
			testTypes(tools.isString, {string: true});
		});
		it('isNull()', function () {
			testTypes(tools.isNull, {null: true});
		});
		it('isBoolean()', function () {
			testTypes(tools.isBoolean, {true: true, false: true});
		});
		it('isPositiveInteger()', function () {
			testTypes(tools.isPositiveInteger, {intPos: true, zero: true});
		});
		it('isInteger()', function () {
			testTypes(tools.isInteger, {intPos: true, intNeg: true, zero: true});
		});
		it('isIterable()', function () {
			testTypes(tools.isIterable, {object: true, array: true});
		});
	});

	it('setDefaults()', function () {
		let testObj = {a: 1, b: 2};
		let origObj = Object.clone(testObj);
		tools.setDefaults(testObj, 'a', 1);
		assert.deepEqual(testObj, origObj);

		tools.setDefaults(testObj, 'b', 2);
		assert.deepEqual(testObj, origObj);

		tools.setDefaults(testObj, 'c', 12);
		assert.equal(testObj['c'], 12);
	});

	describe('iterate', function () {
		it('iterate [1, 2, 3]', function () {
			let res = [];
			const val = [1, 2, 3];
			tools.iterate(val, (el, idx) => res[idx] = el);
			assert.deepEqual(val, res);
		});
		it('async iterate [1, 2, 3]', async function () {
			let res = [];
			const val = [1, 2, 3];
			await tools.iterate(val, async (el, idx) => {
				await tools.delay(1);
				res[idx] = el;
			});
			assert.deepEqual(val, res);
		});
	});
});