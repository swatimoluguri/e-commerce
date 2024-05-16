import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ filter }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts(filter);
  }, [filter]);

  const fetchProducts = (filter) => {
    fetch("/category/" + filter)
      .then((res) => res.json())
      .then((result) => {
        setProducts(result);
        setLoading(false);
      })
      .catch((err) => console.log("Error fetching category:", err));
  };
  return (
    <div>
      {loading ? (
        <div className="h-screen flex items-center justify-center">Loading...</div> 
      ) : (
        <div className="flex flex-wrap gap-4 lg:gap-8 pb-8 mx-6 lg:mx-20 justify-around md:justify-center">
          {products.map((item) => (
            <Link to={"/products/" + item._id} key={item._id}>
              <div
                key={item._id}
                className="w-52 md:w-80 border border-gray-50 shadow-lg flex flex-col rounded-3xl overflow-hidden cursor-pointer transform transition-transform duration-300 hover:scale-105"
              >
                <div className="h-48 md:h-64 p-3">
                  <img
                    className="object-contain w-full h-full rounded-3xl"
                    src={item.image}
                    alt={item.title}
                  />
                </div>
                <div className="flex flex-col justify-between h-full">
                  <div className="px-4 flex-grow">
                    <div className="flex justify-between items-center py-1">
                      <p className="text-gray-500 md:text-lg text-xs overflow-hidden whitespace-nowrap text-ellipsis">{item.category}</p>
                      <div className="flex items-center">
                        <FontAwesomeIcon
                          className="text-app-yellow"
                          icon={faStar}
                        />
                        <p className="md:text-lg text-xs font-semibold md:px-2 px-1">
                          {item.rating.rate} ({item.rating.count}+)
                        </p>
                      </div>
                    </div>
                    <h1 className="py-1 md:py-2 font-semibold text-md md:text-xl overflow-hidden whitespace-nowrap text-ellipsis">
                      {item.title}
                    </h1>
                  </div>
                  <div className="px-4 pb-2 md:pb-4">
                    <h2 className="font-semibold text-xl md:text-2xl">
                      ₹{Math.round(item.price * 84)}
                    </h2>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
export default ProductCard;
