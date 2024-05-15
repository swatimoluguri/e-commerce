import { clearCart } from "../../utils/CartSlice";
import { useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import Heading from "../Partials/Heading";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation } from "react-router-dom";
import axios from "axios";

const Success = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const paymentId = queryParams.get("payment_id");
    const fetchData = async () => {
      try {
        dispatch(clearCart());
        const response = await axios.post("/order-details", {
          paymentId,
        });
        setOrder(response.data.result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    order && (
      <div className="flex flex-col">
        <div className="flex flex-col items-center bg-[url('assets/bg.jpg')] bg-cover	">
          <Heading text="Order Completed" heading="" highlight="" />
        </div>
        <div className="flex flex-col items-center ">
          <FontAwesomeIcon
            className="text-app-yellow text-4xl mt-10"
            icon={faCheckCircle}
          />
          <h1 className="text-2xl font-bold mt-4">Your Order #{order.order_id} is placed! </h1>
          <h2 className="text-gray-500">
            The order will reach you shortly. Thank you
          </h2>
        </div>
      </div>
    )
  );
};
export default Success;
