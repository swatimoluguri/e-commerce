import { Routes, Route, Navigate } from "react-router-dom";
import Homepage from "../Homepage/Homepage";
import Products from "../Product/Products";
import ProductView from "../Product/ProductView";
import Signup from "../User/Signup";
import SignIn from "../User/SignIn";
import Cart from "../Checkout/Cart";
import Failed from "../Checkout/Failed";
import Success from "../Checkout/Success";
import Contact from "../Contact/Contact";
import About from "../Contact/About";
import ForgotPassword from "../User/ForgotPassword";

const Routings = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/:productId" element={<ProductView />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/success" element={<Success />} />
      <Route path="/failed" element={<Failed />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/about" element={<About />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
    </Routes>
  );
};
export default Routings;
