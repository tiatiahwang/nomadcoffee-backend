import { gql } from 'apollo-server';

export default gql`
  type Mutation {
    createAccount(
      email: String!
      username: String!
      location: String
      password: String!
    ): MutationResponse!
  }
`;
