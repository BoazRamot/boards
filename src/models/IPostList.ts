'use strict';

import IPost from './IPost';

export default interface IPostList {
  [id: string]: IPost;
}
