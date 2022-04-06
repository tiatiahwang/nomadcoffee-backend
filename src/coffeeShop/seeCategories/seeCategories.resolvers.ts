import { Resolvers } from '../../typed';

const resolvers: Resolvers = {
  Query: {
    seeCategories: (_, { page }, { client }) =>
      client.category.findMany({
        take: 9,
        skip: (page - 1) * 9,
        orderBy: { updatedAt: 'desc' },
      }),
  },
};

export default resolvers;
