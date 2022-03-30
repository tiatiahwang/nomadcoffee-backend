import { gql } from 'apollo-server';

export default gql`
  type CreateAccountResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    createAccount(
      email: String!
      username: String!
      location: String
      password: String!
    ): CreateAccountResult!
  }
`;
