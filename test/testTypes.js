const assert = require('assert');

let testTypes = {
	'undefined' : undefined,
	'null'      : null,
	'zero'      : 0,
	'intPos'    : 42,
	'intNeg'    : -42,
	'floatPos'  : 42.42,
	'floatNeg'  : -42.42,
	'string'    : 'string',
	'false'     : false,
	'true'      : true,
	'array'     : ['a', 'b', 'c'],
	'object'    : {a: 1, b: true, c: 'hello'},
	'nullArray' : [],
	'nullObject': {},

	'function'         : function () {},
	'generatorFunction': function* () {},
	'asyncFunction'    : async function () {},
	'promise'          : new Promise((resolve => resolve()))
};

module.exports = (fn, rules, dbg = false) => {
	Object.keys(testTypes).forEach((idx) => {
		const result = fn(testTypes[idx]);
		if (dbg && (result !== (rules[idx] || false))) {console.log('Error', idx);}
		assert.equal(result, rules[idx] || false);
	});

};