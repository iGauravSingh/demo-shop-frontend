// just fetch and display no need to put in slice

import axios from "axios";
import Cookie from "universal-cookie";

const cookie = new Cookie();

// const urllocal = "http://localhost:8080";
const urllive = "https://demo-shop-h8s9.onrender.com"

const useOrder = () => {
  const sessionToken = cookie.get("session_token");
  const adminToken = cookie.get("admin_token");

  const fetchUserOrder = async () => {
    try {
      const response = await axios.get(`${urllive}/orders/userorders`, {
        headers: {
          ...(sessionToken
            ? { Authorization: `Bearer ${sessionToken}` }
            : null),
        },
      });

      console.log(response.data);
      return response.data;
    } catch (error) {}
  };

  const fetchAllOrder = async () => {
    try {
      const response = await axios.get(`${urllive}/orders/allorders`, {
        headers: {
          ...(adminToken ? { Authorization: `Bearer ${adminToken}` } : null),
        },
      });

      console.log(response.data);
      return response.data;
    } catch (error) {}
  };

  const createUserOrder = async (data: any) => {
    try {
      const response = await axios.post(`${urllive}/orders/add`, data, {
        headers: {
          ...(sessionToken
            ? { Authorization: `Bearer ${sessionToken}` }
            : null),
        },
      });

      console.log(response.data);
      return response.data;
    } catch (error) {}
  };

  return { fetchUserOrder, createUserOrder, fetchAllOrder };
};

export default useOrder;
