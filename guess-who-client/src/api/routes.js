import { fetchData } from "./axiosIntance";

export const signupPost = async (dataForm) =>
  fetchData("/signup", "post", dataForm);

export const loginPost = async (dataForm) =>
  fetchData("/login", "post", dataForm);
export const logoutGet = async () => fetchData("/logout", "get");

export const addCharacter = async (dataForm) =>
  fetchData("/admin/character", "post", dataForm);

export const addPlayer = async (dataForm) =>
  fetchData("/player/add", "post", dataForm);

export const loadAllUsers = async () => fetchData("/admin/users", "get");
export const loadAllCharacters = async () =>
  fetchData("/admin/characters", "get");

export const loadAllCharactersPlayer = async () =>
  fetchData("/characters", "get");


export const getUser = async (id) => fetchData("/user/" + id, "get");
export const getPlayer = async (id) => fetchData("/player/" + id, "get");
export const getPlayerByUserId = async (userId) =>
  fetchData("/player/user/" + userId, "get");
export const getUserById = async (id) => fetchData("/user/" + id, "get");

export const updateUser = async (id, dataForm) =>
  fetchData(`/user/edit/${id}`, "post", dataForm);
export const blockUser = async (id, dataForm) =>
  fetchData(`/user/block/${id}`, "post", dataForm);
export const updateCharacter = async (id, dataForm) =>
  fetchData(`/admin/character/edit/${id}`, "post", dataForm);

export const deleteCharacter = async (id) =>
  fetchData("/admin/character/delete/" + id, "delete");
