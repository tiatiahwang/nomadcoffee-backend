import { Resolvers } from '../../typed';
import { protectedResolver } from '../users.utils';

const resolvers: Resolvers = {
  Mutation: {
    toggleFollow: protectedResolver(
      async (_, { username }, { loggedInUser, client }) => {
        const exist = await client.user.findUnique({ where: { username } });
        if (!exist) {
          return {
            ok: false,
            error: 'user does not exist.',
          };
        }
        const following = await client.user.findFirst({
          where: {
            id: loggedInUser.id,
            following: { some: { username } },
          },
          select: { username: true },
        });
        if (!following) {
          await client.user.update({
            where: { id: loggedInUser.id },
            data: {
              following: { connect: { username } },
            },
          });
        } else {
          await client.user.update({
            where: { id: loggedInUser.id },
            data: {
              following: { disconnect: { username } },
            },
          });
        }
        return {
          ok: true,
        };
      },
    ),
  },
};

export default resolvers;
