export type ArrayKeys<K> = StringOnly<
  K extends readonly (infer E)[] ? E : K extends (infer E)[] ? E : K
>;

export type AssertNever<T extends never> = T;

export type Merge<A, B> = Omit<A, keyof B> & B;
export type UnionMerge<A, B> = Omit<A, keyof A & keyof B> &
  Omit<B, keyof A & keyof B> &
  { [K in keyof A & keyof B]: A[K] | B[K] };

export type PickCesiumProps<
  T,
  K extends any[] | readonly any[] | string,
  Required extends ArrayKeys<K> = never
> = RemoveReadOnlyAndPartial<Pick<T, ArrayKeys<K>>, Required>;

export type ConstructorOptions<T extends new (...args: any[]) => any> = ConstructorParameters<T>[0];
export type ConstructorOptions2<T extends new (...args: any[]) => any> = ConstructorParameters<
  T
>[1];

export type UnusedCesiumProps<T, K> = Exclude<
  Exclude<keyof T, ExtractFunctions<T> | ReadonlyKeys<T>>,
  ArrayKeys<K>
>;

type StringOnly<K> = K extends string ? K : never;

type ExtractFunctions<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => any ? K : never;
}[keyof T];

type IfEquals<X, Y, A = X, B = never> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y
  ? 1
  : 2
  ? A
  : B;

type IfNotEquals<X, Y, A = never, B = Y> = IfEquals<X, Y, A, B>;

type ReadonlyKeys<T> = {
  [P in keyof T]-?: IfEquals<{ [Q in P]: T[P] }, { -readonly [Q in P]: T[P] }, never, P>;
}[keyof T];

type RemoveReadOnlyAndPartial<T, Required extends keyof T = never> = {
  -readonly [key in keyof Pick<T, Required>]: T[key];
} &
  {
    -readonly [key in keyof Omit<T, Required>]?: T[key];
  };