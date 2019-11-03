'use strict';

import IImage from './IImage';
import IPost from './IPost';
import IUser from './IUser';

export default interface IBoard {
  _id: string;
  name: string;
  location: {
    address?: string;
    info?: string;
    latitude: number;
    longitude: number;
  };
  // community: string; // same as members?
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  description?: string;
  images?: IImage[];
  posts?: IPost[];
  members?: IUser[];
}
