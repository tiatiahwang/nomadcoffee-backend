import { Resolvers } from '../../typed';
import { protectedResolver } from '../users.utils';

const resolvers: Resolvers = {
  Query: {
    me: protectedResolver((_, __, { loggedInUser, client }) =>
      client.user.findUnique({
        where: { id: loggedInUser.id },
      }),
    ),
  },
};

export default resolvers;
