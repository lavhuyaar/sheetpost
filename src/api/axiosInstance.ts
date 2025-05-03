import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: {},
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken"); //Auth token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(undefined, (error) => {
  const errorStatus: number = error.status;

  //Invalid token (expired token or token not found)
  if (errorStatus === 403) {
    //Removes credentials from localStorage(if any) and asks user to login
    localStorage.removeItem("authToken");
    localStorage.removeItem("userCredentials");

    window.location.href = "/login";
  }

  return Promise.reject(error);
});

export default axiosInstance;
