import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <div className=" w-screen min-h-[200px] bg-slate-200 mt-11 font-sans">
        <div className=" flex flex-col md:flex-row md:justify-between md:items-center px-10 py-7">

          <div>
            <ul>
              <li className=" text-lg font-semibold mb-2">Links</li>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/catalog">Catalog</Link></li>
            </ul>
          </div>

          <div className=" mt-7 md:mt-0">
            <h3 className=" text-lg font-semibold mb-2">Contacts</h3>
            <h3>soame address line 1</h3>
            <h3>soame address line 2</h3>
            <h3>phone no 7788778877</h3>
          </div>

        </div>
      </div>
    </>
  );
};

export default Footer;
