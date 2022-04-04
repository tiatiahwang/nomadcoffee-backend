import { gql } from 'apollo-server';

export default gql`
  type Mutation {
    editProfile(
      email: String
      username: String
      password: String
      location: String
      githubUsername: String
      avatarURL: Upload
    ): MutationResponse!
  }
`;
