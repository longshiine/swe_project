import message from "antd/lib/message";
import axios, { AxiosRequestConfig } from "axios";
import { SERVER_URL } from "lib/constant";
import { getCookie, removeCookie } from "lib/cookie";
import { removeUserInfoFromLocalStorage } from "lib/localStorage";

const fetchWrap = async ({
  method,
  url,
  params,
  body,
}: {
  method: "get" | "post" | "patch" | "delete";
  url: string;
  params?: {};
  body?: {};
}) => {
  const token = getCookie("token");
  url = `${SERVER_URL}` + url;
  try {
    const config: AxiosRequestConfig = {
      //   withCredentials: true,
      params,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: token || "",
      },
    };
    const {
      data,
    } = // {success: boolean, status: number data: {}}
      (method === "get" && (await axios.get(url, config))) ||
      (method === "post" && (await axios.post(url, body, config))) ||
      (method === "patch" && (await axios.patch(url, body, config))) ||
      (method === "delete" && (await axios.delete(url, config))) ||
      {};
    return data;
  } catch (error: any) {
    console.log(error);
    if (error.response.status === 401) {
      alert("401: 인증되지 않았습니다.");
      removeUserInfoFromLocalStorage();
      window.location.href = "/login";
      return null;
    } else if (error.response.status === 404) {
      // window.location.href = "/404";
      return null;
    } else {
      return null;
    }
  }
};
export const GET = (url: string, params?: {}) =>
  fetchWrap({ method: "get", url, params });

export const POST = (url: string, body?: {}, params?: {}) =>
  fetchWrap({ method: "post", url, body, params });

export const PATCH = (url: string, body?: {}, params?: {}) =>
  fetchWrap({ method: "patch", url, body, params });

export const DELETE = (url: string) => fetchWrap({ method: "delete", url });
