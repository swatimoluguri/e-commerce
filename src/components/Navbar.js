import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import Twitter from "../assets/twitter.png";
import Facebook from "../assets/facebook.png";
import Instagram from "../assets/instagram.png";
import Pinterest from "../assets/pinterest.png";
import Youtube from "../assets/youtube.png";
import Search from "../assets/search.png";
import User from "../assets/user.png";
import Cart from "../assets/cart.png";
import Heart from "../assets/heart.png";

const Navbar = () => {
  return (
    <div>
      <div className="bg-app-green h-12 px-64 flex items-center justify-between  text-white">
        <div>Call Us : +91-98765-43210</div>
        <div>
          Sign Up now and get 25% OFF for your first order.{" "}
          <span className="text-app-yellow underline font-semibold pl-4">
            <Link to="/signup">Sign Up Now</Link>
          </span>
        </div>
        <div className="flex gap-2">
          <img className="w-6" src={Facebook} alt="Facebook" />
          <img className="w-6" src={Instagram} alt="Instagram" />
          <img className="w-6" src={Twitter} alt="Twitter" />
          <img className="w-6" src={Pinterest} alt="Pinterest" />
          <img className="w-6" src={Youtube} alt="Youtube" />
        </div>
      </div>
      <div className="flex flex-row px-44 py-6 items-center justify-between bg-white drop-shadow-lg">
        <div>
          <img className="w-44" src={Logo} alt="Logo" />
        </div>
        <div className="flex flex-row ">
          <div className="p-4 font-semibold">
            <Link to="/">Home</Link>
          </div>
          <div className="p-4 font-semibold">
            <Link to="/products">Products</Link>
          </div>
          <div className="p-4 font-semibold">
            <Link to="/products">Categories</Link>
          </div>
          <div className="p-4 font-semibold">
            <Link to="/products">About Us</Link>
          </div>
          <div className="p-4 font-semibold">
            <Link to="/products">Contact Us</Link>
          </div>
        </div>
        <div className="flex gap-6">
          <img className="w-6" src={Search} alt="Search" />
          <img className="w-6" src={Heart} alt="Favorites" />
          <img className="w-6" src={Cart} alt="Cart" />
          <img className="w-6" src={User} alt="User Sign In" />
        </div>
      </div>
    </div>
  );
};
export default Navbar;
