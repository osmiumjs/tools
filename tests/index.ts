import * as toolsFull from '../';
// @ts-ignore
import * as toolsMin from '../dist/index.min.js';
import {expect} from 'chai';
import 'mocha';
import {sortObject} from '../src';

function doTests(tools: any, title: string) {
	const guid_ok = '458aed41-197b-4d87-9889-bf92ddf1a3c5';
	const guid_fv4 = '458aed41-197b-1d87-9889-bf92ddf1a3c5';
	const guid_f1 = '458qed41-197b-4d87-9889-bf92ddf1a3c5';
	const guid_f2 = '458aed41-197b-4d87-989-bf92ddf1a3c5';

	describe(`==== Test for "${title}" version ====`, () => {
		describe(`${title}::Tools::isUndefined`, () => {
			it('should return true for undefined', () => {
				expect(tools.isUndefined(undefined)).to.equal(true);
			});

			it('should return false for everything else', () => {
				expect(tools.isUndefined(null)).to.equal(false);
				expect(tools.isUndefined({})).to.equal(false);
				expect(tools.isUndefined([])).to.equal(false);
				expect(tools.isUndefined(0)).to.equal(false);
				expect(tools.isUndefined(123)).to.equal(false);
				expect(tools.isUndefined(false)).to.equal(false);
			});
		});

		describe(`${title}::Tools::isNull`, () => {
			it('should return true for null', () => {
				expect(tools.isNull(null)).to.equal(true);
			});

			it('should return false for everything else', () => {
				expect(tools.isNull(undefined)).to.equal(false);
				expect(tools.isNull(false)).to.equal(false);
				expect(tools.isNull({})).to.equal(false);
				expect(tools.isNull([])).to.equal(false);
				expect(tools.isNull(0)).to.equal(false);
				expect(tools.isNull(123)).to.equal(false);
			});
		});

		describe(`${title}::Tools::isBoolean`, () => {
			it('should return true for boolean', () => {
				expect(tools.isBoolean(true)).to.equal(true);
				expect(tools.isBoolean(false)).to.equal(true);
			});

			it('should return false for everything else', () => {
				expect(tools.isBoolean(undefined)).to.equal(false);
				expect(tools.isBoolean(null)).to.equal(false);
				expect(tools.isBoolean({})).to.equal(false);
				expect(tools.isBoolean([])).to.equal(false);
				expect(tools.isBoolean(1)).to.equal(false);
				expect(tools.isBoolean(0)).to.equal(false);
				expect(tools.isBoolean('123')).to.equal(false);
			});
		});

		describe(`${title}::Tools::isString`, () => {
			it('should return true for a string', () => {
				expect(tools.isString('123')).to.equal(true);
			});

			it('should return false for everything else', () => {
				expect(tools.isString(undefined)).to.equal(false);
				expect(tools.isString(null)).to.equal(false);
				expect(tools.isString(false)).to.equal(false);
				expect(tools.isString(0)).to.equal(false);
				expect(tools.isString(123)).to.equal(false);
				expect(tools.isString('asd'.split(''))).to.equal(false);
			});
		});

		describe(`${title}::Tools::isNumber`, () => {
			it('should return true for a number', () => {
				expect(tools.isNumber(0)).to.equal(true);
				expect(tools.isNumber(-1)).to.equal(true);
				expect(tools.isNumber(1)).to.equal(true);
				expect(tools.isNumber(0.123)).to.equal(true);
			});

			it('should return false for everything else', () => {
				expect(tools.isNumber('0.123')).to.equal(false);
				expect(tools.isNumber(undefined)).to.equal(false);
				expect(tools.isNumber(null)).to.equal(false);
				expect(tools.isNumber([])).to.equal(false);
				expect(tools.isNumber({})).to.equal(false);
				expect(tools.isNumber('')).to.equal(false);
			});
		});

		describe(`${title}::Tools::isInteger`, () => {
			it('should return true for an integer', () => {
				expect(tools.isInteger(123)).to.equal(true);
				expect(tools.isInteger(0)).to.equal(true);
				expect(tools.isInteger(-123)).to.equal(true);
			});

			it('should return false if not integer', () => {
				expect(tools.isInteger(0.123)).to.equal(false);
				expect(tools.isInteger(-0.123123)).to.equal(false);
				expect(tools.isInteger(null)).to.equal(false);
				expect(tools.isInteger(undefined)).to.equal(false);
			});
		});

		describe(`${title}::Tools::isFloat`, () => {
			it('should return true for an float', () => {
				expect(tools.isFloat(0.123)).to.equal(true);
				expect(tools.isFloat(-0.123)).to.equal(true);
			});

			it('should return false if not integer', () => {
				expect(tools.isFloat(0)).to.equal(false);
				expect(tools.isFloat(123)).to.equal(false);
				expect(tools.isFloat(-123)).to.equal(false);
				expect(tools.isFloat(null)).to.equal(false);
				expect(tools.isFloat(undefined)).to.equal(false);
			});
		});

		describe(`${title}::Tools::isPositiveInteger`, () => {
			it('should return true for a positive integer or 0', () => {
				expect(tools.isPositiveInteger(0)).to.equal(true);
				expect(tools.isPositiveInteger(123)).to.equal(true);
			});

			it('should return false for everything else', () => {
				expect(tools.isPositiveInteger(-123)).to.equal(false);
				expect(tools.isPositiveInteger('')).to.equal(false);
				expect(tools.isPositiveInteger(null)).to.equal(false);
				expect(tools.isPositiveInteger(undefined)).to.equal(false);
				expect(tools.isPositiveInteger({})).to.equal(false);
				expect(tools.isPositiveInteger([])).to.equal(false);
			});
		});

		describe(`${title}::Tools::isArray`, () => {
			it('should return true for TAnyArray', () => {
				expect(tools.isArray([])).to.equal(true);
				expect(tools.isArray([1, 3])).to.equal(true);
			});

			it('should return false for everything else', () => {
				expect(tools.isArray({})).to.equal(false);
				expect(tools.isArray(null)).to.equal(false);
				expect(tools.isArray(undefined)).to.equal(false);
				expect(tools.isArray('123')).to.equal(false);
			});
		});

		describe(`${title}::Tools::isObject`, () => {
			it('should return true for object', () => {
				expect(tools.isObject({})).to.equal(true);
				expect(tools.isObject({x: 10})).to.equal(true);
			});

			it('should return false for everything else', () => {
				expect(tools.isObject(null)).to.equal(false);
				expect(tools.isObject(undefined)).to.equal(false);
				expect(tools.isObject('123')).to.equal(false);
				expect(tools.isObject([])).to.equal(false);
				expect(tools.isObject(123)).to.equal(false);
			});
		});

		describe(`${title}::Tools::isIterable`, () => {
			it('should return true if object or TAnyArray with non-zero length', () => {
				expect(tools.isIterable([1, 2])).to.equal(true);
				expect(tools.isIterable({x: 10})).to.equal(true);
			});

			it('should return false for everything else', () => {
				expect(tools.isIterable({})).to.equal(false);
				expect(tools.isIterable([])).to.equal(false);
				expect(tools.isIterable('123')).to.equal(false);
				expect(tools.isIterable('')).to.equal(false);
				expect(tools.isIterable(123)).to.equal(false);
				expect(tools.isIterable(null)).to.equal(false);
				expect(tools.isIterable(undefined)).to.equal(false);
			});
		});

		describe(`${title}::Tools::isNativeObject`, () => {
			it('should return true for a Native Object', () => {
				expect(tools.isNativeObject({})).to.equal(true);
			});

			it('should return false for everything else', () => {
				expect(tools.isNativeObject([])).to.equal(false);
				expect(tools.isNativeObject(null)).to.equal(false);
				expect(tools.isNativeObject(undefined)).to.equal(false);
				expect(tools.isNativeObject(123)).to.equal(false);
				expect(tools.isNativeObject('')).to.equal(false);
			});
		});

		describe(`${title}::Tools::isGUID`, () => {
			it('should return true for any GUID', () => {
				expect(tools.isGUID(guid_ok)).to.equal(true);
				expect(tools.isGUID(guid_fv4)).to.equal(true);
			});

			it('should return false if not a GUID', () => {
				expect(tools.isGUID(guid_f1)).to.equal(false);
				expect(tools.isGUID(guid_f2)).to.equal(false);
			});
		});

		describe(`${title}::Tools::isGUIDv4`, () => {
			it('should return true if GUIDv4', () => {
				expect(tools.isGUIDv4(guid_ok)).to.equal(true);
			});

			it('should return false if everything else', () => {
				expect(tools.isGUIDv4(guid_fv4)).to.equal(false);
				expect(tools.isGUIDv4(guid_f1)).to.equal(false);
				expect(tools.isGUIDv4(guid_f2)).to.equal(false);
			});
		});

		describe(`${title}::Tools::isJSON`, () => {
			const dt = JSON.stringify({
				x: 10,
				y: 20
			});

			it('should return true if value can be parsed to object', () => {
				expect(tools.isJSON(dt)).to.equal(true);
			});

			it('should return false for everything else', () => {
				expect(tools.isJSON({})).to.equal(false);
				expect(tools.isJSON('')).to.equal(false);
				expect(tools.isJSON(123)).to.equal(false);
			});
		});

		describe(`${title}::Tools::isAsyncFunction`, () => {
			it('should return true for async function', () => {
				expect(tools.isAsyncFunction(tools.nop$)).to.equal(true);
			});

			it('should return false for everything else', () => {
				expect(tools.isAsyncFunction(tools.nop)).to.equal(false);
				expect(tools.isAsyncFunction(123)).to.equal(false);
				expect(tools.isFunction(null)).to.equal(false);
				expect(tools.isFunction(undefined)).to.equal(false);
				expect(tools.isFunction('')).to.equal(false);
			});
		});

		describe(`${title}::Tools::isFunction`, () => {
			it('should return true if Function', () => {
				expect(tools.isFunction(tools.nop)).to.equal(true);
				expect(tools.isFunction(tools.nop$)).to.equal(true);
			});

			it('should return false if not a function', function () {
				expect(tools.isFunction(null)).to.equal(false);
				expect(tools.isFunction(undefined)).to.equal(false);
				expect(tools.isFunction('')).to.equal(false);
				expect(tools.isFunction(123)).to.equal(false);
			});
		});

		describe(`${title}::Tools::GUID`, () => {
			it('should generate a valid GUIDv4', () => {
				expect(tools.isGUID(tools.GUID())).to.equal(true);
			});
		});

		describe(`${title}::Tools::toArray`, () => {
			it('should not touch if already an TAnyArray', () => {
				const arr = [1, 2];
				expect(tools.toArray(arr)).to.equal(arr);
			});

			it('should put value into an TAnyArray if not an TAnyArray', () => {
				const i = 1;
				expect(tools.toArray(i)).to.deep.equal([1]);
			});
		});

		describe(`${title}::Tools::objectToArray`, () => {
			it('should create TAnyArray from object', () => {
				expect(tools.objectToArray({
					x: 1,
					y: 2
				})).to.deep.equal([1, 2]);
				expect(tools.objectToArray({
					x: 1,
					y: 2
				}, true)).to.deep.equal(['x', 'y']);
			});
		});

		describe(`${title}::Tools::setDefaults`, () => {
			it('should not set already defined props', () => {
				const obj = {x: 10};
				expect(tools.setDefaults(obj, 'x', 12)).to.deep.equal({x: 10});
			});

			it('should set not defined props', () => {
				const obj = {x: 10};
				expect(tools.setDefaults(obj, 'y', 12))
				.to
				.deep
				.equal({
					x: 10,
					y: 12
				});
			});
		});

		describe(`${title}::Tools::delay`, () => {
			it('should w8 via async await', async () => {
				const begin = Date.now();
				await tools.delay(300);

				expect(Date.now() - begin).to.be.greaterThan(299);
			});
		});

		describe(`${title}::Tools::sortObject`, () => {
			it('should be correct sorted - not filtred', async () => {
				const orig = {
					'12'  : 1,
					'3'   : 2,
					4     : 3,
					'99'  : 4,
					'asdf': 5
				};
				const correct = {
					'3' : 2,
					'4' : 3,
					'12': 1,
					'99': 4
				};
				expect(tools.sortObject(orig)).to.deep.equal(correct);
			});

			it('should be correct sorted - filtred', async () => {
				const orig = {
					'12'  : 1,
					'3'   : 2,
					4     : 3,
					'99'  : 4,
					'asdf': 5
				};
				const correct = {
					'3'   : 2,
					'4'   : 3,
					'12'  : 1,
					'99'  : 4,
					'asdf': 5
				};
				expect(tools.sortObject(orig, true)).to.deep.equal(correct);
			});
		});

		describe(`${title}::Tools::iterate`, () => {
			it('should iterate through numbers', () => {
				const arr = (tools.iterate(10, (val: any) => val, [])) as Array<number>;

				expect(arr.length).to.equal(10);
				expect(arr[2]).to.equal(2);
			});

			it('should iterate through objects', () => {
				const arr = (tools.iterate({
					x: 10,
					y: 20,
					z: 30
				}, (val: any) => val, [])) as Array<any>;
				expect(arr.length).to.equal(3);
			});

			it('should iterate through arrays', () => {
				const arr = (tools.iterate([1, 2, 3], (val: any) => val, [])) as Array<any>;
				expect(arr.length).to.equal(3);
			});

			it('should not iterate through string', () => {
				const string = (tools.iterate('string', (val: any) => val, [])) as Array<any>;
				expect(string).to.equal(false);
			});
		});
	});
}

doTests(toolsFull, 'Full');
doTests(toolsMin, 'Minimifed');
