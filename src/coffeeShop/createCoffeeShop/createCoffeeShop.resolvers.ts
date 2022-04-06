import { uploadToS3 } from '../../shared/shared.utils';
import { Resolvers } from '../../typed';
import { protectedResolver } from '../../users/users.utils';
import { processCategories } from '../coffeeShop.utils';

const resolvers: Resolvers = {
  Mutation: {
    createCoffeeShop: protectedResolver(
      async (
        _,
        { name, latitude, longitude, categories, photos },
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
            categories: { connectOrCreate: categoryObj },
          },
        });

        let coffeeShopPhotos = [];
        if (photos) {
          for (let photo of photos) {
            const url = await uploadToS3(photo, loggedInUser.username, 'shops');
            const newPhoto = await client.coffeeShopPhoto.create({
              data: {
                url,
                shop: { connect: { id: newCoffeeShop.id } },
              },
            });
            coffeeShopPhotos.push(newPhoto);
          }
        }

        return {
          ok: true,
          photos: coffeeShopPhotos,
        };
      },
    ),
  },
};

export default resolvers;
