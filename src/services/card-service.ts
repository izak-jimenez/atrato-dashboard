import axios from "axios";
import { ICardResponse } from "src/types/card";

export interface ApiError {
  message: string;
  status: number;
}

export const getCard = async (): Promise<ICardResponse | ApiError> => {
  try {
    const { data } = await axios.get<ICardResponse>(
      "https://randommer.io/api/Card",
      {
        headers: {
          "X-Api-Key": "f3b80c8d2c6a478e89445e919e625fff",
        },
      }
    );
    return data;
  } catch (error) {
    return {
      message: error.message,
      status: error.response.status,
    };
  }
};
