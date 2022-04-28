import { Resolvers } from '../../typed';

const resolvers: Resolvers = {
  Query: {
    searchCoffeeShop: async (_, { keyword }, { client }) =>
      await client.coffeeShop.findMany({
        where: {
          OR: [
            {
              name: { contains: keyword },
            },
            {
              categories: {
                some: { name: { contains: keyword } },
              },
            },
          ],
        },
        take: 9,
      }),
  },
};

export default resolvers;
