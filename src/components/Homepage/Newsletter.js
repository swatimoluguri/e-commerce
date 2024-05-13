import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import axios from "axios";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const validateEmail = (inputValue) => {
    if (inputValue) {
      setIsValidEmail(
        inputValue.match(
          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ) !== null
      );
    } else {
      setIsValidEmail(false);
    }
  };

  const handleInputChange = (e) => {
    setEmail(e.target.value);
    validateEmail(e.target.value);
  };

  const handleNewsletter = async (e) => {
    e.preventDefault();

    const response = await axios.post("/newsletter", {
      email,
    });
    if (response.status === 200) {
      setIsSubscribed(true);
    }
  };

  return (
    <div className="flex flex-col items-center gap-10 mb-12">
      <p className="text-gray-500 text-lg">
        Get 20% off on your first order just by subscribing to our newsletter.
      </p>
      {isSubscribed ? (
        <h1 className="text-2xl font-bold">
          Thank You for subscribing to our newsletters. We assure we won't spam
          you.
        </h1>
      ) : (
        <form onSubmit={handleNewsletter}>
          <div className="flex gap-10">
            <div
              className={`flex items-center rounded-full border ${
                isValidEmail ? "border-green-500" : "border-red-500"
              } text-gray-500 pl-2 bg-white`}
            >
              <div className="bg-app-green rounded-full py-2 px-4">
                <FontAwesomeIcon
                  className="text-app-yellow"
                  icon={faEnvelope}
                />
              </div>
              <input
                className="ml-4 mr-24 focus:outline-none"
                placeholder="Enter Email Address"
                value={email}
                onChange={handleInputChange}
              />
            </div>
            <button className="rounded-full  bg-app-yellow py-4 px-8 font-semibold">
              Subscribe
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Newsletter;
