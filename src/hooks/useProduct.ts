import axios from "axios";
import Cookie from "universal-cookie";
import { useDispatch } from "react-redux";
import {
  setproducts,
  clearproducts,
  deleteProducts,
  updateproduct,
} from "../features/productSlice";

const cookie = new Cookie();

const urllocal = "http://localhost:8080";

const useProducts = () => {
  const adminToken = cookie.get("admin_token");
  const dispatch = useDispatch();

  const fetchProductsList = async () => {
    try {
      const response = await axios.get(`${urllocal}/products/getall`);
      const productsData = response.data;
      if (!productsData) {
        return dispatch(clearproducts());
      }

      dispatch(setproducts(productsData));
    } catch (error) {
      return dispatch(clearproducts());
    }
  };

  //
  const createProducts = async (data: any) => {
    try {
      const response = await axios.post(
        `${urllocal}/products/addproduct`,
        data,
        {
          headers: {
            ...(adminToken ? { Authorization: `Bearer ${adminToken}` } : null),
          },
        }
      );

      const productData = response.data;
      console.log(productData);
      if (productData.id) {
        dispatch(updateproduct(productData));
      }
    } catch (error) {
      alert("Error in creating new Project");
      return dispatch(clearproducts());
    }
  };

  //

  const deleteProductwithId = async (id: number) => {
    try {
      const response = await axios.delete(
        `${urllocal}/products/deleteproduct/${id}`,
        {
          headers: {
            ...(adminToken ? { Authorization: `Bearer ${adminToken}` } : null),
          },
        }
      );
      const productData = response.data;

      if (productData.message === "ok deleted") {
        dispatch(deleteProducts(id));
      }
    } catch (error) {
      return dispatch(clearproducts());
    }
  };

  return { fetchProductsList, createProducts, deleteProductwithId };
};

export default useProducts;
