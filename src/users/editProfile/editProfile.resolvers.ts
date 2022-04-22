import * as bcrypt from 'bcrypt';
import * as fs from 'fs';
import { uploadToS3 } from '../../shared/shared.utils';
import { Resolvers } from '../../typed';
import { protectedResolver } from '../users.utils';

const resolvers: Resolvers = {
  Mutation: {
    editProfile: protectedResolver(
      async (
        _,
        {
          email,
          username,
          password: newPassword,
          location,
          githubUsername,
          avatarURL,
        },
        { loggedInUser, client },
      ) => {
        let avatar = null;
        if (avatarURL) {
          // const { filename, createReadStream } = await avatarURL;
          // const newFilename = `${loggedInUser.id}-${Date.now()}-${filename}`;
          // const readStream = createReadStream();
          // const writeStream = fs.createWriteStream(
          //   process.cwd() + '/src/uploads/' + newFilename,
          // );
          // readStream.pipe(writeStream);
          // avatar = `http://localhost:4000/static/${newFilename}`;
          avatar = await uploadToS3(avatarURL, loggedInUser.username, 'avatar');
        }

        let hashedPassword = null;
        if (newPassword) {
          hashedPassword = await bcrypt.hash(newPassword, 10);
        }
        const updatedUser = await client.user.update({
          where: { id: loggedInUser.id },
          data: {
            email,
            username,
            location,
            githubUsername,
            ...(hashedPassword && { password: hashedPassword }),
            ...(avatar && { avatarURL: avatar }),
          },
        });
        if (updatedUser.id) {
          return {
            ok: true,
          };
        } else {
          return {
            ok: false,
            error: 'could not update profile.',
          };
        }
      },
    ),
  },
};

export default resolvers;
