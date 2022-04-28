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
            error: '이미 가입된 계정/이메일입니다',
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
          error: '계정을 만들수 없습니다',
        };
      }
    },
  },
};

export default resolvers;
