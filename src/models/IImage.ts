'use strict';

export default interface IImage {
  _id: string;
  description?: string;
  image?: Buffer;
  createdAt: string;
  updatedAt: string;
}
