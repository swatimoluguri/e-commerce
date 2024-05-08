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
import { useSelector } from "react-redux";

const Navbar = () => {
  const cart = useSelector((store) => store.cart.items);

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
      <div className="flex flex-row px-44 py-6 items-center justify-between bg-white">
        <div>
          <Link to="/">
            <img className="w-44" src={Logo} alt="Logo" />
          </Link>
        </div>
        <div className="flex flex-row ">
          <div className="p-4 font-semibold">
            <Link to="/">Home</Link>
          </div>
          <div className="p-4 font-semibold">
            <Link to="/products">Products</Link>
          </div>
          <div className="p-4 font-semibold">
            <Link to="/products">About Us</Link>
          </div>
          <div className="p-4 font-semibold">
            <Link to="/products">Contact Us</Link>
          </div>
        </div>
        <div className="flex items-center gap-6 relative">
          <img className="w-6" src={Search} alt="Search" />
          <img className="w-6" src={Heart} alt="Favorites" />
          <img className="w-6" src={User} alt="User Sign In" />
          <Link to="/cart">
            <img className="w-6" src={Cart} alt="Cart" />
          </Link>
          {cart.length > 0 && (
            <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-red-600 text-white font-bold text-xs w-4 h-4 flex items-center justify-center rounded-full">
              {cart.reduce((acc, item) => {
                acc += item.count;
                return acc;
              }, 0)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
export default Navbar;
