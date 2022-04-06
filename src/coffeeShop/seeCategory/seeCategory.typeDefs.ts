import { gql } from 'apollo-server-express';

export default gql`
  type Query {
    seeCategory(category: String!, page: Int!): [CoffeeShop]
  }
`;
