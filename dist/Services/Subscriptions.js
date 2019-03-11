import gql from 'graphql-tag';
export const menuItemListSubscription = gql `
  subscription newMenuListItem {
    Menu(filter: { mutation_in: [CREATED, DELETED, UPDATED] }) {
      mutation
      node {
        id
        name
        imageURL
      }
      updatedFields
      previousValues {
        id
        name
        imageURL
      }
    }
  }
`;
export const orderListSubscription = gql `
  subscription newOrderItems {
    Order(filter: { mutation_in: [CREATED, DELETED, UPDATED] }) {
      mutation
      node {
        id
        status
        menuItem {
          id
          numberOfItems
        }
      }
      updatedFields
      previousValues {
        id
        status
      }
    }
  }
`;
export const menuOrderSubscription = gql `
  subscription newMenuOrder {
    MenuItemInOrder(filter: { mutation_in: [CREATED, DELETED, UPDATED] }) {
      mutation
      node {
        id
        numberOfItems
        menuItem {
          id
        }
        order {
          id
        }
      }
      updatedFields
      previousValues {
        id
        numberOfItems
      }
    }
  }
`;
//# sourceMappingURL=Subscriptions.js.map