import Bg from "../../assets/bg.jpg";
import Bag from "../../assets/bag.png";
import Effect from "../../assets/effect.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight,faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Card from "./Card";
import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cards = [
    <Card
      src={"https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg"}
      desc={"Mens Cotton Jacket"}
      price={"4,679"}
      id={"6631d007ec357355a9818c99"}
    />,
    <Card
      src={"https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg"}
      desc={'Acer SB220Q 21.5" Full HD'}
      price={"49,999"}
      id={"6631d007ec357355a9818ca3"}
    />,
  ];
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === 1 ? 0 : prevIndex + 1));
    }, 4000); 

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === cards.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? cards.length - 1 : prevIndex - 1
    );
  };
  return (
    <div className="relative h-screen/2 flex items-center justify-center">
      <div className="h-full z-10 absolute flex items-center w-3/4 justify-center gap-24">
        <div className="w-1/2 flex flex-col gap-8">
          <div className="relative h-14 w-fit flex items-center bg-white rounded-3xl px-4 py-1 text-2xl font-medium">
            <img
              src={Bag}
              className="h-full object-cover inline"
              alt="shopping bag"
            />
            <span className="px-4">The best online market</span>
            <img
              className="absolute -right-10 -top-4 h-10 "
              src={Effect}
              alt="effect"
            />
          </div>

          <p className="text-6xl font-bold text-gray-800 leading-normal">
            Shoppy <span className="text-app-green">Early Bird Sale</span> is
            LIVE !
          </p>
          <p className="text-gray-500 font-medium text-lg   ">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <div className="flex items-center gap-12">
          <Link to="/products">
            <button className="bg-app-green px-6 py-2 text-white rounded-3xl text-lg font-medium">
              Shop Now <FontAwesomeIcon icon={faArrowRight} />
            </button>
            </Link>
          </div>
        </div>
        <div className="w-1/2 flex flex-col">
          {cards[currentIndex]}
          <div className="py-6 flex gap-4">
          <button className="h-12 w-12 rounded-3xl bg-app-green" onClick={prevSlide}><FontAwesomeIcon className="text-white" icon={faArrowLeft} /></button>
          <button className="h-12 w-12 rounded-3xl bg-app-yellow" onClick={nextSlide}><FontAwesomeIcon className="text-black" icon={faArrowRight} /></button>
          </div>
        </div>
      </div>

      <img
        className=" z-0 relative object-cover w-full"
        src={Bg}
        alt="background"
      />
    </div>
  );
};
export default Banner;
