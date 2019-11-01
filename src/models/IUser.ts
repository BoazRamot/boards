'use strict';

import IBoard from './IBoard';
import IImage from './IImage';

export default interface IUser {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  avatar?: IImage;
  images?: IImage[];
  boards?: string[] | IBoard[];
}
