'use strict';

import IComment from './IComment';
import IImage from './IImage';

export default interface IPost {
  _id: string;
  userId: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  content?: string;
  images?: IImage[];
  comments?: IComment[];
}
