import { ApiError } from "src/services/card-service";
import { ICardResponse } from "src/types/card";
import { Status } from "../types/user";

export function isCard(
  getCardResponse: ICardResponse | ApiError
): getCardResponse is ICardResponse {
  return (
    (getCardResponse as ICardResponse).cardNumber !== undefined &&
    (getCardResponse as ICardResponse).cvv !== undefined &&
    (getCardResponse as ICardResponse).date !== undefined &&
    (getCardResponse as ICardResponse).fullName !== undefined &&
    (getCardResponse as ICardResponse).pin !== undefined &&
    (getCardResponse as ICardResponse).type !== undefined
  );
}

export function parseStatus(status: Status) {
  switch (status) {
    case Status.PENDING:
      return "PENDIENTE";
    case Status.PROCESSING:
      return "EN PROCESO";
    case Status.COMPLETED:
      return "COMPLETADO";
    default:
      return "PENDIENTE";
  }
}

export const addLeadingZeroToSingleDigitMonth = (digit: string) => {
  if (digit.length > 1) {
    return digit;
  }
  return `0${digit}`;
};

export const generateCreditCardExpiryDateString = (expiryDate: string) => {
  const date = new Date(expiryDate);
  return `${addLeadingZeroToSingleDigitMonth(
    date.getUTCMonth().toString()
  )}/${date.getUTCFullYear()}`;
};
