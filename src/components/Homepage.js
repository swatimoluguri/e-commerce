import Navbar from "./Navbar";
import Banner from "./Banner";
import DetailsStrip from "./DetailsStrip";
import Collections from "./Collections";
import SaleBanner from "./SaleBanner";
import FaqAccordion from "./FaqAccordion";
import Heading from "./Heading";
import Newsletter from "./Newsletter";
import Footer from "./Footer";

const Homepage = () => {
  return (
    <div>
      <Navbar />
      <Banner />
      <DetailsStrip />
      <Heading
        text="Our Products"
        heading="Our"
        highlight="Products Collections"
      />
      <Collections />
      <SaleBanner />
      <Heading text="FAQs" heading="Question?" highlight="Look here." />
      <FaqAccordion />
      <div className="flex flex-col items-center bg-[url('assets/bg.jpg')] py-24 mt-12 bg-cover	">
        <Heading
          text="Our Newsletter"
          heading="Subscribe to our"
          highlight="Newsletter"
        />
        <Newsletter />
      </div>
      <Footer />
    </div>
  );
};
export default Homepage;
