export interface ICard {
  id: number;
  number: String;
  type: String;
  cvv: String;
  pin: String;
  expiration: Date;
}

export interface ICreateCardInput {
  number: String;
  type: String;
  cvv: String;
  pin: String;
  expiration: String;
}

export interface ICardResponse {
  cardNumber: String;
  cvv: String;
  date: String;
  fullName: String;
  pin: String;
  type: String;
}
