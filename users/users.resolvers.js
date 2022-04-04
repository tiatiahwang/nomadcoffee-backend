import client from '../client';

export default {
  User: {
    followers: ({ id }, { page }) =>
      client.user.findMany({
        where: { following: { some: { id } } },
        take: 10,
        skip: page ? 1 : 0,
        ...(page && { cursor: { id: page } }),
      }),
    following: ({ id }, { page }) =>
      client.user.findMany({
        where: { followers: { some: { id } } },
        take: 10,
        skip: page ? 1 : 0,
        ...(page && { cursor: { id: page } }),
      }),
    totalFollowing: ({ id }) =>
      client.user.count({
        where: { followers: { some: { id } } },
      }),
    totalFollowers: ({ id }) =>
      client.user.count({
        where: { following: { some: { id } } },
      }),
    isMe: ({ id }, _, { loggedInUser }) => id === loggedInUser?.id,
    isFollowing: async ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) return false;
      const exists = await client.user.count({
        where: {
          username: loggedInUser.username,
          following: { some: { id } },
        },
      });
      return Boolean(exists);
    },
  },
};
