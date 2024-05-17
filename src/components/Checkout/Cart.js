import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Heading from "../Partials/Heading";
import { updateItem, deleteItem, clearCart } from "../../utils/CartSlice";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import DetailsStrip from "../Partials/DetailsStrip";
import EmptyCart from "../../assets/empty-cart.jpg";
import axios from "axios";
import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const [cartTotal, setCartTotal] = useState(0);
  const [cartItems, setCartItems] = useState(0);
  const cart = useSelector((store) => store.cart);
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  const cartTotalAmt = useMemo(() => {
    return cart.cart.items.reduce((acc, item) => {
      return acc + Math.round(item.price * 84) * item.count;
    }, 0);
  }, [cart.cart.items]);

  const cartItemsCount = useMemo(() => {
    return cart.cart.items.reduce((acc, item) => {
      return acc + item.count;
    }, 0);
  }, [cart.cart.items]);

  useEffect(() => {
    setCartTotal(cartTotalAmt);
    setCartItems(cartItemsCount);
  }, [cartTotalAmt, cartItemsCount]);

  async function handleReduceCount(id) {
    let item = {};
    item.id = id;
    item.updateType = "reduce";
    dispatch(updateItem(item));
    if (user?.user?.username?.length > 0)
      await axios.post("/reduce-cart", {
        id,
      });
  }

  async function handleAddCount(id) {
    let item = {};
    item.id = id;
    item.updateType = "add";
    dispatch(updateItem(item));
    if (user?.user?.username?.length > 0)
      await axios.post("/increase-cart", {
        id,
      });
  }

  async function handleDelete(id) {
    dispatch(deleteItem(id));
    if (user?.user?.username?.length > 0)
      await axios.post("/delete-cart", {
        id,
      });
  }

  async function handleClearCart() {
    dispatch(clearCart());
    if (user?.user?.username?.length > 0) await axios.get("/clear-cart");
  }

  async function handleCheckout() {
    const {
      data: { id },
    } = await axios.post("/checkout", {
      cart,
      amount: cartTotal,
    });

    var options = {
      key: "rzp_test_vorhZ7wKh3AFzX",
      amount: cartTotal * 100,
      currency: "INR",
      name: "Swati",
      description: "Test",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRY7zpT4pHNb8LZfnaP0xI7FYTkiZaYfPUhEaV1scVsQ&s",
      order_id: id,
      callback_url: "/checkout/payment-verification",
      prefill: {
        name: "Gaurav Kumar",
        email: "gaurav.kumar@example.com",
        contact: "9000090000",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    var rzp1 = new window.Razorpay(options);
    rzp1.open();
  }
  return (
    <div>
      <div className="flex flex-col items-center bg-[url('assets/bg.jpg')] bg-cover	">
        <Heading text="Shopping Cart" heading="" highlight="" />
      </div>
      {cart.cart.items.reduce((acc, item) => {
        acc += item.count;
        return acc;
      }, 0) > 0 ? (
        <div className="flex xl:flex-row flex-col my-12 mx-auto xl:mx-24 justify-around">
          <div className="w-11/12 xl:w-1/2 xl:mx-0 mx-auto">
            <table className="w-full ">
              <thead>
                <tr className="bg-app-yellow text-md xl:text-lg font-semibold text-center">
                  <td className="rounded-l-lg p-3">Product</td>
                  <td className=" p-3">Price</td>
                  <td className="p-3">Quantity</td>
                  <td className=" p-3">Subtotal</td>
                  <td className="rounded-r-lg p-3"></td>
                </tr>
              </thead>
              <tbody>
                {cart.cart.items.map((item, index) => (
                  <tr key={index} className="border-b border-gray-200">
                    <td className="p-2 xl:p-3 flex items-center gap-2 xl:gap-6">
                      <Link to={"/products/" + item._id} key={item._id}>
                        <div className=" h-16 w-14 xl:h-28 xl:w-20 rounded-lg xl:rounded-3xl">
                          <img
                            className="object-contain w-full h-full rounded-lg xl:rounded-3xl"
                            src={item.image}
                            alt={item._id}
                          />
                        </div>
                      </Link>
                      {item.title}
                    </td>
                    <td className=" p-2 xl:p-3 text-right">
                      ₹{Math.round(item.price * 84)}
                    </td>
                    <td className="p-2 xl:p-3 ">
                      <div className="w-fit border border-gray-200 rounded-full flex items-center text-black  gap-2 xl:gap-5">
                        <div
                          className="cursor-pointer border-r border-gray-200 px-2 py-1 xl:px-4 xl:py-2"
                          onClick={() => handleReduceCount(item.id)}
                        >
                          -
                        </div>
                        <div>{item.count}</div>
                        <div
                          className="cursor-pointer border-l border-gray-200 px-2 py-1 xl:px-4 xl:py-2"
                          onClick={() => handleAddCount(item.id)}
                        >
                          +
                        </div>
                      </div>
                    </td>
                    <td className="p-2 xl:p-3 text-right">
                      ₹{Math.round(item.price * 84) * item.count}
                    </td>
                    <td className="p-2 xl:p-3">
                      <div
                        className="cursor-pointer"
                        onClick={() => handleDelete(item.id)}
                      >
                        <FontAwesomeIcon
                          key={index}
                          className="text-app-green"
                          icon={faTrash}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="text-red-500 text-right mt-4 text-sm">Max Quantity for each product is 5</div>
            <div className="flex items-center justify-between mt-10">
              <div>
                <Link to="/products">
                  <h2 className=" w-fit px-4 py-2 text-xl bg-app-green text-white font-semibold rounded-lg">
                    Browse More
                  </h2>
                </Link>
              </div>
              <div
                className="text-right  text-app-green cursor-pointer"
                onClick={handleClearCart}
              >
                Clear Cart
              </div>
            </div>
          </div>
          <div className="mt-10 mx-auto xl:mx-0 xl:mt-0 w-9/12 xl:w-1/4 border-2 p-4 border-gray-200 rounded-lg">
            <p className="text-lg font-semibold">Order Summary</p>
            <hr className="my-4" />
            <table className="w-full">
              <tr>
                <th className="text-left p-2">Items</th>
                <td className="text-right p-2">{cartItems}</td>
              </tr>
              <tr>
                <th className="text-left p-2">Sub Total</th>
                <td className="text-right p-2">
                  ₹
                  {cart.cart.items.reduce((acc, item) => {
                    acc += Math.round(item.price * 84) * item.count;
                    return acc;
                  }, 0)}
                </td>
              </tr>
              <tr>
                <th className="text-left p-2">Shipping</th>
                <td className="text-green-400 text-right p-2">Free</td>
              </tr>
            </table>
            <hr className="my-4" />
            <div className="flex justify-between p-4">
              <div>Total</div>
              <div>₹{cartTotal}</div>
            </div>
            <div
              onClick={() =>
                user?.user?.username?.length > 0
                  ? handleCheckout()
                  : navigate("/signin")
              }
              className="cursor-pointer bg-app-green text-white w-fit px-4 py-2 text-lg font-semibold rounded-full mx-auto my-4"
            >
              Proceed to Checkout
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <h1 className="text-xl my-4">Your cart is empty ! </h1>
          <Link to="/products">
            <h2 className=" w-fit px-4 py-2 mx-auto text-xl bg-app-green text-white font-semibold rounded-lg">
              Browse More
            </h2>
          </Link>
          <div className="h-96 mx-auto">
            <img
              className="object-contain w-full h-full"
              src={EmptyCart}
              alt="Empty cart"
            />
          </div>
          <hr className="my-4" />
        </div>
      )}
      <DetailsStrip />
    </div>
  );
};
export default Cart;
