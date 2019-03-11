import gql from 'graphql-tag';

// Call this at signUp
export const CREATE_USER = gql`
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

// Call this when user have an order placed and user is trying to increase the number of menu item that is already added
export const UPDATE_MENU_ORDER_ITEM = gql`
  mutation updateMenuItemInOrder($id: ID!, $numberOfItems: Int!) {
    updateMenuItemInOrder(id: $id, numberOfItems: $numberOfItems) {
      id
      menuItem {
        id
        name
        imageURL
      }
      order {
        id
      }
      numberOfItems
    }
  }
`;

// Call this when user have an order placed and user is trying to add new items to cart
export const CREATE_MENU_ORDER_ITEM_FOR_EXISTING_ORDER = gql`
  mutation createMenuItemInOrder($menuItemId: ID!, $orderId: ID!) {
    createMenuItemInOrder(
      menuItemId: $menuItemId
      numberOfItems: 1
      orderId: $orderId
    ) {
      id
      order {
        id
      }
    }
  }
`;

// Call this before calling CREATE_ORDER Mutation
export const CREATE_MENU_ORDER_ITEM_FOR_FOR_NEW_ORDER = gql`
  mutation createMenuItemInOrder($menuItemId: ID!) {
    createMenuItemInOrder(menuItemId: $menuItemId, numberOfItems: 1) {
      id
      menuItem {
        id
      }
    }
  }
`;

// Call this when is user has no orders placed
export const CREATE_ORDER = gql`
  mutation createOrder($userId: ID, $menuItemIds: [ID!]) {
    createOrder(
      status: "Order Placed"
      userId: $userId
      menuItemIds: $menuItemIds
    ) {
      id
    }
  }
`;

// export const UPDATE_ORDER = gql`
//   mutation updateOrder(
//     $id: ID!
//     $status: String!
//     $userId: ID
//     $menuItemIds: [ID!]
//   ) {
//     updateOrder(
//       id: $id
//       status: $status
//       userId: $userId
//       menuItemIds: $menuItemIds
//     ) {
//       id
//       status
//       user {
//         id
//         name
//         mailId
//         seatNumber
//       }
//       menuItem {
//         id
//         name
//         imageURL
//       }
//     }
//   }
// `;
