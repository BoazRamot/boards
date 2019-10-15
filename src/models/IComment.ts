'use strict';

export default interface IComment {
  _id: string;
  postId: string;
  userId: string;
  text: string;
  createdAt: string;
}
