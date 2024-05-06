import LogoInvert from "../assets/logo_invert.png";
import Twitter from "../assets/twitter.png";
import Facebook from "../assets/facebook.png";
import Instagram from "../assets/instagram.png";
import Pinterest from "../assets/pinterest.png";
import Youtube from "../assets/youtube.png";

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
          <div className="flex gap-2">
            <img className="w-6" src={Facebook} alt="Facebook" />
            <img className="w-6" src={Instagram} alt="Instagram" />
            <img className="w-6" src={Twitter} alt="Twitter" />
            <img className="w-6" src={Pinterest} alt="Pinterest" />
            <img className="w-6" src={Youtube} alt="Youtube" />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <h2 className="font-bold text-xl mb-4">Company</h2>
          <p>About Us</p>
          <p>Blog</p>
          <p>Contact Us</p>
          <p>Career</p>
        </div>
        <div className="flex flex-col gap-3">
          <h2 className="font-bold text-xl mb-4">Customer Service</h2>
          <p>My Account</p>
          <p>Track my Order</p>
          <p>Return</p>
          <p>FAQ</p>
        </div>
        <div className="flex flex-col gap-3">
          <h2 className="font-bold text-xl mb-4">Important Links</h2>
          <p>Privacy</p>
          <p>User Terms and Conditions</p>
          <p>Return Policy</p>
          <p>Settings</p>
        </div>
      </div>
      <div className="bg-app-yellow h-12 flex items-center px-20 text-black font-semibold">
        <p>Copyright &#169; 2024 Shoppy. All Rights Reserved.  </p>
      </div>
    </div>
  );
};
export default Footer;
