import { uploadToS3 } from '../../shared/shared.utils';
import { Resolvers } from '../../typed';
import { protectedResolver } from '../../users/users.utils';
import { processCategories } from '../coffeeShop.utils';

const resolvers: Resolvers = {
  Mutation: {
    createCoffeeShop: protectedResolver(
      async (
        _,
        { name, latitude, longitude, categories, photo, description, address },
        { loggedInUser, client },
      ) => {
        const exist = await client.coffeeShop.findFirst({ where: { name } });
        if (exist) {
          return {
            ok: false,
            error: 'shop already exists',
          };
        }

        let categoryObj = [];
        if (categories) {
          categoryObj = processCategories(categories);
        }

        const newCoffeeShop = await client.coffeeShop.create({
          data: {
            user: { connect: { id: loggedInUser.id } },
            name,
            latitude,
            longitude,
            address,
            description,
            categories: { connectOrCreate: categoryObj },
          },
        });

        if (photo) {
          const url = await uploadToS3(photo, loggedInUser.username, 'shops');
          await client.coffeeShopPhoto.create({
            data: {
              url,
              shop: { connect: { id: newCoffeeShop.id } },
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
