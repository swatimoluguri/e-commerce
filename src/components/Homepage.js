import Navbar from "./Navbar";
import Banner from "./Banner";
import DetailsStrip from "./DetailsStrip";
import Collections from "./Collections";
import SaleBanner from "./SaleBanner";
import Faq from "./Faq";

const Homepage = () => {
  return (
    <div>
      <Navbar/>
      <Banner/>
      <DetailsStrip/>
      <Collections/>
      <SaleBanner/>
      <Faq/>
    </div>
  );
};
export default Homepage;
