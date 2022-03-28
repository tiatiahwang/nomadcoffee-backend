import { gql } from 'apollo-server';

export default gql`
  type CreateUserResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    createUser(
      email: String!
      username: String!
      firstName: String!
      lastName: String
      password: String!
    ): CreateUserResult!
  }
`;
