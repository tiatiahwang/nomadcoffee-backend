import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Resolvers } from '../../typed';

const resolvers: Resolvers = {
  Mutation: {
    login: async (_, { username, password }, { client }) => {
      const user = await client.user.findUnique({ where: { username } });
      if (!user) {
        return {
          ok: false,
          error: '가입되지 않은 계정입니다',
        };
      }
      const checkedPassword = await bcrypt.compare(password, user.password);
      if (!checkedPassword) {
        return {
          ok: false,
          error: '비밀번호를 확인해주세요',
        };
      }
      const token = await jwt.sign({ id: user.id }, process.env.SECRET_KEY);
      return {
        ok: true,
        token,
      };
    },
  },
};

export default resolvers;
