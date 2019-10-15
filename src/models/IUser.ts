'use strict';

export default interface IUser {
  _id: string;
  name: string;
  email: string;
  joinDate: string;
  image?: string;
}
