import axios from "axios";
import Cookie from "universal-cookie";
import { useDispatch } from "react-redux";
import {
  setaccounts,
  clearaacounts,
  deleteaccounts,
} from "../features/accountsSlice";

const cookie = new Cookie();

// const urllocal = "http://localhost:8080";
const urllive = "https://demo-shop-h8s9.onrender.com"

const useAccounts = () => {
  // const sessionToken = cookie.get("session_token");
  const adminToken = cookie.get("admin_token");
  const dispatch = useDispatch();
  //
  const fetchAccountsList = async () => {
    try {
      const response = await axios.get(`${urllive}/users/allusers`, {
        headers: {
          ...(adminToken ? { Authorization: `Bearer ${adminToken}` } : null),
        },
      });
      const acccountsData = response.data;
      if (!acccountsData) {
        return dispatch(clearaacounts());
      }

      // console.log(postaData)
      dispatch(setaccounts(acccountsData));
    } catch (error) {
      return dispatch(clearaacounts());
    }
  };

  const deleteAccountwithId = async (id: number) => {
    try {
      const response = await axios.delete(
        `${urllive}/users/deleteuser/${id}`,
        {
          headers: {
            ...(adminToken ? { Authorization: `Bearer ${adminToken}` } : null),
          },
        }
      );
      const postsData = response.data;

      if (postsData.success) {
        dispatch(deleteaccounts(id));
      }
    } catch (error) {
      return dispatch(clearaacounts());
    }
  };

  return { fetchAccountsList, deleteAccountwithId };
};

export default useAccounts;
