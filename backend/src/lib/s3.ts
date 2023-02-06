import fs from 'fs';
import AWS, { Pricing } from 'aws-sdk';
import s3Connect from '../config/s3Connect';

let bucketName = process.env.S3_BUCKET_NAME as string;

export const uploadS3Object = async (
  file: any,
  bucketUrl: string,
  fileName: string,
) => {
  const { filepath, originalFilename, mimetype } = file;
  const body = fs.createReadStream(filepath);
  const fileType = mimetype === 'video' ? 'mp4' : 'jpg';
  const params = {
    Bucket: bucketUrl,
    Key: fileName + '.' + fileType,
    Body: body,
    ACL: 'public-read',
    ContentType: mimetype,
  };

  return await s3Connect.upload(params).promise();
};

export const deleteS3Object = async (fileLocation: string) => {
  const params = {
    Bucket: bucketName, // 사용자 버켓 이름
    Key: fileLocation, // 버켓 내 경로
  };
  return await s3Connect.deleteObject(params).promise();
};

export const deleteS3Directory = async (location: string) => {
  const s3data = await s3Connect
    .listObjects({
      Bucket: bucketName,
      Prefix: location,
    })
    .promise();
  const items = s3data.Contents;
  if (items) {
    const keys: string[] = <any>(
      items.map((item) => item.Key).filter((key) => key !== undefined)
    );
    const params: AWS.S3.DeleteObjectsRequest = {
      Bucket: bucketName,
      Delete: {
        Objects: keys.map((key) => ({ Key: key })),
      },
    };
    if (params.Delete.Objects.length > 0) {
      return await s3Connect.deleteObjects(params).promise();
    }
  }
  return [];
};
