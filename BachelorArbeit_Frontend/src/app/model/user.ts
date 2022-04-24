import {Property} from "./property";

export interface User {
  idUser: number;
  firstName: string;
  lastName: string;
  mobileNumber: string;
  email: string;
  password: string;
  role: string;
  status: number;
  token: string;
  birthDay: Date;
  likedApartments: any[];
}
