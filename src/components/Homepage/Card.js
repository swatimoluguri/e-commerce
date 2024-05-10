import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const Card = ({src,desc,price}) => {
  return (
    <div key={src} className="flex items-center rounded-2xl bg-white shadow-sm h-112 w-full">
      <div className="p-2 mx-auto">
      <div className="rounded-2xl shadow-lg overflow-hidden">
      <img
        className="rounded-lg h-80 w-96 object-contain"
        src={src}
        alt="jacket"
      />
    </div>
        <div className="flex pt-4 justify-between items-center">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold">{desc}</h1>
            <p className="text-gray-500 font-medium">₹ {price}</p>
          </div>
          <div>
            <button className="h-12 w-12 rounded-3xl bg-app-green">
              <FontAwesomeIcon className="text-app-yellow -rotate-45" icon={faArrowRight} />
              </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Card;
