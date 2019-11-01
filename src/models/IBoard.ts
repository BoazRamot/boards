'use strict';

import IImage from './IImage';
import IPost from './IPost';
import IUser from './IUser';

export default interface IBoard {
  _id: string;
  name: string;
  latLng: { lat: number; lng: number };
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  description?: string;
  address?: string;
  images?: IImage[];
  posts?: IPost[];
  members?: IUser[];
}
