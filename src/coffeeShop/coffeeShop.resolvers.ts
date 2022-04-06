import { Resolvers } from '../typed';

const resolvers: Resolvers = {
  CoffeeShop: {
    photos: ({ id }, _, { client }) =>
      client.coffeeShopPhoto.findMany({ where: { shop: { id } } }),
    user: ({ userId }, _, { client }) =>
      client.user.findUnique({ where: { id: userId } }),
    categories: ({ id }, _, { client }) =>
      client.category.findMany({ where: { shops: { some: { id } } } }),
  },
  Category: {
    totalShops: ({ id }, _, { client }) =>
      client.coffeeShop.count({
        where: { categories: { some: { id } } },
      }),
  },
};

export default resolvers;
