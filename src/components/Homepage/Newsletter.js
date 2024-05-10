import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
const Newsletter = () => {
  return (
    <div className="flex flex-col items-center gap-10 mb-12">
      <p className="text-gray-500 text-lg">
        Get 20% off on your first order just by subscribing to our newsletter.
      </p>
      <div className="flex gap-10">
        <div className="flex items-center rounded-full border border-gray-300 text-gray-500 pl-2 bg-white">
          <div className="bg-app-green rounded-full py-2 px-4">
            <FontAwesomeIcon className="text-app-yellow" icon={faEnvelope} />
          </div>
          <p className="ml-4 mr-24">Enter Email Address</p>
        </div>
        <button className="rounded-full bg-app-yellow py-4 px-8 font-semibold">
          Subscribe
        </button>
      </div>
    </div>
  );
};
export default Newsletter;
