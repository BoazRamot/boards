export class Board {
  public id: string;
  public name: string;
  public location: object;
  public community: string;
  public description: string;
  public posts: Array<any>;
  public users: Array<any>;
  public created: Array<any>;

  constructor(spec: any) {
    this.id = spec._id;
    this.name = spec.name;
    this.location = new Location(spec.location);
    this.community = spec.community;
    this.description = spec.description;
    this.posts = spec.posts;
    this.users = spec.users;
    this.created = spec.created;
  }
}

class Location {
  public address: string;
  public info: string;
  public latitude: object;
  public longitude: string;

  constructor(spec: any) {
    this.address = spec.address;
    this.info = spec.info;
    this.latitude = spec.latitude;
    this.longitude = spec.longitude;
  }
}