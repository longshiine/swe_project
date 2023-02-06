import ERROR from '../lib/error';
import STATUS_CODE from '../lib/statusCode';
import { uploadS3Object } from '../lib/s3';

const uploadImage = async function uploadFile(
  ctx: any,
  next: any,
  endPoint: any,
) {
  const profileImage = ctx.request.files.profile_image;
  const fileName = 'profile_image';
  const bucketUrl = `${process.env.S3_BUCKET_NAME}/${endPoint}`;
  try {
    const profileResult = await uploadS3Object(
      profileImage,
      bucketUrl,
      fileName,
    );
    const result: any = {
      img_src: profileResult.Location,
      key: profileResult.Key,
    };
    ctx.body = result;
    return next();
  } catch (e: any) {
    console.log(e);
    return ctx.throw(STATUS_CODE.SERVER_ERROR, ERROR.NOT_UPLOAD_S3);
  }
};

export default uploadImage;
