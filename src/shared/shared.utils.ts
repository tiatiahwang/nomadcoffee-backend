import * as AWS from 'aws-sdk';

AWS.config.update({
  credentials: {
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET,
  },
});

export const uploadToS3 = async (file, username, folderName) => {
  const { filename, createReadStream } = await file;
  const readStream = createReadStream();
  const objectName = `${folderName}/${username}-${Date.now()}-${filename}`;
  const { Location } = await new AWS.S3()
    .upload({
      Bucket: 'nomadcoffee-bucket',
      Key: objectName,
      ACL: 'public-read',
      Body: readStream,
    })
    .promise();
  return Location;
};
