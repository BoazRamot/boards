import IDataService from '../models/IDataService';
import CacheService from './cache.service';
import * as querystring from 'querystring';

export enum DataCollections {
  Boards = 'boards',
  Posts = 'posts',
  Comments = 'comments',
  Users = 'users',
}

const PORT = 4000;
const baseURL = `http://localhost:${PORT}`;
const apiURL = `${baseURL}/api`;
export const imagesURL = `${baseURL}/images`;
const cacheService = new CacheService();

export default class DataService<T> implements IDataService<T> {
  public setCache(collectionName: string, idField = '_id') {
    cacheService.addCollection(collectionName, idField);
  }

  public removeCache(collectionName: string) {
    cacheService.removeCollection(collectionName);
  }

  public async get(collectionName: string, conditions = {}): Promise<T[]> {
    if (cacheService.has(collectionName)) {
      const cachedData = cacheService.get(collectionName) as T[];
      if (cachedData.length > 0) {
        return cachedData;
      }
    }
    const response = await errorHandler(fetch(`${apiURL}/${collectionName}${conditions ? `?${querystring.stringify(conditions)}` : ''}`));
    const result = await response.json();
    if (cacheService.has(collectionName)) {
      cacheService.setMany(collectionName, result);
    }
    return result;
  }

  public async getById(collectionName: string, id: string): Promise<T> {
    if (cacheService.has(collectionName, id)) {
      return cacheService.get(collectionName, id) as T;
    }
    const response = await errorHandler(fetch(`${apiURL}/${collectionName}/${id}`));
    const result = await response.json();
    if (cacheService.has(collectionName)) {
      cacheService.setOne(collectionName, result);
    }
    return result;
  }

  public async insert(collectionName: string, data: FormData): Promise<T> {
    const response = await errorHandler(
      fetch(`${apiURL}/${collectionName}/`, {
        method: 'POST',
        body: data,
      }),
    );
    const result = await response.json();
    if (cacheService.has(collectionName)) {
      cacheService.setOne(collectionName, result);
    }
    return result;
  }

  public async update(
    collectionName: string,
    id: string,
    data: FormData,
  ): Promise<T> {
    const response = await errorHandler(
      fetch(`${apiURL}/${collectionName}/${id}`, {
        method: 'PUT',
        body: data,
      }),
    );
    const result = await response.json();
    if (cacheService.has(collectionName)) {
      cacheService.setOne(collectionName, result);
    }
    return result;
  }

  public async remove(collectionName: string, id: string): Promise<boolean> {
    const response = await errorHandler(
      fetch(`${apiURL}/${collectionName}/${id}`, {
        method: 'DELETE',
      }),
    );
    if (cacheService.has(collectionName)) {
      cacheService.delete(collectionName, id);
    }
    return response.json();
  }
}

/*** Helper Functions ***/
async function errorHandler(fetch: Promise<Response>) {
  const response = await fetch;
  if (!response.ok) {
    const result = await response.json();
    throw result.error.message;
  }
  return response;
}
