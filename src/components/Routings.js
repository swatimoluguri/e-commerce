import { Routes, Route } from "react-router-dom";
import Homepage from "./Homepage";
import Products from "./Products";
import Signup from "./Signup";

const Routings = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/products" element={<Products />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
};
export default Routings;
