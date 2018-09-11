const tools = {};

/**
 * Generate GUIDv4 string
 * @returns {string} - GUIDv4 string
 */
tools.GUID = () => 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
	let r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
	return v.toString(16);
});

/**
 * @private
 */
tools._testConstructor = (constrName, val) => !tools.isUndefined(val) && !tools.isNull(val) && val.constructor && val.constructor.name === constrName;

/**
 * Is function generator-function (function*)?
 * @param {function} - test function
 * @return {boolean} - result
 */
tools.isGeneratorFunction = tools._testConstructor.bind(undefined, 'GeneratorFunction');

/**
 * Is function async-function (async function)?
 * @param {function} - test function
 * @returns  {boolean} - result
 */

tools.isAsyncFunction = (val) => {
	if (!val) return false;
	let afcText = val.toString().toLocaleLowerCase().replace(/\n/g, '').replace(/ /g, '');
	return tools._testConstructor('AsyncFunction', val)
		|| ((tools._testConstructor('Function', val) && (afcText.slice(afcText.indexOf('{')).indexOf('returnnewpromise(function($return,$error)') === 1))); //fast-async monkey-support
};

/**
 * Is function anytype-function (normal/generator/async function)?
 * @param {function} - test function
 * @returns  {boolean}
 */
tools.isFunction = (val) => tools._testConstructor('Function', val) || tools.isAsyncFunction(val) || tools.isGeneratorFunction(val);

tools.isUndefined = (val) => typeof val === 'undefined';
tools.isArray = tools._testConstructor.bind(undefined, 'Array');
tools.isObject = (val) => ({}.toString.call(val)) === '[object Object]';
tools.isNativeObject = tools._testConstructor.bind(undefined, 'Object');
tools.isString = tools._testConstructor.bind(undefined, 'String');
tools.isNull = (val) => Object.prototype.toString.call(val) === '[object Null]';
tools.isBoolean = (val) => Object.prototype.toString.call(val) === '[object Boolean]';
tools.isNumber = Number.isFinite;
tools.isInteger = Number.isSafeInteger;

/**
 * Is integer 0 or positive (not negative)
 * @param val {number} - Test integer value
 * @returns {boolean | *}
 */
tools.isPositiveInteger = (val) => tools.isInteger(val) && (val >= 0);

/**
 * Is val iterable (object or array with not null length)
 * @param val {array|object} - Iterable val
 * @returns {boolean}
 */
tools.isIterable = (val) => (tools.isObject(val) ? !!Object.keys(val).length : false)
	|| (tools.isArray(val) ? !!val.length : false);

/**
 * Is val JSON and decoded as object
 * @param val {string} - test value
 * @returns {boolean}
 */
tools.isJSON = (val) => {
	if (!tools.isString(val)) return false;
	try {
		const obj = JSON.parse(val);
		return !!obj && typeof obj === 'object';
	} catch (e) { /* ignore */
	}
	return false;
};

tools.isGUIDv4 = (val) => tools.isString(val) && /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i.test(val);
tools.isGUID = (val) => tools.isString(val) && /^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i.test(val);
tools.isPrototype = (proto, ofWhat) => Object.prototype.isPrototypeOf.call(proto, ofWhat);

tools.toArray = (what) => tools.isArray(what) ? what : [what];
tools.arrayToObject = (target, toKeys = false) => tools.iterate(target, (row, idx, iter) => {
	if (toKeys) {
		if (tools.isInteger(row) || tools.isString(row)) iter.key(idx + 1);
		return row;
	} else {
		iter.key(row);
		return idx + 1;
	}
}, {});

tools.objectToArray = (target, toKeys = false) => tools.iterate(target, (val, key) => toKeys ? key : val, []);

tools.nop = () => {};
tools.nop$ = async () => {};
tools.now = () => new Date().getTime();

tools.setDefaults = (obj = {}, name, val) => {
	obj[name] = obj[name] || val;
	return obj;
};

tools.escapeRegExp = (string) => string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1');
tools.delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms || 100));

tools.log = (...msg) => console.log(...msg);

//@todo: move it to sequelize/db unit
tools.getDataValues = (rows, column) =>
	tools.iterate(rows || [], (row) => column ? row.dataValues[column] : row.dataValues, []);

tools.iterateKeys = (what, callback, acc = false) => tools.isAsyncFunction(callback)
	? (async () => await tools.iterate(what, async (row, key, iteration) => await callback(key, row, iteration), acc))()
	: tools.iterate(what, (row, key, iteration) => callback(key, row, iteration), acc);

tools.iterate = (what, callback, acc = false, assign = false) => {
	let breakFlag = false;
	let newIteration = (index) => {
		let instance = {
			'break'   : () => breakFlag = true,
			accKeyName: index,
			key       : (name) => instance.accKeyName = name
		};
		return instance;
	};
	let iterateInstanceAsync = async (callback, val, index) => {
		let iteration = newIteration(index);
		pushRet(await callback(val, index, iteration), iteration);
	};
	let iterateInstance = (callback, val, index) => {
		let iteration = newIteration(index);
		pushRet(callback(val, index, iteration), iteration);
	};

	let ret = tools.isObject(acc) ? acc : tools.isArray(acc) ? acc : acc === true ? false : what;
	let pushRet = (val, iteration) => {
		if (tools.isUndefined(val)) return;
		if (tools.isObject(acc)) {
			ret[iteration.accKeyName] = assign
				? Object.add(ret[iteration.accKeyName] || {}, val)
				: val;
		}
		if (tools.isArray(acc)) ret.push(val);
		if (acc === true) ret = ret || val;
	};
	return tools.isAsyncFunction(callback)
		? new Promise(async (resolve) => {
			if (tools.isArray(what)) {
				for (let index = 0; index < what.length; ++index) {
					if (breakFlag) break;
					await iterateInstanceAsync(callback, what[index], index);
				}
				resolve(ret);
			}
			if (tools.isObject(what)) {
				await tools.iterate(Object.keys(what), async (index, _, iteration) => {
					if (breakFlag) iteration.break();
					await iterateInstanceAsync(callback, what[index], index);
				});
				resolve(ret);
			}
			if (tools.isInteger(what)) {
				for (let index = 0; index < what; ++index) {
					if (breakFlag) break;
					await iterateInstanceAsync(callback, index, index);
				}
				resolve(ret);
			}
			resolve(false);
		})
		: (() => {
			if (tools.isArray(what)) {
				for (let index = 0; index < what.length; ++index) {
					if (breakFlag) break;
					iterateInstance(callback, what[index], index);
				}
				return ret;
			}
			if (tools.isObject(what)) {
				tools.iterate(Object.keys(what), (index, _, iteration) => {
					if (breakFlag) iteration.break();
					iterateInstance(callback, what[index], index);
				});
				return ret;
			}
			if (tools.isInteger(what)) {
				for (let index = 0; index < what; ++index) {
					if (breakFlag) break;
					iterateInstance(callback, index, index);
				}
				return ret;
			}
			return false;
		})();
};

tools.iterateParallel = async (what, callback) =>
	Promise.all(tools.iterate(what, (val, key, iter) =>
		(async () => await callback(val, key, iter))(), [])
	);

module.exports = tools;