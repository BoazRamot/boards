import * as querystring from 'querystring';
import IDataService from '../models/IDataService';

export enum DataCollections {
  Boards = 'boards',
  Posts = 'posts',
  Comments = 'comments',
  Images = 'images',
  Users = 'users',
}

const port = process.env.PORT || 5000;
export const serverUrl =
  process.env.SERVER_URL || `http://localhost:${port}/api`;

export default class DataService<T> implements IDataService<T> {
  public async get(
    collectionPath: string,
    conditions?: any,
    headers?: any,
  ): Promise<T[]> {
    const response = await errorHandler(
      fetch(
        `${serverUrl}/${collectionPath}${
          conditions ? `?${querystring.stringify(conditions)}` : ''
        }`,
        {
          headers: new Headers(headers),
        },
      ),
    );
    return response.json();
  }

  public async getById(collectionPath: string, documentId: string): Promise<T> {
    const response = await errorHandler(
      fetch(`${serverUrl}/${collectionPath}/${documentId}`),
    );
    return response.json();
  }

  public async insert(
    collectionPath: string,
    data: FormData,
    headers?: any,
  ): Promise<T> {
    const response = await errorHandler(
      fetch(`${serverUrl}/${collectionPath}`, {
        method: 'POST',
        body: data,
        headers: new Headers(headers),
      }),
    );
    return response.json();
  }

  public async update(
    collectionPath: string,
    data: FormData,
    conditions?: any,
    headers?: any,
  ): Promise<object> {
    const response = await errorHandler(
      fetch(
        `${serverUrl}/${collectionPath}${
          conditions ? `?${querystring.stringify(conditions)}` : ''
        }`,
        {
          method: 'PUT',
          body: data,
          headers: new Headers(headers),
        },
      ),
    );
    return response.json();
  }

  public async updateById(
    collectionPath: string,
    documentId: string,
    data: FormData,
    headers?: any,
  ): Promise<T> {
    const response = await errorHandler(
      fetch(`${serverUrl}/${collectionPath}/${documentId}`, {
        method: 'PUT',
        body: data,
        headers: new Headers(headers),
      }),
    );
    return response.json();
  }

  public async remove(
    collectionPath: string,
    conditions?: any,
    headers?: any,
  ): Promise<object> {
    const response = await errorHandler(
      fetch(
        `${serverUrl}/${collectionPath}${
          conditions ? `?${querystring.stringify(conditions)}` : ''
        }`,
        {
          method: 'DELETE',
          headers: new Headers(headers),
        },
      ),
    );
    return response.json();
  }

  public async removeById(
    collectionPath: string,
    documentId: string,
    headers?: any,
  ): Promise<boolean> {
    const response = await errorHandler(
      fetch(`${serverUrl}/${collectionPath}/${documentId}`, {
        method: 'DELETE',
        headers: new Headers(headers),
      }),
    );
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
