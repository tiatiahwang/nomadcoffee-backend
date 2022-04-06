import { Resolvers } from '../../typed';

const resolvers: Resolvers = {
  Query: {
    seeCoffeeShops: (_, { page }, { client }) =>
      client.coffeeShop.findMany({
        take: 9,
        skip: (page - 1) * 9,
        orderBy: { updatedAt: 'desc' },
      }),
  },
};

export default resolvers;
