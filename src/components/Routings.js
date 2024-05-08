import { Routes, Route } from "react-router-dom";
import Homepage from "./Homepage";
import Products from "./Products";
import ProductView from "./ProductView";
import Signup from "./Signup";
import Cart from "./Cart";

const Routings = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/products" element={<Products/>} />
      <Route path="/products/:productId" element={<ProductView/>} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  );
};
export default Routings;
