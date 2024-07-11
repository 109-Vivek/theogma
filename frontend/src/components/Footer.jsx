import nitt_logo from "../assets/nitt_logo.png";
import { FaInstagram } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className=" min-h-[90px] flex  justify-around items-center bg-black bg-opacity-50 text-[#d6d1d1] ">
      <div className="  flex justify-center items-center  ">
        <img
          className="h-[2rem] sm:h-[3rem]  rounded-[100%] "
          src={nitt_logo}
        />
      </div>
      <div className="flex flex-col items-center justify-center">
        <p className="text-[15px] sm:text-[1rem] text-center pt-2">
          Made With ❤️ by THE OGMA
        </p>
      </div>
      <div className=" flex justify-center items-center gap-x-4 ">
        <Link to="https://www.instagram.com/the_ogma/" target="_blank">
          <FaInstagram className="text-3xl" />
        </Link>
        <Link to="https://www.facebook.com/theogmanitt" target="_blank">
        <FaFacebook className="text-3xl" />
        </Link>
      </div>
    </div>
  );
};

export default Footer;
