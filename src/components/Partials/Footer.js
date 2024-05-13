import LogoInvert from "../../assets/logo_invert.png";
import SocialMedia from "./SocialMedia";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className=" flex flex-col h-auto   bg-app-green text-white ">
      <div className="flex py-10 px-20 justify-between">
        <div className="flex flex-col gap-6 w-1/3">
          <div>
            <img className="w-52" src={LogoInvert} alt="Logo" />
          </div>
          <div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <SocialMedia/>
        </div>
        <div className="flex flex-col gap-3">
          <h2 className="font-bold text-xl mb-4">Company</h2>
          <Link to="#"><p className="hover:text-app-yellow">About Us</p></Link>
          <Link to="#"><p className="hover:text-app-yellow">Blog</p></Link>
          <Link to="#"><p className="hover:text-app-yellow">Contact Us</p></Link>
          <Link to="#"><p className="hover:text-app-yellow">Career</p></Link>
        </div>
        <div className="flex flex-col gap-3">
          <h2 className="font-bold text-xl mb-4">Customer Service</h2>
          <Link to="#"><p className="hover:text-app-yellow">My Account</p></Link>
          <Link to="#"><p className="hover:text-app-yellow">Track my Order</p></Link>
          <Link to="#"><p className="hover:text-app-yellow">Return</p></Link>
          <Link to="#"><p className="hover:text-app-yellow">FAQ</p></Link>
        </div>
        <div className="flex flex-col gap-3">
          <h2 className="font-bold text-xl mb-4">Important Links</h2>
          <Link to="#"><p className="hover:text-app-yellow">Privacy</p></Link>
          <Link to="#"><p className="hover:text-app-yellow">User Terms and Conditions</p></Link>
          <Link to="#"><p className="hover:text-app-yellow">Return Policy</p></Link>
          <Link to="#"><p className="hover:text-app-yellow">Settings</p></Link>
        </div>
      </div>
      <div className="bg-app-yellow h-12 flex items-center px-20 text-black font-semibold">
        <p>Copyright &#169; 2024 Shoppy. All Rights Reserved.  </p>
      </div>
    </div>
  );
};
export default Footer;
