import instance from ".";
import { setToken } from "./storage";

const login = async (userInfo) => {
  console.log(userInfo);
  try {
    await setToken(data.token);
    return data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

const register = async (userInfo, image) => {
  try {
    const formData = new FormData();
    for (const key in userInfo) {
      formData.append(key, userInfo[key]);
    }
    formData.append("image", {
      name: "image.jpg",
      type: "image/jpeg",
      uri: image,
    });

    await setToken(data.token);
    return data;
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
};

const getProfile = async () => {
  const { data } = await instance.get("/auth/profile");
  return data;
};

export { login, register, getProfile };
