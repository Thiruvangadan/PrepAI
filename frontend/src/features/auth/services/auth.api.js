import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5002",
  withCredentials: true,
});

export const register = async ({ username, email, password }) => {
  try {
    const res = await api.post("/api/auth/register", {
      username,
      email,
      password,
    });

    return res.data;
  } catch (error) {
    console.error(error);
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
    console.log(error.response?.data?.message);
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
  try {
    const res = await api.get("/api/auth/get-me");
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
