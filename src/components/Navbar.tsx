import { FaCartArrowDown } from "react-icons/fa6";
import { FaSignInAlt } from "react-icons/fa";
// import { IoMenu } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContexts";
import { useContext } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

// "Home","Catalog","Blog"
const navmenu = [
  { id: 1, name: "Home", link: "/" },
  { id: 2, name: "Catalog", link: "/catalog" },
  { id: 3, name: "Blog", link: "/blog" },
  { id: 4, name: "Admin", link: "/adminsignin" },
];

const Navbar = () => {
  const user = useSelector((state: RootState) => state.user.value);
  const { shop } = useContext(ShopContext);

  return (
    <>
      <div className=" w-screen h-[50px] flex justify-end items-center border-b-2 px-10 font-sans">
        <ul className=" flex items-center gap-8">
          {navmenu.map((menu) => (
            <li
              key={menu.id}
              className=" text-slate-800 cursor-pointer font-semibold"
            >
              <Link to={menu.link}>{menu.name}</Link>
            </li>
          ))}

          <div className=" relative cursor-pointer">
            <Link to="/cart">
              <FaCartArrowDown color="#1e293" size={20} />
            </Link>
            <div className=" absolute -top-3 -right-2 h-4 w-4 bg-cyan-400 rounded-full flex justify-center items-center">
              <p className=" text-white">{shop.length}</p>
            </div>
          </div>

          <div className=" cursor-pointer">
            {user.user?.id ? (
              <Link to="/profile">
                <FaRegUserCircle color="#1e293" size={20} />
              </Link>
            ) : (
              <Link to="/signin">
                <FaSignInAlt color="#1e293" size={20} />
              </Link>
            )}
          </div>
          {/* FaRegUserCircle */}
        </ul>
      </div>
    </>
  );
};

export default Navbar;
