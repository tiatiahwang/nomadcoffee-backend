import { Resolvers } from '../../typed';

const resolvers: Resolvers = {
  Query: {
    seeCoffeeShops: async (_, { page }, { client }) =>
      await client.coffeeShop.findMany({
        take: 2,
        skip: page,
        orderBy: { updatedAt: 'desc' },
        include: {
          photos: true,
          user: { select: { username: true, avatarURL: true } },
          categories: { select: { id: true, name: true } },
        },
      }),
  },
};

export default resolvers;
