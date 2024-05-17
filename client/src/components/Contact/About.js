import Heading from "../Partials/Heading";
import DetailsStrip from "../Partials/DetailsStrip";
import Jenny from "../../assets/people/Jenny.jpg";
import Jacob from "../../assets/people/jacob.jpg";
import John from "../../assets/people/john.jpg";
import Awards from "./Awards";

const About = () => {
  const cards = [
    {
      name: "Jenny Alexander",
      designation: "Director, CEO",
      img: Jenny,
    },
    {
      name: "Jacob Thomas",
      designation: "Head of Technology",
      img: Jacob,
    },
    {
      name: "John Marcus",
      designation: "Sales and Marketing",
      img: John,
    },
  ];
  return (
    <div>
      <div className="flex flex-col items-center bg-[url('assets/bg.jpg')] bg-cover	">
        <Heading
          text="Our Story"
          heading="Crafted Comfort:"
          highlight="Quality Material and fast deliveries"
        />
      </div>
      <div className="w-2/3  mx-auto">
        <p className="text-gray-500 font-medium text-md md:text-lg text-justify py-4 my-4  ">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>
      <div className=" text-center ">
        <h1 className="font-satisfy text-3xl text-app-green">
          Jenny Alexander
        </h1>
        <p>CEO</p>
        <img src={Jenny} alt="CEO Jenny" className="h-80 lg:h-112 mx-auto rounded-xl" />
      </div>
      <Awards />
      <Heading text="Our team" heading="Meet:" highlight="Our Team" />
      <div className="flex gap-4 flex-wrap justify-around">
        {cards.map((item) => (
          <div key={item.name} className="bg-gray-50 rounded-lg p-4">
            <div className="h-60 w-60 lg:h-96 lg:w-96">
              <img
                className="h-full w-full object-cover rounded-lg"
                src={item.img}
                alt="team"
              />
            </div>
            <div className="text-center  pt-4">
              <h2 className="font-semibold text-xl">{item.name}</h2>
              <p className="text-gray-500">{item.designation}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col items-center  bg-[url('assets/bg.jpg')] bg-cover	my-10">
        <p className="text-gray-500 font-medium text-md md:text-lg text-justify py-4  w-2/3 mx-auto ">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>
      <DetailsStrip />
    </div>
  );
};
export default About;
