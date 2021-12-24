// noinspection JSUnusedGlobalSymbols

import * as iterations from './iteraions';
import * as validations from './validations';
import {iterate} from './iteraions';

/** [[include: guid.md]]
 *  @returns {string} GUIDv4 string
 */
function GUID(mask: string = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'): string {
	return mask.replace(/[xy]/g, (c) => {
		let r = Math.random() * 16 | 0;
		return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
	});
}

/** Generate 128bit unique id
 *  @param prefix
 *  @param mask
 */
function UID(prefix: string = '', mask: string = 'xxxxxxxxxxxxxxxxxx-xxxxxx') {
	return `${prefix}${mask}`.replace(/[x]/g, () => (Math.random() * 36 | 0).toString(36)[Math.random() >= 0.5 ? 'toUpperCase' : 'toLowerCase']());
}

/** [[include: TAnyArray-to-object.md]]
 *  @param value
 *  @param toKeys
 */
function arrayToObject(value: Array<any>, toKeys?: boolean | false): { [key: string]: any } {
	return (iterations.iterate(value, (row: any, idx: number | string, iter) => {
		if (toKeys) {
			if (validations.isInteger(row) || validations.isString(row)) iter.key(idx as number + 1);

			return row;
		} else {
			iter.key(row);

			return idx as number + 1;
		}
	}, {}));
}

/** [[include: object-to-TAnyArray.md]] */
function objectToArray(value: object, toKeys?: boolean | false): Array<any> {
	return iterations.iterate(value, (val: any, key: any) => toKeys ? key : val, []) as Array<any>;
}

/** [[include: to-TAnyArray.md]] */
function toArray<T = any>(value: T | Array<T>): Array<T> {
	return validations.isArray(value) ? value as Array<T> : [value as T];
}

/** Sync void empty function (No Operation) */
function nop(): void {}

/** Async void empty function (No Operation Async) */
async function nop$(): Promise<void> {
	return new Promise(resolve => resolve());
}

/** [[include: set-defaults.md]] */
function setDefaults(obj: { [key: string]: any }, name: string | number, value?: any): object {
	if (validations.isUndefined(obj[name])) {
		obj[name] = value;
	}

	return obj;
}

/** Escapes all special RegExp characters */
function escapeRegExp(value: string): string {
	return value.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1');
}

/**
 * Waits for ms via async/await
 * @param ms time to wait or 100
 */
async function delay(ms?: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms || 100));
}

export {
	GUID,
	UID,
	arrayToObject,
	escapeRegExp,
	nop,
	nop$,
	objectToArray,
	setDefaults,
	toArray,
	delay
};
