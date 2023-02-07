import ERROR from '../../lib/error';
import STATUS_CODE from '../../lib/statusCode';

import { User } from '../../model/user/index';
import { Post } from '../../model/post/index';
import { getCurrentDate } from '../../lib/util';
import { throwErrorMessage } from '../../lib/util';

type IUserType = {
  id: string;
  password: string;
  name: string;
  gender: string;
  email: string;
  points?: number;
};

export const createUser = async ({
  id,
  password,
  name,
  gender,
  email,
}: IUserType) => {
  const user = await User.create({
    id,
    password,
    name,
    gender,
    email,
    created_at: getCurrentDate(),
    updated_at: getCurrentDate(),
  });
  return user;
};

export const readUserInfo = async (id: string) => {
  const user = await User.findOne({ id });
  if (user) {
    return user;
  }
  return null;
};

export const readUserList = async () => {
  const userList = await User.find().select({ _id: 1 });
  if (userList) {
    return userList;
  }
  return null;
};

export const findRedundantID = async (id: string) => {
  const user = await User.findOne({ id });
  if (user) return true;
  return false;
};

export const updateUserInfo = async (params: any) => {
  let user = await User.findOneAndUpdate(
    { id: params.id },
    { $set: params },
    { new: true },
  );
  if (user) return user;
  throwErrorMessage({
    statusCode: STATUS_CODE.NOT_FOUND,
    message: ERROR.NOT_UPDATE_USER,
  });
};

export const updateUserProfileImage = async (id: string, img_src: string) => {
  const user = await User.findOne({ id });
  if (user) {
    user.profile_image_url = img_src;
    await user.save();
    return user;
  }
  throwErrorMessage({
    statusCode: STATUS_CODE.SERVER_ERROR,
    message: ERROR.NOT_UPLOAD_S3,
  });
};

export const updateUserPoints = async (id: string, points: number) => {
  const user = await User.findOneAndUpdate({ id }, { $inc: { points } });
  if (user) {
    return user;
  }
  throwErrorMessage({
    statusCode: STATUS_CODE.SERVER_ERROR,
    message: ERROR.NOT_UPDATE_USER,
  });
};

export const deleteUserInfo = async (id: string) => {
  const user = await User.findOne({ id });
  if (user) {
    await Post.deleteMany({ writer: user._id });
    await User.deleteOne({ id });
    return true;
  }
  throwErrorMessage({
    statusCode: STATUS_CODE.NOT_FOUND,
    message: ERROR.NOT_DELETE_USER,
  });
};
