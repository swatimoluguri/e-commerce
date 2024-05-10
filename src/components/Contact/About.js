import Heading from "../Partials/Heading";
import DetailsStrip from "../Partials/DetailsStrip";

const About=()=>{
    return <div>
        <div className="flex flex-col items-center bg-[url('assets/bg.jpg')] bg-cover	">
        <Heading text="About Us" heading="" highlight="" />
      </div>
      <DetailsStrip />
    </div>
}
export default About;