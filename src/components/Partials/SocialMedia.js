import Twitter from "../../assets/twitter.png";
import Facebook from "../../assets/facebook.png";
import Instagram from "../../assets/instagram.png";
import Pinterest from "../../assets/pinterest.png";
import Youtube from "../../assets/youtube.png";
import { Link } from "react-router-dom";

const SocialMedia = () => {
  return (
    <div className="flex gap-2">
      <Link to="https://www.facebook.com/" target="_blank">
        <img className="w-6" src={Facebook} alt="Facebook" />
      </Link>
      <Link to="https://www.instagram.com/" target="_blank">
        <img className="w-6" src={Instagram} alt="Instagram" />
      </Link>
      <Link to="https://www.x.com/" target="_blank">
        <img className="w-6" src={Twitter} alt="X Twitter" />
      </Link>
      <Link to="https://www.pinterest.com/" target="_blank">
        <img className="w-6" src={Pinterest} alt="Pinterest" />
      </Link>
      <Link to="https://www.youtube.com/" target="_blank">
        <img className="w-6" src={Youtube} alt="Youtube" />
      </Link>
    </div>
  );
};
export default SocialMedia;
