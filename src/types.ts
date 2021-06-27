/** Assign mode type */
export type TAssign = boolean | false;

/** Object with any fields */
export type TAnyObject = { [key: string]: any };

/** Array with any element's type */
export type TAnyArray = any[];

export type TIterableValueData = TAnyArray | TAnyObject | string | number | boolean | undefined | void;

export type TIterableValueDataPromise = Promise<TIterableValueData>;

export type TIterableValue = TIterableValueData | TIterableValueDataPromise;

/** All possible iterate return values */
export type TIterateDataResult = TStringOrNumber | undefined | boolean | TAnyObject | TAnyArray;

/** Promise with all possible iterate return values */
export type TIteratePromiseResult = Promise<TIterateDataResult>;

/** All possible iterate return values (include TIteratePromiseResult for async mode) */
export type TIterateResult = TIterateDataResult | TIteratePromiseResult;

/** String or number */
export type TStringOrNumber = string | number;

/** Accumulate type */
export type TAccumulate = TStringOrNumber | TAnyArray | object | false | undefined;

/** Promise with any return type */
export type TAnyPromise = Promise<any>;
