import gql from 'graphql-tag';

// Checks if mail enetered by user at signup is already registered
export const checkIfUserHasAlreadyRegistered = gql`
  query checkIfUserHasAlreadyRegistered($mailId: String!) {
    allUsers(filter: { mailId: $mailId }) {
      id
      mailId
    }
  }
`;

export const checkForUserLoginCredentials = gql`
  query checkForUserLoginCredentials($mailId: String!, $password: String!) {
    allUsers(filter: { mailId: $mailId, password: $password }) {
      id
    }
  }
`;

export const menuItemList = gql`
  query {
    allMenus {
      id
      name
      imageURL
    }
  }
`;

export const getOrdersForUser = gql`
  query getOrderForCurrentUser($id: ID) {
    allOrders(filter: { user: { id: $id } }) {
      id
      status
      menuItem {
        id
        name
      }
      user {
        id
        name
      }
    }
  }
`;

export const getCartProducts = gql`
  query getOrderForCurrentUser($id: ID) {
    allOrders(filter: { user: { id: $id } }) {
      id
      menuItem {
        id
        name
        imageURL
      }
    }
  }
`;
