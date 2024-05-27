import { gql } from "@apollo/client";

export const AllUsersQuery = gql`
  query {
    users {
      id
      email
      phone
      name
      middleName
      fLastName
      sLastName
      birthday
      status
      assignedAnalyst
      card {
        id
        number
        type
        cvv
        pin
        expiration
      }
    }
  }
`;

export const FindUser = gql`
  query User($userId: Int!) {
    user(id: $userId) {
      id
      name
      middleName
      fLastName
      sLastName
      email
      phone
      status
      assignedAnalyst
      card {
        id
        number
        cvv
        type
        pin
        expiration
      }
    }
  }
`;
