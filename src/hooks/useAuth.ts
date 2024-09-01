import axios from "axios";
import Cookie from "universal-cookie";
import { useDispatch } from "react-redux";
import { clearUser, setUser } from "../features/userSlice";
import { persistor } from "../app/store";

const cookie = new Cookie();

const urllocal = "http://localhost:8080";
// const urllive = "https://backerbackend.onrender.com";

const useAuth = () => {
  const sessionToken = cookie.get("session_token");
  const dispatch = useDispatch();

  const login = async ({ email, password }: any) => {
    try {
      const response = await axios.post(`${urllocal}/auth/login`, {
        email,
        password,
      });

      const { user, token } = response.data;
      cookie.set("session_token", token);
      dispatch(setUser(user));
      return response.data;
    } catch (error) {
      return error;
    }
  };

  const signup = async (data: any) => {
    try {
      const response = await axios.post(`${urllocal}/auth/signup`, data);

      return response.data;
    } catch (error) {
      return error;
    }
  };

  const imageUpload = async (data: any) => {
    try {
      const response = await axios.patch(`${urllocal}/posts/imageupload`, data);

      return response.data;
    } catch (error) {
      console.log("error", error);
    }
  };

  const changePassword = async (data: any) => {
    try {
      const response = await axios.patch(
        `${urllocal}/auth/change-password`,
        data,
        {
          headers: {
            ...(sessionToken
              ? { Authorization: `Bearer ${sessionToken}` }
              : null),
          },
        }
      );

      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    cookie.remove("session_token");
    return dispatch(clearUser());
    persistor.purge();
  };

  return { signup, login, logout, imageUpload, changePassword };
};

export default useAuth;
