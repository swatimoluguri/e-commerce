import ProductCard from "./ProductCard";
import { useState } from "react";

const Collections = () => {
    const [active, setActive] = useState(null);

  const list = [
    "All Products",
    "High Rated",
    "Men's Clothing",
    "Women's Clothing",
    "Jewellery",
    "Electronics",
  ];
  const handleActive=((e)=>{
    setActive(e);
  })
  return (
    <div className="flex flex-col items-center mt-12">
      <div className="flex items-center my-6">
        <div className=" bg-app-yellow h-1 w-8 rounded-xl mx-7"></div>
        <div className="font-medium text-3xl">Our Products</div>
        <div className=" bg-app-yellow h-1 w-8 rounded-xl mx-7"></div>
      </div>
      <div>
        <h2 className="text-5xl font-bold mb-10">
          Our <span className="text-app-green">Products Collections</span>
        </h2>
      </div>
      <div className="flex gap-8 mb-10">
        {list.map((val) => (
          <div className={`cursor-pointer px-4 py-2 border-gray-400 border rounded-full ${active===val && 'bg-app-green text-white border-none border-app-green'}`} onClick={()=>handleActive(val)}>
            {val}
          </div>
        ))}
      </div>
      <div>
        <ProductCard />
      </div>
    </div>
  );
};
export default Collections;
