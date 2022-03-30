import bcrypt from 'bcrypt';
import client from '../../client';

export default {
  Mutation: {
    createAccount: async (_, { email, username, location, password }) => {
      try {
        const isExist = await client.user.findFirst({
          where: {
            OR: [{ email }, { username }],
          },
        });
        if (isExist) throw new Error('email or username already taken.');
        const hashedPassword = await bcrypt.hash(password, 10);
        await client.user.create({
          data: {
            email,
            username,
            location,
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
