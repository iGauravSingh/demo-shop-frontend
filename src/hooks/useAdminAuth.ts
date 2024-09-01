import axios from "axios";
import Cookie from "universal-cookie";
import { useDispatch } from "react-redux";
import { setAdmin, clearAdmin } from "../features/adminSlice";
// import { persistor } from "../app/store";

const cookie = new Cookie();

const urllocal = "http://localhost:8080";
// const urllive = "https://backerbackend.onrender.com";

const useAdminAuth = () => {
  const adminToken = cookie.get("admin_token");
  const dispatch = useDispatch();

  const login = async ({ email, password }: any) => {
    try {
      const response = await axios.post(`${urllocal}/adminauth/login`, {
        email,
        password,
      });

      const { user, token } = response.data;
      cookie.set("admin_token", token);
      dispatch(setAdmin(user));
      return response.data;
    } catch (error) {
      return error;
    }
  };

  const signup = async (data: any) => {
    try {
      const response = await axios.post(`${urllocal}/adminauth/signup`, data);

      return response.data;
    } catch (error) {
      return error;
    }
  };

  const changePassword = async (data: any) => {
    try {
      const response = await axios.patch(
        `${urllocal}/adminauth/change-password`,
        data,
        {
          headers: {
            ...(adminToken ? { Authorization: `Bearer ${adminToken}` } : null),
          },
        }
      );

      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    cookie.remove("admin_token");
    return dispatch(clearAdmin());
    // persistor.purge()
  };

  return { signup, login, logout, changePassword };
};

export default useAdminAuth;
