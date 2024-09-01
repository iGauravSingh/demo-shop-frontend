import { Link } from "react-router-dom";

import useProducts from "../hooks/useProduct";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
//

const Catalog = () => {
  const { fetchProductsList } = useProducts();

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        fetchProductsList();
      } catch (error) {
        console.log("error fetching data");
      }
    };
    fetchProductData();
  }, []);

  const products = useSelector((state: RootState) => state.products.value);

  if (products.isLoading) {
    return (
      <div>
        <div className="absolute inset-0 flex items-center justify-center z-10 bg-black bg-opacity-75">
          {/* Spinner */}
          <div className="w-12 h-12 border-4 border-gray-200 border-t-4 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className=" min-h-screen">
      <h3 className=" text-center mt-8 text-2xl font-semibold tracking-wider">
        Our Products
      </h3>
      <div className=" w-screen flex justify-center mt-7">
        <div className=" grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.products?.map((item) => (
            <div key={item.id}>
              <div className=" relative h-[250px] w-[200px]">
                <img
                  src={item.productImage}
                  alt=""
                  className=" w-full h-full"
                />
                <div className=" group absolute top-0 left-0  w-full h-full  z-10">
                  <div className="w-full h-full relative">
                    <div className=" h-full w-full hidden group-hover:block bg-black opacity-30"></div>
                    <Link to={`/product/${item.id}`}>
                      <button className=" group-hover:block hidden absolute bottom-4 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-5 py-3 text-nowrap opacity-100">
                        Details
                      </button>
                    </Link>
                    <div className=" absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 hidden group-hover:block text-white text-lg font-sans font-semibold z-30">
                      <p>{item.productName}</p>
                      <p>₹{item.price}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Catalog;
