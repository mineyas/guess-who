import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.test,
});

console.log(process.env.test, "base ursl" )
console.log(process.env, 'env');
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

const fetchData = async (endpoint, method, dataForm) => {
  try {
    const response = await axiosInstance[method](endpoint, dataForm);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

export const signupPost = async (dataForm) =>
  fetchData("/signup", "post", dataForm);

export const loginPost = async (dataForm) =>
  fetchData("/login", "post", dataForm);

  export const addCharacter = async (dataForm) =>
  fetchData("/admin/character", "post", dataForm);


export const logoutGet = async () => fetchData("/logout", "get");

export const loadUsers = async () => fetchData("/admin/users", "get");
export const loadCharacters = async () => fetchData("/admin/character", "get");

export const deleteCharacter = async (id) =>
  fetchData("/admin/character/delete/" + id, "delete");