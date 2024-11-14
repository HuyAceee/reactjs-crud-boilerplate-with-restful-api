// Built-in type
export type AnyObject = Record<string, any>;
type AnyArray = any[];
type AnyFunction = (...args: any[]) => any;
type PrimitiveType = string | number | boolean | null | undefined | AnyObject | AnyArray;

// Utils
type NotNull<T> = T extends null | undefined ? never : T;
export type DeepRequired<T> = T extends undefined | null | boolean | string | number | Function
  ? NotNull<T>
  : {
      [P in keyof T]-?: T[P] extends Array<infer U>
        ? Array<DeepRequired<U>>
        : T[P] extends ReadonlyArray<infer U2>
          ? DeepRequired<U2>
          : DeepRequired<T[P]>;
    };

type PickKeysByValue<T, V> = {
  [K in keyof T]: T[K] extends AnyFunction ? never : T[K] extends V ? K : never;
}[keyof T];
type PickProperties<T, P> = Pick<T, PickKeysByValue<T, P>>;
type GetKeyWithTypes<T, P> = Exclude<keyof PickProperties<T, P>, never>;

// Mains
type SubKeys<T, K extends string> = K extends keyof T ? `${K}.${PathKeyOfObject<T[K]>}` : never;

type PathKeyOfObject<T> = object extends T
  ? string
  : T extends any[]
    ?
        | Extract<GetKeyWithTypes<T[number], PrimitiveType>, string>
        | SubKeys<T[number], Extract<GetKeyWithTypes<T[number], PrimitiveType>, string>>
    : T extends object
      ?
          | Extract<GetKeyWithTypes<T, PrimitiveType>, string>
          | SubKeys<T, Extract<GetKeyWithTypes<T, PrimitiveType>, string>>
      : never;

type Path<T> = PathKeyOfObject<T>;

export type OrderSorter = 'desc' | 'asc' | undefined;
export type Sorter<T extends AnyObject> = Partial<Record<Path<T>, OrderSorter>>;

export type SearcherOperator = 'gte' | 'lte' | 'eq' | 'in' | 'contains' | 'or';

interface SearcherValue {
  operator: SearcherOperator | null;
  value?: any;
}
export type Searcher<T extends AnyObject, AdditionalKeys extends string = string> = Partial<
  Record<keyof T | AdditionalKeys, SearcherValue | SearcherValue[]>
> &
  Partial<Record<Path<T>, SearcherValue | SearcherValue[]>>;
