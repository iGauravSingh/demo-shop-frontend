import { useEffect, useState } from "react";
import useOrder from "../../hooks/useOrder"
import { UserOrder } from "../Profile";





const Orders = () => {

  const {fetchAllOrder } = useOrder()

  const [uorders, setUorders] = useState<UserOrder[]>([]);

  useEffect(() => {
    const fetchUserOrders = async () => {
      
      
        const userOrders = await fetchAllOrder();
        
        setUorders(userOrders);
      
    };

    fetchUserOrders();
  }, []);

  

  return (
    <div>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="py-3 px-6">Order ID</th>
            <th scope="col" className="py-3 px-6">Order Details</th>
            <th scope="col" className="py-3 px-6">Order Amount</th>
            <th scope="col" className="py-3 px-6">Delivery Address</th>
            <th scope="col" className="py-3 px-6">Customer ID</th>
          </tr>
        </thead>
        <tbody>
          {uorders?.map((order, index) => (
            <tr key={index} className={`bg-white border-b dark:bg-gray-800 dark:border-gray-700 ${index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-800' : 'bg-white dark:bg-gray-700'}`}>
              <td className="py-4 px-6">{order.orderId}</td>
              <td className="py-4 px-6">
                {order.orderDetails.join(", ")}
              </td>
              <td className="py-4 px-6">{order.orderAmount}</td>
              <td className="py-4 px-6">{order.address}</td>
              <td className="py-4 px-6">{order.customerId}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Orders