import Heading from "../Partials/Heading";
import DetailsStrip from "../Partials/DetailsStrip";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import Logout from "../../assets/logout.png";
import { clearCart } from "../../utils/CartSlice";
import { clearUser } from "../../utils/UserSlice";
import Search from "../../assets/search.png";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const UserAccount = () => {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/account-details");
        setUser(response.data);
      } catch (error) {
        if (error.response && error.response.status === 403) {
          dispatch(clearUser());
          dispatch(clearCart());
          navigate("/");
        }
      }
    };
    fetchData();
  }, []);

  const handleLogout = () => {
    dispatch(clearUser());
    dispatch(clearCart());
    navigate("/");
  };

  return (
    <div>
      {user ? (
        <div className="flex flex-col">
          <div className="flex flex-col items-center bg-[url('assets/bg.jpg')] bg-cover">
            <Heading text="My Account" heading="" highlight="" />
          </div>
          <div className="flex justify-center flex-col items-center gap-5">
            <h1 className="font-bold text-4xl mt-5 ">{user.name}</h1>
            <h2 className="text-gray-500">{user.email}</h2>
          </div>
          <div className="flex lg:flex-row flex-col mx-2 lg:mx-20 xl:mx-40 gap-1 lg:gap-10 mt-10 ">
            <div className="mx-auto w-full lg:w-1/4 flex flex-row lg:flex-col justify-around lg:justify-start gap-10">
              <div className="cursor-pointer flex items-center justify-center gap-2 lg:gap-4 bg-app-yellow hover:bg-app-dark-yellow px-2 py-2 lg:px-3 lg:py-6 rounded-full">
                <img className="w-6" src={Search} alt="Search" />
                <p className="font-bold">My Orders</p>
              </div>
              <div
                onClick={handleLogout}
                className="cursor-pointer flex items-center justify-center gap-4 bg-app-yellow hover:bg-app-dark-yellow px-2 py-2 lg:px-3 lg:py-6  rounded-full"
              >
                <img
                  className="w-6 cursor-pointer"
                  src={Logout}
                  alt="User Sign In"
                />
                <p className="font-bold">Log Out</p>
              </div>
            </div>

            {user.orders.length > 0 ? (
              user.orders.map((order) => (
                <div className="lg:mt-0 mt-10 w-full lg:w-3/4 lg:h-128 overflow-y-scroll">
                  <div key={order.order_id}>
                    <div className="w-5/6 mx-auto bg-app-yellow rounded-xl flex justify-around py-4">
                      <div className="flex flex-col">
                        <p className="text-app-green">Order Id</p>
                        <h3 className="font-semibold">
                          #{order.order_id.split("_")[1]}
                        </h3>
                      </div>
                      <div className="flex flex-col">
                        <p className="text-app-green">Amount</p>
                        <h3 className="font-semibold">₹{order.amount}</h3>
                      </div>
                      <div className="flex flex-col">
                        <p className="text-app-green">Transaction Id</p>
                        <h3 className="font-semibold">
                          {order.razorpay_payment_id.split("_")[1]}
                        </h3>
                      </div>
                    </div>
                    <div className="w-5/6 mx-auto mt-2 rounded-xl border border-gray-200 p-4 mb-10">
                      <p className="font-semibold border-b border-gray pb-4">
                        Order Details
                      </p>
                      <table className="w-full my-5">
                        <thead>
                          <tr>
                            <th className="text-left">Products</th>
                            <th>Sub Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {order.items.map((item, index) => (
                            <tr
                              key={index}
                              className="border-b border-gray-200"
                            >
                              <td className="p-3 flex items-center gap-6">
                                <Link to={"/products/" + item._id}>
                                  <div className="h-20 w-15 rounded-3xl">
                                    <img
                                      className="object-contain w-full h-full rounded-3xl"
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
                            <td className="text-green-400 text-right p-2">
                              Free
                            </td>
                          </tr>
                          <tr>
                            <td className="font-bold text-right text-xl p-2">
                              Total
                            </td>
                            <td className="font-bold text-right text-xl p-2">
                              ₹{order.amount}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center lg:mt-0 mt-10 w-full lg:w-3/4 lg:h-128">
                <h1 className="text-xl my-4">No orders yet ! </h1>
                <Link to="/products">
                  <h2 className=" w-fit px-4 py-2 mx-auto text-xl bg-app-green text-white font-semibold rounded-lg">
                    Browse More
                  </h2>
                </Link>
              </div>
            )}
          </div>
          <DetailsStrip />
        </div>
      ) : (
        <div className="h-screen flex items-center justify-center">
          Loading...
        </div>
      )}
    </div>
  );
};

export default UserAccount;
