import type { ICard } from "./card";

export enum Status {
  PENDING = "PENDING",
  PROCESSING = "PROCESSING",
  COMPLETED = "COMPLETED",
}

export interface IUser {
  id: number;
  name: String;
  middleName?: String;
  fLastName: String;
  sLastName?: String;
  email: String;
  phone: String;
  birthday?: String;
  status: Status;
  assignedAnalyst: String;
  card: ICard;
}

export interface ICreateUserInput {
  name: String;
  middleName?: String;
  fLastName: String;
  sLastName?: String;
  email: String;
  phone: String;
  birthday?: String;
  status: Status;
  assignedAnalyst: String;
  cardId: Number;
}
