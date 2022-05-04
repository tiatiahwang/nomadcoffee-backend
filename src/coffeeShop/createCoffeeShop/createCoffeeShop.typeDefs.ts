import { gql } from 'apollo-server-express';

export default gql`
  type Mutation {
    createCoffeeShop(
      name: String!
      latitude: String
      longitude: String
      address: String
      description: String
      photos: Upload!
      categories: String!
    ): MutationResponse!
  }
`;
