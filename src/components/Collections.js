import ProductCard from "./ProductCard";
import { useState } from "react";

const Collections = () => {
  const [active, setActive] = useState("All Products");

  const list = [
    "All Products",
    "High Rated",
    "Men's Clothing",
    "Women's Clothing",
    "Jewellery",
    "Electronics",
  ];
  const handleActive = (e) => {
    setActive(e);
  };
  return (
    <div className="flex flex-col items-center">
      <div className="flex gap-8 mb-10">
        {list.map((val) => (
          <div
            key={val}
            className={`cursor-pointer px-4 py-2 border-gray-400 border rounded-full ${
              active === val &&
              "bg-app-green text-white border-none border-app-green"
            }`}
            onClick={() => handleActive(val)}
          >
            {val}
          </div>
        ))}
      </div>
      <div>
        <ProductCard filter={active}/>
      </div>
    </div>
  );
};
export default Collections;
