import { Routes, Route } from "react-router-dom";
import Homepage from "./Homepage";
import ProductCard from "./ProductCard";
import ProductView from "./ProductView";
import Signup from "./Signup";

const Routings = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/products" element={<ProductCard filter="All Products"/>} />
      <Route path="/products/:productId" element={<ProductView/>} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
};
export default Routings;
