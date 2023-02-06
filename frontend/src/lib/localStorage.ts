import { getCookie, removeCookie } from "./cookie";

export const getUserInfoFromLocalStorage = () => {
  const userInfo =
    typeof window !== "undefined"
      ? window.localStorage.getItem("userInfo") && getCookie("token")
        ? localStorage.getItem("userInfo")
        : null
      : false;
  return userInfo;
};

export const removeUserInfoFromLocalStorage = () => {
  removeCookie("token");
  localStorage.clear();
};
