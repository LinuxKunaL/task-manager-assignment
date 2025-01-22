import axios from "axios";
import api from "../app/api";

function useAuth() {
  const AuthLogin = async (data: any) => {
    try {
      const result = await api.post("/auth/login", data);
      if (result?.data?.success) {
        return result.data;
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return error?.response?.data;
      }
      return { message: "Something went wrong" };
    }
  };

  const AuthRegister = async (data) => {
    try {
      const result = await api.post("/auth/register", data);

      if (result?.data?.success) {
        return result.data;
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return error?.response?.data;
      }
      return { message: "Something went wrong" };
    }
  };

  const logout = () => {};

  const isAuthenticated = async (): Promise<boolean> => {
    const me = await api.post("/auth/me");
    if (me?.data?.success) {
      return true;
    }
    return false;
  };

  const me = async () => {
    const me = await api.post("/auth/me");

    if (me?.data?.success) {
      return me.data.user;
    }
    if (me?.data?.error) {
      return me.data.error;
    }
  };

  return { AuthRegister, AuthLogin, isAuthenticated, logout, me };
}

export default useAuth;
