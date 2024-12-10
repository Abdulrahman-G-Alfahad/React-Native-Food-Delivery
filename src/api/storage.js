import * as SecureStore from "expo-secure-store";

const setToken = async (token) => {
  await SecureStore.setItemAsync("token", token);
};

const getToken = async () => {
  return await SecureStore.getItemAsync("token");
};

const deleteToken = async () => {
  await SecureStore.deleteItemAsync("token");
};

export { setToken, getToken, deleteToken };
