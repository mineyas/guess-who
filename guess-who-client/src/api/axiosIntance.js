import axios from "axios";

const baseURL = process.env.REACT_APP_BASE_URL;
const baseTest = "http://localhost:3000";
console.log(baseTest, "base test");
console.log(baseURL, "base url");
const axiosInstance = axios.create({
  baseURL: baseURL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const handleApiError = (error) => {
  if (error.response) {
    console.error("Response data:", error.response.data);
    console.error("Response status:", error.response.status);
    console.error("Response headers:", error.response.headers);
  } else if (error.request) {
    console.error("No response received:", error.request);
  } else {
    console.error("Error during request setup:", error.message);
  }
};

export const fetchData = async (endpoint, method, dataForm) => {
  try {
    const response = await axiosInstance[method](endpoint, dataForm);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};
