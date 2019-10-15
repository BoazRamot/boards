'use strict';

export default interface IBoard {
  _id: string;
  name: string;
  description: string;
  address: string;
  latLng: { lat: number; lng: number };
  createdAt: string;
  creatorId: string;
  image?: string;
}
