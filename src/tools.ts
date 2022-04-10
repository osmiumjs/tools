// noinspection JSUnusedGlobalSymbols

import * as iterations from './iteraions';
import * as validations from './validations';

let nodejsCrypto: any = false;
if (new Function('try {return this===global;}catch(e){return false;}')) {
	nodejsCrypto = require('crypto');
}

export function random(): number {
	if (nodejsCrypto) {
		if (!Object.keys(nodejsCrypto || {}).length) {
			return Math.random();
		}
		return nodejsCrypto.randomInt(0, 32 ** 8) / (0xffffffffff + 1);
	}

	return window.crypto.getRandomValues(new Uint32Array(1))[0] / (0xffffffff + 1);
}

/** [[include: guid.md]]
 *  @returns {string} GUIDv4 string
 */
export function GUID(mask: string = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'): string {
	return mask.replace(/[xy]/g, (c) => {
		let r = random() * 16 | 0;
		return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
	});
}

/** Generate 128bit unique id */
export function UID(prefix: string = '', mask: string = 'xxxxxxxxxxxxxxxxxx-xxxxxx') {
	return `${prefix}${mask}`.replace(/[x]/g, () => (random() * 36 | 0).toString(36)[random() >= 0.5 ? 'toUpperCase' : 'toLowerCase']());
}

/** [[include: TAnyArray-to-object.md]] */
export function arrayToObject(value: Array<any>, toKeys?: boolean | false): { [key: string]: any } {
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
export function objectToArray(value: object, toKeys?: boolean | false): Array<any> {
	return iterations.iterate(value, (val: any, key: any) => toKeys ? key : val, []) as Array<any>;
}

/** [[include: to-TAnyArray.md]] */
export function toArray<T = any>(value: T | Array<T>): Array<T> {
	return validations.isArray(value) ? value as Array<T> : [value as T];
}

/** Sync void empty function (No Operation) */
export function nop(): void {
	return;
}

/** Async void empty function (No Operation Async) */
export async function nop$(): Promise<void> {
	return new Promise(resolve => resolve());
}

/** [[include: set-defaults.md]] */
export function setDefaults(obj: { [key: string]: any }, name: string | number, value?: any): object {
	if (validations.isUndefined(obj[name])) {
		obj[name] = value;
	}

	return obj;
}

/** Escapes all special RegExp characters */
export function escapeRegExp(value: string): string {
	return value.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1');
}

/**
 * Waits for ms via async/await
 * @param ms time to wait or 100
 */
export async function delay(ms?: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms || 100));
}

export function sortObject<T extends { [key: string]: any } = { [key: string]: any }>(target: T, onlyNumIdx = false): T {
	const out: { [key: string]: any } = {};
	const objKeys = Object.keys(target);

	(onlyNumIdx ? objKeys : objKeys.filter(idx => !isNaN(parseInt(idx)))).forEach((idx) => {
		out[idx] = target[idx];
	});

	return out as T;
}

export function mapToArray<T = any, K = any>(value: Map<T, K>): Array<[T, K]> {
	const out = [];

	for (let entry of value) {
		out.push(entry);
	}

	return out;
}