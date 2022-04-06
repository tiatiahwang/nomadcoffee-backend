import { Resolvers } from '../../typed';

const resolvers: Resolvers = {
  Query: {
    seeCategory: (_, { category, page }, { client }) =>
      client.coffeeShop.findMany({
        where: {
          categories: { some: { slug: { contains: category } } },
        },
        take: 9,
        skip: (page - 1) * 9,
        orderBy: { updatedAt: 'desc' },
      }),
  },
};

export default resolvers;
