import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";


const ProductCard = ({ filter }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts(filter);
  }, [filter]);

  const fetchProducts = (filter) => {
    fetch("http://localhost:3000/category/" + filter)
      .then((res) => res.json())
      .then((result) => {
        setProducts(result);
      })
      .catch((err) => console.log("Error fetching category:", err));
  };
  return (
    <div className="flex flex-wrap gap-8 pb-8 mx-20 justify-center">
      {products.map((item) => (
        <Link
        to={"/products/" + item._id}
        key={item._id}
      >
        <div
          key={item._id}
          className="w-80 shadow-lg flex flex-col rounded-3xl overflow-hidden cursor-pointer transform transition-transform duration-300 hover:scale-105"
        >
          <div className="h-64 p-3">
            <img
              className="object-contain w-full h-full rounded-3xl"
              src={item.image}
              alt={item.title}
            />
          </div>
          <div className="flex flex-col justify-between h-full">
            <div className="px-4 flex-grow">
              <div className="flex justify-between items-center py-1">
                <p className="text-gray-500">{item.category}</p>
                <div className="flex items-center">
                  <FontAwesomeIcon className="text-app-yellow" icon={faStar} />
                  <p className="font-semibold px-2">
                    {item.rating.rate} ({item.rating.count}+)
                  </p>
                </div>
              </div>
              <h1 className="py-2 font-semibold text-xl overflow-hidden whitespace-nowrap text-ellipsis">
                {item.title}
              </h1>
            </div>
            <div className="px-4 pb-4">
              <h2 className="font-semibold text-2xl">
                ₹{Math.round(item.price * 84)}
              </h2>
            </div>
          </div>
        </div>
        </Link>
      ))}
    </div>
  );
};
export default ProductCard;
