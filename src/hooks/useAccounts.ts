import axios from "axios";
import Cookie from "universal-cookie";
import { useDispatch } from "react-redux";
import { setaccounts, clearaacounts, deleteaccounts } from "../features/accountsSlice"

const cookie = new Cookie();

const urllocal = "http://localhost:8080"

const useAccounts = () => {
    // const sessionToken = cookie.get("session_token");
    const adminToken = cookie.get("admin_token");
    const dispatch = useDispatch()
// 
    const fetchAccountsList = async () => {
        try {
            const response = await axios.get(`${urllocal}/users/allusers`,{
                headers: {
                  ...(adminToken ? { Authorization: `Bearer ${adminToken}` } : null),
                },
              })
            const acccountsData = response.data;
            if(!acccountsData){
                return dispatch(clearaacounts())
            }

            // console.log(postaData)
            dispatch(setaccounts(acccountsData))
        } catch (error) {
            return dispatch(clearaacounts())
        }
    }

// 
    // const createProducts = async (data:any) => {
    //     try {
    //         const response = await axios.post(`${urllocal}/products/addproduct`, data,{
    //             headers: {
    //               ...(sessionToken ? { Authorization: `Bearer ${sessionToken}` } : null),
    //             },
    //           });
    
    // console.log(response.data)
    // return response.data;
    //     } catch (error) {
    //         alert("Error in creating new Project")
    //         return dispatch(clearaacounts())

    //     }
    // }

// 

    const deleteAccountwithId = async (id:number) => {
        try {
            const response = await axios.delete(`${urllocal}/users/deleteuser/${id}`,{
                headers: {
                  ...(adminToken ? { Authorization: `Bearer ${adminToken}` } : null),
                },
              });
      const postsData = response.data;

      if(postsData.success) {
        dispatch(deleteaccounts(id))
      }
        } catch (error) {
            return dispatch(clearaacounts())
        }
    }

    return { fetchAccountsList, deleteAccountwithId }
}

export default useAccounts