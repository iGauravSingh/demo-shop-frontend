import { useEffect } from "react"
import useAccounts from "../../hooks/useAccounts"
import { useSelector } from "react-redux"
import { RootState } from "../../app/store"



const Accounts = () => {

  const { fetchAccountsList } = useAccounts()

  useEffect(() => {
    const fetchAccountData = async () => {
      try {
        fetchAccountsList()
      } catch (error) {
        console.log("error fetching data")
      }
    }
    fetchAccountData()
  },[])

  const data = useSelector((state: RootState) => state.accounts.value)

  return (
    <div>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="py-3 px-6">User ID</th>
            <th scope="col" className="py-3 px-6">User Name</th>
            <th scope="col" className="py-3 px-6">User Email</th>
            <th scope="col" className="py-3 px-6">User Address</th>
            <th scope="col" className="py-3 px-6">User PhoneNumber</th>
          </tr>
        </thead>
        <tbody>
          {data.accounts?.map((account, index) => (
            <tr key={index} className={`bg-white border-b dark:bg-gray-800 dark:border-gray-700 ${index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-800' : 'bg-white dark:bg-gray-700'}`}>
              {/* <td className="py-4 px-6">{order.OrderId}</td>
              <td className="py-4 px-6">
                {order.orderDetails.join(", ")}
              </td> */}
              <td className="py-4 px-6">{account.id}</td>
              <td className="py-4 px-6">{account.username}</td>
              <td className="py-4 px-6">{account.email}</td>
              <td className="py-4 px-6">{account.address}</td>
              <td className="py-4 px-6">{account.phoneNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Accounts