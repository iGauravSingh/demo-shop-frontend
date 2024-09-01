import { useContext } from "react";
import { ShopContext } from "../context/ShopContexts";

import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

const ProductDetail = () => {
  const { shop, setShop } = useContext(ShopContext);

  const { id } = useParams();
  if (!id) {
    return (
      <div className=" min-h-screen flex justify-center items-center">
        Invalid Product
      </div>
    );
  }

  const products = useSelector((state: RootState) => state.products.value);

  const newId = parseInt(id);
  console.log(id);

  const sampleData = products.products?.find((product) => product.id === newId);

  const handleAddToCart = () => {
    const productInCart = shop.find((product) => product.id === parseInt(id));
    if (productInCart) {
      return alert("Product already in cart!");
    }
    if (sampleData) {
      setShop((prev) => [...prev, sampleData]);
    }
  };

  return (
    <>
      <div className=" min-h-screen w-screen mt-5 font-sans">
        {/* image  */}
        <div key={id} className="">
          <img
            src={sampleData?.productImage}
            className=" w-full h-[250px] object-contain"
          />
        </div>

        <div className=" flex flex-col md:flex-row mt-5">
          {/* detail  */}
          <div className=" min-h-[100px] md:min-w-[50%] pt-8">
            <div className=" w-full h-full flex flex-col items-center px-4">
              <h2 className=" text-xl font-semibold">
                {sampleData?.productName}
              </h2>
              <h3 className=" text-lg text-justify mt-4">
                ₹{sampleData?.price}
              </h3>
              <h3 className=" text-lg text-justify mt-4">
                {sampleData?.productdescription}
              </h3>
            </div>
          </div>

          {/* border */}
          <div className=" border-2 md:min-h-[250px] mt-5 md:mt-0"></div>

          {/* Add to Cart */}
          <div className=" w-full h-full flex justify-center mt-5 md:mt-0 pt-8">
            <button
              onClick={handleAddToCart}
              className=" bg-slate-900 text-white px-5 py-3 text-nowrap"
            >
              {sampleData?.availability ? "Add To Cart" : "Product Unavailable"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
