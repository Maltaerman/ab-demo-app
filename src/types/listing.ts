export interface IMeta {
  currentPage: number;
  lastPage: number;
}

export interface IListing<T> {
  readonly data: T[];
  readonly meta: Readonly<IMeta>;
}
