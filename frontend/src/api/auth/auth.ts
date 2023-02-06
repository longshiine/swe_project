import { GET, PATCH, POST, DELETE } from "../common";
import { IUser } from "./interface";

export const postUser = async ({
  id,
  password,
  name,
  gender,
  email,
}: {
  id: string;
  password: string;
  name: string;
  gender: string;
  email: string;
}) => {
  const response = await POST("/auth/signup", {
    id,
    password,
    name,
    gender,
    email,
  });
  if (response) {
    if (response.data === null) {
      return null;
    }
    const user = {
      id: response.data.index,
      name: response.data.writer,
      gender: response.data.title,
      email: response.data.content,
    };
    return user;
  } else {
    return null;
  }
};

export const postLogin = async ({
  id,
  password,
}: {
  id: string;
  password: string;
}) => {
  const response = await POST("/auth/login", { id, password });
  if (response) {
    if (response.data === null) {
      return null;
    }
    const result = {
      user: response.data?.user,
      token: response.data?.token,
    };
    return result;
  } else {
    return null;
  }
};

export const getUser = async () => {
  const response = await GET("/auth");
  if (response) {
    if (response.data === null) {
      return null;
    }
    const user = {
      id: response.data.id,
      name: response.data.name,
      password: response.data.password,
      gender: response.data.gender,
      email: response.data.email,
      profile_image_url: response.data.profile_image_url
        ? response.data.profile_image_url
        : "https://pertaniansehat.com/v01/wp-content/uploads/2015/08/default-placeholder.png",
    };
    return user;
  } else {
    return null;
  }
};

export const patchUser = async ({
  id,
  password,
  name,
  gender,
  email,
}: {
  id: string;
  password: string;
  name: string;
  gender: string;
  email: string;
}) => {
  const response = await PATCH("/auth", {
    id,
    password,
    name,
    gender,
    email,
  });
  if (response) {
    if (response.data === null) {
      return null;
    }
    const user = {
      id: response.data.index,
      name: response.data.name,
      gender: response.data.gender,
      email: response.data.email,
    };
    return user;
  } else {
    return null;
  }
};

export const patchUserProfileImage = async (data: any) => {
  const response = await PATCH("/auth/profile_image", data);
  if (response) {
    if (response.data === null) {
      return null;
    }
    const user = {
      profile_image_url: response.data.profile_image_url,
    };
    return user;
  } else {
    return null;
  }
};

export const deleteUser = async () => {
  const response = await DELETE("/auth");
  if (response) {
    return true;
  } else {
    return null;
  }
};
