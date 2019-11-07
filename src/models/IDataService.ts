'use strict';

export default interface IDataService<T> {
  get: (
    collectionPath: string,
    conditions?: object,
    headers?: object,
  ) => Promise<T[]>;
  getById: (collectionPath: string, documentId: string) => Promise<T>;
  insert: (
    collectionPath: string,
    data: FormData,
    headers?: object,
  ) => Promise<T>;
  update: (
    collectionPath: string,
    data: FormData,
    conditions?: object,
    headers?: object,
  ) => Promise<object>;
  updateById: (
    collectionPath: string,
    documentId: string,
    data: FormData,
    headers?: object,
  ) => Promise<T>;
  remove: (
    collectionPath: string,
    conditions?: object,
    headers?: object,
  ) => Promise<object>;
  removeById: (
    collectionPath: string,
    documentId: string,
    headers?: object,
  ) => Promise<boolean>;
}
