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
//# sourceMappingURL=Subscriptions.js.map