import Twitter from "../../assets/twitter.png";
import Facebook from "../../assets/facebook.png";
import Instagram from "../../assets/instagram.png";
import Pinterest from "../../assets/pinterest.png";
import Youtube from "../../assets/youtube.png";
const SocialMedia = () => {
  return (
    <div className="flex gap-2">
      <img className="w-6" src={Facebook} alt="Facebook" />
      <img className="w-6" src={Instagram} alt="Instagram" />
      <img className="w-6" src={Twitter} alt="Twitter" />
      <img className="w-6" src={Pinterest} alt="Pinterest" />
      <img className="w-6" src={Youtube} alt="Youtube" />
    </div>
  );
};
export default SocialMedia;
