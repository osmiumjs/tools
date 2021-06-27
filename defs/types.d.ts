/** Assign mode type */
export declare type TAssign = boolean | false;
/** Object with any fields */
export declare type TAnyObject = {
    [key: string]: any;
};
/** Array with any element's type */
export declare type TAnyArray = any[];
export declare type TIterableValueData = TAnyArray | TAnyObject | string | number | boolean | undefined | void;
export declare type TIterableValueDataPromise = Promise<TIterableValueData>;
export declare type TIterableValue = TIterableValueData | TIterableValueDataPromise;
/** All possible iterate return values */
export declare type TIterateDataResult = TStringOrNumber | undefined | boolean | TAnyObject | TAnyArray;
/** Promise with all possible iterate return values */
export declare type TIteratePromiseResult = Promise<TIterateDataResult>;
/** All possible iterate return values (include TIteratePromiseResult for async mode) */
export declare type TIterateResult = TIterateDataResult | TIteratePromiseResult;
/** String or number */
export declare type TStringOrNumber = string | number;
/** Accumulate type */
export declare type TAccumulate = TStringOrNumber | TAnyArray | object | false | undefined;
/** Promise with any return type */
export declare type TAnyPromise = Promise<any>;
