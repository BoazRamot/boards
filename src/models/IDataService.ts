'use strict';

export default interface IDataService<T> {
  get: (collectionName: string, conditions?: object) => Promise<T[]>;
  getById: (collectionName: string, id: any) => Promise<T>;
  insert: (collectionName: string, data: FormData) => Promise<T>;
  update: (collectionName: string, id: any, data: FormData) => Promise<T>;
  remove: (collectionName: string, id: any) => Promise<boolean>;
}
