export class Property {
  name:   string;
  price: number;
  images: string;
  verified: string;
  location: string;
  lon: number;
  lat: number;

  constructor({
    name,
    price,
    images,
    verified,
    location,
    lon,
    lat,
  }: PropertyStruct) {
    this.name = name;
    this.images = images;
    this.lat = lat;
    this.lon = lon;
    this.location = location;
    this.price = price;
    this.verified = verified;
  }
}

interface PropertyStruct {
  name: string;
  price: number;
  images: string;
  verified: string;
  location: string;
  lon: number;
  lat: number;
}
