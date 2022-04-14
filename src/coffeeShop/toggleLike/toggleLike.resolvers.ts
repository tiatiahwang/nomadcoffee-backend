import { Resolvers } from '../../typed';
import { protectedResolver } from '../../users/users.utils';

const resolvers: Resolvers = {
  Mutation: {
    toggleLike: protectedResolver(
      async (_, { id }, { loggedInUser, client }) => {
        const shop = await client.coffeeShop.findUnique({ where: { id } });
        if (!shop) {
          return {
            ok: false,
            error: '정보를 찾을 수 없습니다',
          };
        }
        const likeWhere = {
          coffeeShopId_userId: {
            coffeeShopId: id,
            userId: loggedInUser.id,
          },
        };
        const like = await client.like.findUnique({
          where: likeWhere,
        });
        if (like) {
          await client.like.delete({
            where: likeWhere,
          });
        } else {
          await client.like.create({
            data: {
              user: { connect: { id: loggedInUser.id } },
              coffeeShop: { connect: { id: shop.id } },
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
