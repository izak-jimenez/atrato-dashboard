import { gql } from "@apollo/client";

export const CreateUser = gql`
  mutation CreateUser($data: UserCreateInput!) {
    createUser(data: $data) {
      assignedAnalyst
      birthday
      email
      fLastName
      id
      middleName
      name
      phone
      sLastName
      status
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

export const UpdateUser = gql`
  mutation UpdateUser($data: UserUpdateInput!) {
    updateUser(data: $data) {
      name
      middleName
      fLastName
      sLastName
      email
      phone
      birthday
      status
      assignedAnalyst
    }
  }
`;

export const CreateCard = gql`
  mutation CreateCard($data: CardCreateInput!) {
    createCard(data: $data) {
      id
      number
      type
      cvv
      pin
      expiration
    }
  }
`;
