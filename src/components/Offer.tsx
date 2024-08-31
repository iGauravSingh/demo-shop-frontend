import { Link } from "react-router-dom";

// rough 
import junkProduct from "../assets/junkData";
// 

const Offer = () => {
  return (
    <>
      <h3 className=" text-center mt-8 text-2xl font-semibold tracking-wider">
        Featured Products
      </h3>
      <div className=" w-screen flex justify-center mt-7">
        <div className=" grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {junkProduct.map((item) => (
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
                    <Link to={`/product/${item.id}`}><button className=" group-hover:block hidden absolute bottom-4 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-5 py-3 text-nowrap opacity-100">
                      Details
                    </button></Link>
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
    </>
  );
};

export default Offer;
