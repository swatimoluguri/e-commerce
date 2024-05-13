import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const SaleBanner = () => {
  const dayRef = useRef(null);
  const hourRef = useRef(null);
  const minutesRef = useRef(null);
  const secondsRef = useRef(null);
  const [day, setDay] = useState("02");
  const [hour, setHour] = useState("14");
  const [minute, setMinute] = useState("45");
  const [second, setSecond] = useState("04");

  useEffect(() => {
    const interval = setInterval(() => {
      let curDay = parseInt(dayRef.current.textContent);
      let curHour = parseInt(hourRef.current.textContent);
      let curMin = parseInt(minutesRef.current.textContent);
      let curSec = parseInt(secondsRef.current.textContent);

      if (curSec > 0) {
        curSec--;
      } else if (curMin > 0) {
        curMin--;
        curSec = 59;
      } else if (curHour > 0) {
        curHour--;
        curMin = 59;
        curSec = 59;
      } else if (curDay > 0) {
        curDay--;
        curHour = 23;
        curMin = 59;
        curSec = 59;
      } else {
        clearInterval(interval);
      }

      setDay(curDay < 10 ? "0" + curDay.toString() : curDay.toString());
      setHour(curHour < 10 ? "0" + curHour.toString() : curHour.toString());
      setMinute(curMin < 10 ? "0" + curMin.toString() : curMin.toString());
      setSecond(curSec < 10 ? "0" + curSec.toString() : curSec.toString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex w-5/6 mx-auto gap-4 my-10">
      <div className="flex flex-col items-center bg-[url('assets/bg.jpg')] py-12 rounded-xl w-1/2 bg-cover	">
        <h1 className="font-bold text-5xl">
          Flash <span className="text-app-green">Sale!</span>
        </h1>
        <h2 className="py-4 text-2xl">Get 20% off - Limited Time Offer!</h2>
        <div className="flex items-center gap-5 mb-10">
          <div className="flex items-center flex-col">
            <p className="font-bold text-5xl" ref={dayRef}>
              {day}
            </p>
            <p className="text-gray-500">Days</p>
          </div>
          <p className="font-bold text-5xl">:</p>
          <div className="flex items-center flex-col">
            <p className="font-bold text-5xl" ref={hourRef}>
              {hour}
            </p>
            <p className="text-gray-500">Hours</p>
          </div>
          <p className="font-bold text-5xl">:</p>
          <div className="flex items-center flex-col">
            <p className="font-bold text-5xl" ref={minutesRef}>
              {minute}
            </p>
            <p className="text-gray-500">Minutes</p>
          </div>
          <p className="font-bold text-5xl">:</p>
          <div className="flex items-center flex-col">
            <p className="font-bold text-5xl" ref={secondsRef}>
              {second}
            </p>
            <p className="text-gray-500">Seconds</p>
          </div>
        </div>
        <Link to="/products">
          <button className="bg-app-green px-6 py-2 text-white rounded-3xl text-lg font-medium">
            Shop Now <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </Link>
      </div>
      <div className="bg-[url('assets/package.jpg')] py-12 rounded-xl w-1/2 bg-cover"></div>
    </div>
  );
};

export default SaleBanner;
