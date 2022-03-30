import { gql } from 'apollo-server';

export default gql`
  type User {
    id: Int!
    email: String!
    username: String!
    password: String!
    location: String
    avatarURL: String
    githubUsername: String
  }
`;
