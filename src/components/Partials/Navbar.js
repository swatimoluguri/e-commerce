import { Link } from "react-router-dom";
import Logo from "../../assets/logo.png";
import Search from "../../assets/search.png";
import User from "../../assets/user.png";
import Cart from "../../assets/cart.png";
import Heart from "../../assets/heart.png";
import Logout from "../../assets/logout.png";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SocialMedia from "./SocialMedia";
import { useSelector,useDispatch } from "react-redux";
import {clearUser} from "../../utils/UserSlice";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const cart = useSelector((store) => store.cart);
  const [menuOpen, setMenuOpen] = useState(false);
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const handleUserClick=()=>{
    if (user && user.user && user.user.length > 0) {
      dispatch(clearUser());
    }else{
      navigate("/signup");
    }
  }
  return (
    <div>
      {/* Top Navbar */}
      <div className="bg-app-green h-12 px-4 md:px-8 lg:px-12 xl:px-16 2xl:px-24 flex items-center justify-between text-white">
        <div>Call Us : +91-98765-43210</div>
        {user.user.length>0?<div>Hi {user.user} !  <Link to="/products"><span className="underline text-app-yellow font-semibold pl-4">Let's shop </span></Link></div>:(<div>
          Sign Up now and get 25% OFF for your first order.{" "}
          <span className="text-app-yellow underline font-semibold pl-4">
            <Link to="/signup">Sign Up Now</Link>
          </span>
        </div>)}
        <SocialMedia/>
      </div>

      {/* Bottom Navbar */}
      <div className="flex flex-row px-4 md:px-8 lg:px-12 xl:px-16 2xl:px-24 py-2 md:py-4 items-center justify-between bg-white">
        <div>
          <Link to="/">
            <img className="w-32 md:w-44" src={Logo} alt="Logo" />
          </Link>
        </div>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="focus:outline-none">
            <FontAwesomeIcon
              alt="Menu"
              className="text-app-green w-6"
              icon={menuOpen ? faTimes : faBars}
            />
          </button>
        </div>
        <div className="hidden md:flex flex-row space-x-4 items-center">
          <NavItem to="/">Home</NavItem>
          <NavItem to="/products">Products</NavItem>
          <NavItem to="/about">About Us</NavItem>
          <NavItem to="/contact">Contact Us</NavItem>
        </div>
        <div className="flex items-center gap-6 relative">
          <img className="w-6" src={Search} alt="Search" />
          <img className="w-6" src={Heart} alt="Favorites" />
          <img className="w-6 cursor-pointer" src={user.user.length>0?Logout:User} alt="User Sign In" onClick={handleUserClick} />
          <Link to="/cart">
            <img className="w-6" src={Cart} alt="Cart" />
          </Link>
          {cart.cart.items.length > 0 && (
            <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-red-600 text-white font-bold text-xs w-4 h-4 flex items-center justify-center rounded-full">
              {cart.cart.items.reduce((acc, item) => {
                acc += item.count;
                return acc;
              }, 0)}
            </span>
          )}
        </div>
      </div>
      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white px-4 py-2">
          <div className="flex flex-col space-y-4">
            <NavItem to="/" onClick={toggleMenu}>
              Home
            </NavItem>
            <NavItem to="/products" onClick={toggleMenu}>
              Products
            </NavItem>
            <NavItem to="/about" onClick={toggleMenu}>
              About Us
            </NavItem>
            <NavItem to="/contact" onClick={toggleMenu}>
              Contact Us
            </NavItem>
          </div>
        </div>
      )}
    </div>
  );
};

const NavItem = ({ to, children, onClick }) => {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="block py-2 px-4 font-semibold text-gray-800 hover:text-app-green"
    >
      {children}
    </Link>
  );
};
export default Navbar;
