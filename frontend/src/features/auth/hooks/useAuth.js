import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context";
import { getMe, login, logout, register } from "../services/auth.api";
import { InterviewContext } from "../../interview/interview.context";
import { data } from "react-router";

export const useAuth = () => {
  const context = useContext(AuthContext);
  const { resetState } = useContext(InterviewContext);
  const { user, setUser, loading, setLoading } = context;

  const handleLogin = async ({ email, password }) => {
    setLoading(true);
    try {
      const data = await login({ email, password });
      setUser(data.user);
      return { success: true };
    } catch (error) {
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async ({ username, email, password }) => {
    setLoading(true);
    try {
      await register({ username, email, password });
      return;
    } catch (error) {
      return error.response?.data.message || "Something went wrong";
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      const data = await logout();
      resetState();
      setUser(null);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getAndSetUser = async () => {
      try {
        const data = await getMe();
        setUser(data.user);
      } catch (error) {
        if (error.response?.status === 401) {
          setUser(null);
        } else {
          console.error(error);
        }
      } finally {
        setLoading(false);
      }
    };

    getAndSetUser();
  }, []);

  return { user, loading, handleLogin, handleRegister, handleLogout };
};
