import React, { useState, useEffect,useRef } from "react";
import {
  faCalendar,
  faHome,
  faTrophy,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Awards = () => {
  const [currentYears, setCurrentYears] = useState(0);
  const [currentCustomer, setCurrentCustomer] = useState(0);
  const [currentStores, setCurrentStores] = useState(0);
  const [currentAwards, setCurrentAwards] = useState(0);
  const awardsRef = useRef(null);
  const duration = 500;
  const targetValues = [
    { target: 12, stateSetter: setCurrentYears },
    { target: 100, stateSetter: setCurrentCustomer },
    { target: 180, stateSetter: setCurrentStores },
    { target: 35, stateSetter: setCurrentAwards },
  ];

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        const intervals = targetValues.map(({ target, stateSetter }) => {
          const increment = target / duration;
          return setInterval(() => {
            stateSetter((prevState) => {
              const newValue = prevState + increment;
              return newValue >= target ? target : newValue;
            });
          }, 0.1);
        });

        return () => {
          intervals.forEach(clearInterval);
        };
      }
    }, options);

    if (awardsRef.current) {
      observer.observe(awardsRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [duration, targetValues]);

  return (
    <div
      ref={awardsRef}
      className="flex justify-around bg-app-yellow py-8 my-8"
    >
      <div className="flex justify-center items-center gap-4">
        <div className="text-6xl">
          <FontAwesomeIcon className="text-app-green" icon={faCalendar} />
        </div>
        <div className="flex flex-col text-center">
          <p className="text-4xl font-bold">{Math.round(currentYears)}+</p>
          <p>Years</p>
        </div>
      </div>
      <div className="flex justify-center items-center gap-4">
        <div className="text-6xl">
          <FontAwesomeIcon className="text-app-green" icon={faUser} />
        </div>
        <div className="flex flex-col text-center">
          <p className="text-4xl font-bold">{Math.round(currentCustomer)}M+</p>
          <p>Happy Customers</p>
        </div>
      </div>
      <div className="flex justify-center items-center gap-4">
        <div className="text-6xl">
          <FontAwesomeIcon className="text-app-green" icon={faHome} />
        </div>
        <div className="flex flex-col text-center">
          <p className="text-4xl font-bold">{Math.round(currentStores)}+</p>
          <p>Stores</p>
        </div>
      </div>
      <div className="flex justify-center items-center gap-4">
        <div className="text-6xl">
          <FontAwesomeIcon className="text-app-green" icon={faTrophy} />
        </div>
        <div className="flex flex-col text-center">
          <p className="text-4xl font-bold">{Math.round(currentAwards)}+</p>
          <p>Awards</p>
        </div>
      </div>
    </div>
  );
};
export default Awards;
