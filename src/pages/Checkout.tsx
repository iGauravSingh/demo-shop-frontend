import { useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContexts";
import { useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import useOrder from "../hooks/useOrder";

const Checkout = () => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user.value);
  const { shop, setShop } = useContext(ShopContext);

  if (!user.user) {
    return (
      <div className=" h-screen w-screen flex justify-center items-center">
        <h1 className=" text-4xl font-bold">Invaild Access</h1>
      </div>
    );
  }

  useEffect(() => {
    const checkerFunc = () => {
      if (!shop.length) {
        navigate("/catalog");
      }
    };
    checkerFunc();
  }, []);

  const totalAmount = shop.reduce((acc, product) => acc + product.price, 0);

  const { createUserOrder } = useOrder();

  const handlePayment = async () => {
    alert(
      "This is a demo App , This will create user order visit profile to see order"
    );

    const orderArr: string[] = [];
    shop.map((item) => orderArr.push(item.productName));
    console.log("rhis is shoplist data", orderArr);
    const resp = await createUserOrder({ orderArr, totalAmount });
    if (resp.message === "ok created") {
      setShop([]);
      navigate("/profile");
    }
    //
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-5xl mx-auto bg-white p-6 shadow-2xl rounded-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Checkout</h1>

        {/* Cart Summary */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700">Your Cart</h2>
          <div className="flex flex-col space-y-4 mt-4">
            {shop.map((product) => (
              <div
                key={product.id}
                className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-sm"
              >
                <img
                  src={product.productImage}
                  alt={product.productName}
                  className="w-16 h-16 rounded-md"
                />
                <div className="flex-grow px-4">
                  <h3 className="text-lg font-medium">{product.productName}</h3>
                  <p className="text-sm text-gray-500">
                    {product.productdescription}
                  </p>
                </div>
                <p className="text-lg font-semibold">
                  ₹{product.price.toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Billing Information (Optional) */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700">
            Billing Information
          </h2>
          <form className="mt-4 space-y-4">
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                className="mt-1 p-2 border rounded-md focus:ring-black focus:border-black"
                placeholder="Full Name"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700">
                Address
              </label>
              <input
                type="text"
                className="mt-1 p-2 border rounded-md focus:ring-black focus:border-black"
                placeholder="Address"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700">City</label>
              <input
                type="text"
                className="mt-1 p-2 border rounded-md focus:ring-black focus:border-black"
                placeholder="City"
              />
            </div>
          </form>
        </div>

        {/* Order Summary */}
        <div className="border-t border-gray-200 pt-6">
          <h2 className="text-lg font-semibold text-gray-700">Order Summary</h2>
          <div className="mt-4 space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${totalAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>GST (10%)</span>
              <span>₹{(totalAmount * 0.1).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span>₹{(totalAmount * 1.1).toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Payment Button */}
        <div className="mt-6">
          <div
            onClick={handlePayment}
            className="w-full flex justify-center items-center px-6 py-3 text-white bg-black rounded-md shadow-md cursor-pointer   "
          >
            Proceed to Payment
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
