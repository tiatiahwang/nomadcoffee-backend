import { gql } from 'apollo-server';

export default gql`
  type Mutation {
    createAccount(
      email: String!
      username: String!
      password: String!
    ): MutationResponse!
  }
`;
