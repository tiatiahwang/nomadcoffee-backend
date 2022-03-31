import { gql } from 'apollo-server';

export default gql`
  type EditProfileResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    editProfile(
      email: String
      username: String
      password: String
      location: String
      githubUsername: String
      avatarURL: Upload
    ): EditProfileResult!
  }
`;
