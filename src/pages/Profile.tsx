import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../app/store";
import useAuth from "../hooks/useAuth";
import useOrder from "../hooks/useOrder";
import { useEffect, useState } from "react";

export interface UserOrder {
  orderId: string;
  orderDetails: string[];
  orderAmount: number;
  address: string;
  customerId: string;
}

const Profile = () => {
  const navigate = useNavigate();

  const user = useSelector((state: RootState) => state.user.value);

  if (!user.user) {
    return (
      <div className=" h-screen w-screen flex justify-center items-center">
        <h1 className=" text-4xl font-bold">Invaild Access</h1>
      </div>
    );
  }

  const { logout } = useAuth();
  const { fetchUserOrder } = useOrder();

  const [uorders, setUorders] = useState<UserOrder[]>([]);

  useEffect(() => {
    const fetchUserOrders = async () => {
      const userOrders = await fetchUserOrder();

      setUorders(userOrders);
    };

    fetchUserOrders();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      <div className=" w-screen h-screen flex  overflow-hidden p-4 font-serif">
        {/* user details  */}
        <div className=" w-[30%] border-r-2">
          <h2 className="text-xl mb-2">User Profile</h2>
          <div>
            <strong>Username:</strong>{" "}
            <span className="text-gray-700">{user.user.username}</span>
          </div>
          <div>
            <strong>Address:</strong>{" "}
            <span className="text-gray-700">{user.user.address}</span>
          </div>
          <div>
            <strong>Phone Number:</strong>{" "}
            <span className="text-gray-700">{user.user.phoneNumber}</span>
          </div>
          {/* logout  */}
          <button
            onClick={handleLogout}
            className=" mt-4 mb-2 bg-black text-white px-2 py-2"
          >
            Logout
          </button>
        </div>

        {/* user Orders  */}
        <div className=" w-[70%] px-5">
          <h3 className=" text-center mt-4 mb-6 text-2xl font-bold">
            Your Previous Orders
          </h3>
          <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="py-3 px-6">
                    Order ID
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Order Details
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Order Amount
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Delivery Address
                  </th>
                  {/* <th scope="col" className="py-3 px-6">Customer ID</th> */}
                </tr>
              </thead>
              <tbody>
                {uorders?.map((order, index) => (
                  <tr
                    key={index}
                    className={`bg-white border-b dark:bg-black dark:border-gray-700 ${
                      index % 2 === 0
                        ? "bg-gray-50 dark:bg-gray-800"
                        : "bg-white dark:bg-gray-700"
                    }`}
                  >
                    <td className="py-4 px-6">{order.orderId}</td>
                    <td className="py-4 px-6">
                      {order.orderDetails.join(", ")}
                    </td>
                    <td className="py-4 px-6">{order.orderAmount}</td>
                    <td className="py-4 px-6">{order.address}</td>
                    {/* <td className="py-4 px-6">{order.customerId}</td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
