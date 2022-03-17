import {Address} from "./address";
import {PropertyDetails} from "./propertyDetails";

export interface Property {
  idProperty : number;
  idUser: number;
  land: string;
  city: string;
  street: string;
  nr: string;
  postDate: Date;
  description: PropertyDetails;
  photoPath: string;
  nrOfRooms: number;
  nrOfBathromms: number;
  area: number;
  rating: number;
  floor: number;
  divisionType: string;
  style: string;
  availableFrom: Date;
  parkingLotsAvailable: number;
  liked: boolean;
}
