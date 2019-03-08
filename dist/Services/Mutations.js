import gql from 'graphql-tag';
export const CREATE_USER = gql `
  mutation createUser(
    $name: String!
    $mailId: String!
    $seatNumber: String!
    $password: String!
  ) {
    createUser(
      name: $name
      mailId: $mailId
      seatNumber: $seatNumber
      password: $password
    ) {
      id
    }
  }
`;
export const CREATE_ORDER = gql `
  mutation createOrder($status: String!, $userId: ID, $menuItemIds: [ID!]) {
    createOrder(status: $status, userId: $userId, menuItemIds: $menuItemIds) {
      id
      status
      user {
        id
        name
        mailId
        seatNumber
      }
      menuItem {
        id
        name
        imageURL
      }
    }
  }
`;
export const UPDATE_ORDER = gql `
  mutation updateOrder(
    $id: ID!
    $status: String!
    $userId: ID
    $menuItemIds: [ID!]
  ) {
    updateOrder(
      id: $id
      status: $status
      userId: $userId
      menuItemIds: $menuItemIds
    ) {
      id
      status
      user {
        id
        name
        mailId
        seatNumber
      }
      menuItem {
        id
        name
        imageURL
      }
    }
  }
`;
//# sourceMappingURL=Mutations.js.map