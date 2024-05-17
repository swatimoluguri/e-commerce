import { clearCart } from "../../utils/CartSlice";
import { useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import Heading from "../Partials/Heading";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import DetailsStrip from "../Partials/DetailsStrip";

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
        const response = await axios.post("/server/order-details", {
          paymentId,
        });
        const givenDate = new Date(response.data.result.order_date);
        givenDate.setDate(givenDate.getDate() + 5);
        let day = givenDate.getUTCDate();
        let month = givenDate.getUTCMonth() + 1;
        let year = givenDate.getUTCFullYear();
        day = day < 10 ? "0" + day : day;
        month = month < 10 ? "0" + month : month;
        response.data.result.order_date = `${day}-${month}-${year}`;
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
            className="text-app-yellow text-6xl mt-10"
            icon={faCheckCircle}
          />
          <h1 className="text-xl md:text-2xl font-bold mt-4">
            Your Order #{order.order_id.split("_")[1]} is placed!{" "}
          </h1>
          <h2 className="text-gray-500">
            The order will reach you shortly. Thank you
          </h2>
        </div>
        <div className="mt-10 w-5/6 mx-auto bg-app-yellow rounded-xl flex justify-around py-4 md:text-lg text-xs">
          <div className="flex flex-col ">
            <p className="text-app-green">Order Id</p>
            <h3 className="font-semibold">#{order.order_id.split("_")[1]}</h3>
          </div>
          <div className=" flex-col md:flex hidden">
            <p className="text-app-green">Amount</p>
            <h3 className="font-semibold">₹{order.amount}</h3>
          </div>
          <div className="flex flex-col">
            <p className="text-app-green">Transanction Id</p>
            <h3 className="font-semibold">
              {order.razorpay_payment_id.split("_")[1]}
            </h3>
          </div>
          <div className="flex flex-col">
            <p className="text-app-green">Estimated Delivery</p>
            <h3 className="font-semibold">{order.order_date}</h3>
          </div>
        </div>
        <div className="w-5/6 mx-auto mt-10 rounded-xl border border-gray-200 p-4 mb-10">
          <p className="font-semibold border-b border-gray pb-4">
            Order Details
          </p>
          <table className="w-full my-5">
            <tr>
              <th className="text-left">Products</th>
              <th>Sub Total</th>
            </tr>
            {order.items.map((item, index) => (
              <tr key={index} className="border-b border-gray-200">
                <td className="p-3 flex items-center gap-6">
                  <Link to={"/products/" + item._id} key={item._id}>
                    <div className="h-16 w-14 xl:h-28 xl:w-20 rounded-lg xl:rounded-3xl">
                      <img
                        className="object-contain w-full h-full rounded-lg xl:rounded-3xl"
                        src={item.image}
                        alt={item._id}
                      />
                    </div>
                  </Link>
                  {item.title} X {item.count}
                </td>

                <td className="p-3 text-right">
                  ₹{Math.round(item.price * 84) * item.count}
                </td>
              </tr>
            ))}
            <tr className="border-b text-right border-gray-200">
              <td>Shipping</td>
              <td className="text-green-400 text-right p-2">Free</td>
            </tr>
            <tr>
              <td className="font-bold text-right text-xl p-2">Total</td>
              <td className="font-bold text-right text-xl p-2">
                ₹{order.amount}
              </td>
            </tr>
          </table>
        </div>
        <DetailsStrip />
      </div>
    )
  );
};
export default Success;
