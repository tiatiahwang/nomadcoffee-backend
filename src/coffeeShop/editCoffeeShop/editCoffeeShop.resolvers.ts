import { uploadToS3 } from '../../shared/shared.utils';
import { Resolvers } from '../../typed';
import { protectedResolver } from '../../users/users.utils';
import { processCategories } from '../coffeeShop.utils';

const resolvers: Resolvers = {
  Mutation: {
    editCoffeeShop: protectedResolver(
      async (
        _,
        { id, name, latitude, longitude, categories },
        { loggedInUser, client },
      ) => {
        const coffeeShop = await client.coffeeShop.findUnique({
          where: { id },
          select: { userId: true, categories: true },
        });

        if (!coffeeShop) {
          return {
            ok: false,
            error: 'shop does not exist',
          };
        } else if (coffeeShop.userId !== loggedInUser.id) {
          return {
            ok: false,
            error: 'not authorized',
          };
        } else {
          // TODO: 포토 삭제 기능
          // TODO: 포토 추가 기능

          const oldCategoryObj = coffeeShop.categories?.map((category) => ({
            id: category.id,
          }));
          console.log(oldCategoryObj);
          let newCategoryObj = [];
          if (categories) {
            newCategoryObj = processCategories(categories);
          }

          await client.coffeeShop.update({
            where: { id },
            data: {
              name,
              longitude,
              latitude,
              categories: {
                disconnect: oldCategoryObj,
                connectOrCreate: newCategoryObj,
              },
            },
          });

          return {
            ok: true,
          };
        }
      },
    ),
  },
};

export default resolvers;
