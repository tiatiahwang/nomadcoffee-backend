import { Resolvers } from '../typed';

const resolvers: Resolvers = {
  CoffeeShop: {
    photos: ({ id }, _, { client }) =>
      client.coffeeShopPhoto.findMany({ where: { coffeeShopId: id } }),
    user: ({ userId }, _, { client }) =>
      client.user.findUnique({ where: { id: userId } }),
    categories: ({ id }, _, { client }) =>
      client.category.findMany({ where: { shops: { some: { id } } } }),
    isMine: ({ userId }, _, { loggedInUser }) => userId === loggedInUser?.id,
    isLiked: async ({ id }, _, { loggedInUser, client }) => {
      if (!loggedInUser) return false;
      const ok = await client.like.findUnique({
        where: {
          coffeeShopId_userId: {
            coffeeShopId: id,
            userId: loggedInUser.id,
          },
        },
      });
      if (ok) return true;
      return false;
    },
    likes: ({ id }, _, { client }) =>
      client.like.count({ where: { coffeeShopId: id } }),
  },
  Category: {
    totalShops: ({ id }, _, { client }) =>
      client.coffeeShop.count({
        where: { categories: { some: { id } } },
      }),
  },
};

export default resolvers;
