import api from "../../../lib/axios";

export const register = async ({ username, email, password }) => {
  try {
    await api.post("/api/auth/register", {
      username,
      email,
      password,
    });
  } catch (error) {
    throw error;
  }
};

export const login = async ({ email, password }) => {
  try {
    const res = await api.post("/api/auth/login", {
      email,
      password,
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  try {
    const res = await api.get("/api/auth/logout");
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const getMe = async () => {
  const res = await api.get("/api/auth/get-me");
  return res.data;
};
