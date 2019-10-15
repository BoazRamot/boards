'use strict';

export default interface IPost {
  _id: string;
  boardId: string;
  userId: string;
  header: string;
  text: string;
  createdAt: string;
  image?: string;
}
