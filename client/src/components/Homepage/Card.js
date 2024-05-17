import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Card = ({ src, desc, price, id }) => {
  return (
    <Link to={"/products/" + id} key={id}>
      <div
        key={src}
        className="flex items-center rounded-2xl bg-white shadow-sm h-80 xl:h-112 w-full"
      >
        <div className="p-2 mx-auto w-64 xl:w-96">
          <div className="rounded-2xl shadow-lg overflow-hidden">
            <img
              className="rounded-lg h-56 w-64 xl:h-80 xl:w-96 object-contain"
              src={src}
              alt="jacket"
            />
          </div>
          <div className="flex pt-1 lg:pt-4 justify-between items-center ">
            <div className="flex flex-col gap-2 w-3/4 ">
              <h1 className="text-lg xl:text-2xl font-bold overflow-hidden whitespace-nowrap text-ellipsis">{desc}</h1>
              <p className="text-gray-500 font-medium">₹ {price}</p>
            </div>
            <div>
              <button className="h-12 w-12 rounded-3xl bg-app-green">
                <FontAwesomeIcon
                  className="text-app-yellow -rotate-45"
                  icon={faArrowRight}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
export default Card;
