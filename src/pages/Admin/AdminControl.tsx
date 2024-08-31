import { useState } from "react";

import Products from "./Products";
import Accounts from "./Accounts";
import Orders from "./Orders";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import useAdminAuth from "../../hooks/useAdminAuth";
import { useNavigate } from "react-router-dom";
// import useProducts from "../../hooks/useProduct";
// import { useSelector } from "react-redux";
// import { RootState } from "../../app/store";

const AdminControl = () => {

  const navigate = useNavigate();

  const { logout } = useAdminAuth()

  const admin = useSelector((state: RootState) => state.admin.value);
  if(!admin.admin){
    return (
      <div className=" h-screen w-screen flex justify-center items-center">
        <h1 className=" text-4xl font-bold">Invaild Access</h1>
      </div>
    )
  }

  const [selectedPage, setSelectedPage] = useState("orders");

  

  

  const handleOrders = () => {
    setSelectedPage("orders");
  };

  const handleProducts = () => {
    setSelectedPage("products");
  };

  const handleAccounts = () => {
    setSelectedPage("accounts");
  };
  // const handleCategory = () => {
  //   setSelectedPage("category");
  // };

  const handleAdminLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className=" min-h-screen flex font-serif">
      {/* side left panel  */}
      <div className=" w-[20%] min-h-screen bg-slate-400 border-r-2 shadow-lg flex flex-col items-center">
        <p onClick={handleOrders} className="mt-7 cursor-pointer">
          ORDERS
        </p>
        <p onClick={handleProducts} className="mt-7 cursor-pointer">
          PRODUCTS
        </p>
        {/* <p onClick={handleCategory} className="mt-7 cursor-pointer">
          CATEGORY
        </p> */}
        <p onClick={handleAccounts} className="mt-7 cursor-pointer">
          ACCOUNTS
        </p>

        <button onClick={handleAdminLogout} className=" bg-black text-slate-100 px-4 py-2 mt-11">Logout</button>
      </div>

      {/* right panel  */}

      <div className=" w-[80%] min-h-screen bg-slate-200 ">
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
          <p className=" text-center text-2xl mt-2 mb-4">
            {selectedPage.toUpperCase()}
          </p>
          {selectedPage === "orders" && <Orders />}
          
          {selectedPage === "products" && <Products />}
          {selectedPage === "accounts" && <Accounts />}

          
        </div>
      </div>
    </div>
  );
};

export default AdminControl;
