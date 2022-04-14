import { Resolvers } from '../../typed';

const resolvers: Resolvers = {
  Query: {
    seeCoffeeShops: (_, { page }, { client }) =>
      client.coffeeShop.findMany({
        take: 9,
        ...(page && { skip: 1, cursor: { id: page } }),
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
