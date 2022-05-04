import { gql } from 'apollo-server-express';

export default gql`
  type createCoffeeShopResponse {
    ok: Boolean!
    error: String
    photos: [CoffeeShopPhoto]
  }
  type Mutation {
    createCoffeeShop(
      name: String!
      latitude: String!
      longitude: String!
      description: String
      photos: [Upload]!
      categories: [String]!
    ): createCoffeeShopResponse!
  }
`;
