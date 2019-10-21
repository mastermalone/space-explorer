import gql from 'graphql-tag';
import { GET_CART_ITEMS } from './pages/cart';

export const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
    cartItems: [ID!]!
  }

  extend type Launch {
    isInCart: Boolean!
  }

  extend type Mutation {
    addOrRemoveFromCart(id: ID!): [Launch]
  }
`;

export const schema = gql`
  extend type Launch {
    isInCart: Boolean!
  }
`;

/**
 *
 * One of the unique advantages of managing your local data with Apollo Client
 * is that you can add virtual fields to data you receive back from your graph API.
 * These fields only exist on the client and are useful for decorating server
 * data with local state. In our example, we're going to add an isInCart virtual
 * field to our Launch type.
 *
 * To add a virtual field, first extend the type of the data you're adding the
 * field to in your client schema. Here, we're extending the Launch type:
 */
export const resolvers = {
  Launch: {
    isInCart: (launch, _, { cache }) => {
      const { cartItems } = cache.readQuery({ query: GET_CART_ITEMS });
      return cartItems.includes(launch.id);
    },
  },
};
