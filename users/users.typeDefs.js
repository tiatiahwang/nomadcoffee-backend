import { gql } from 'apollo-server';

export default gql`
  type User {
    id: Int!
    email: String!
    username: String!
    firstName: String!
    lastName: String
    password: String!
  }
`;
