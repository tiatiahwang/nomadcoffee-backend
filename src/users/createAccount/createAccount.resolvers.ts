import * as bcrypt from 'bcrypt';
import client from '../../client';
import { Resolvers } from '../../typed';

const resolvers: Resolvers = {
  Mutation: {
    createAccount: async (_, { email, username, password }) => {
      try {
        const exist = await client.user.findFirst({
          where: {
            OR: [{ email }, { username }],
          },
        });

        if (exist) {
          return {
            ok: false,
            error: 'email or username already taken.',
          };
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await client.user.create({
          data: {
            email,
            username,
            password: hashedPassword,
          },
        });
        return {
          ok: true,
        };
      } catch {
        return {
          ok: false,
          error: 'cannot create an account.',
        };
      }
    },
  },
};

export default resolvers;
