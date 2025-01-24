import axios from "axios";
import Config from "./Config";
import { store } from "../redux/store";

const axiosInstance = axios.create({
  baseURL: Config.API_URL,
});

axiosInstance.interceptors.request.use(
  (request) => {
    const state = store.getState();
    request.headers["x-api-key"] = Config.API_KEY;
    if (request.method === "get") {
      request.params = request.data;
      delete request.data;
    }
    console.log("HTTP Request", request);
    return request;
  },
  (error) => {
    console.log("HTTP Request Error", error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    console.log("HTTP Response", response);
    return response;
  },
  (error) => {
    console.error("HTTP ERROR", error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
