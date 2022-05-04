import { gql } from 'apollo-server-express';

export default gql`
  type Mutation {
    createCoffeeShop(
      name: String!
      latitude: String
      longitude: String
      address: String
      description: String
      photo: Upload!
      categories: String!
    ): MutationResponse!
  }
`;
