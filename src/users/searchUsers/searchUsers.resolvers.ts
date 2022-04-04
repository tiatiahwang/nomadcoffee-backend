import { Resolvers } from '../../typed';

const resolvers: Resolvers = {
  Query: {
    searchUsers: (_, { keyword }, { client }) =>
      client.user.findMany({
        where: {
          username: {
            startsWith: keyword.toLowerCase(),
          },
        },
      }),
  },
};

export default resolvers;
