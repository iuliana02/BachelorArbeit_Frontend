export interface RentalRequest {
  idRequest: number;
  idProperty: number;
  idLandlord: number;
  idTenant: number;
  question1: string;
  question2: string;
  question3: string;
  evaluated: boolean;
  dateOfRequest: Date;
  nameRequester: string;
}
