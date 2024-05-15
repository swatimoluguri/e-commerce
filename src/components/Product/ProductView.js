import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import DetailsStrip from "../Partials/DetailsStrip";
import Heading from "../Partials/Heading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faStar as solidStar,
  faStarHalfAlt,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import RelatedProducts from "./RelatedProducts";
import { useDispatch } from "react-redux";
import { addItem } from "../../utils/CartSlice";
import { useSelector } from "react-redux";
import axios from "axios";

const ProductView = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [count, setCount] = useState(1);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const user = useSelector((store) => store.user);

  useEffect(() => {
    fetchProduct(productId);
  }, [productId]);

  useEffect(() => {
    const scrollToTop = () => {
      const c = document.documentElement.scrollTop || document.body.scrollTop;
      if (c > 0) {
        window.requestAnimationFrame(scrollToTop);
        window.scrollTo(0, c - c / 8);
      }
    };
    scrollToTop();
  }, [productId]);

  const fetchProduct = (productId) => {
    fetch("/products/" + productId)
      .then((res) => res.json())
      .then((result) => {
        setProduct(result);
        setLoading(false);
      })
      .catch((err) => console.log("Error fetching product:", err));
  };

  function handleReduceCount() {
    if (count > 1) setCount((prevCount) => prevCount - 1);
  }

  function handleAddCount() {
    if (count < 5) setCount((prevCount) => prevCount + 1);
  }

  async function handleAddToCart() {
    let item = Object.fromEntries(
      Object.entries(product).filter(([key]) => key !== "relProds")
    );
    item.count = count;
    dispatch(addItem(item));
    if (user?.user?.username?.length > 0) {
      await axios.post("/add-cart", {
        item,
      });
    }
  }

  function handleAddToFav() {}

  return (
    <div>
      {loading ? (
        <div className="h-screen">
          <div className="flex flex-col items-center bg-[url('assets/bg.jpg')] bg-cover	">
            <Heading text="" heading="" highlight="" />
          </div>
          <div className="h-screen flex items-center justify-center">
            Loading...
          </div>
        </div>
      ) : (
        <div>
          <div className="flex flex-col items-center bg-[url('assets/bg.jpg')] bg-cover	">
            <Heading text={product.category} heading="" highlight="" />
          </div>
          <div className="flex mt-12 mx-24 justify-around">
            <div className="h-128 w-1/2 bg-gray-100 p-8 rounded-3xl">
              <img
                className="object-contain w-full h-full rounded-3xl"
                src={product.image}
                alt={product._id}
              />
            </div>
            <div className="w-1/2 flex flex-col ml-10 gap-4 ">
              <p className="text-gray-500">{product.category}</p>
              <div className="flex items-center">
                <h1 className="w-2/3 text-xl font-bold">{product.title}</h1>
                <div className="mx-4 rounded-full border border-green-500 text-green-500 bg-green-50 px-2 py-1">
                  In Stock
                </div>
              </div>
              <div className="flex items-center">
                {[...Array(5)].map((_, index) => {
                  let starIcon;
                  if (index < parseInt(product.rating.rate)) {
                    starIcon = solidStar;
                  } else if (index - parseInt(product.rating.rate) < 0.5) {
                    starIcon = faStarHalfAlt;
                  } else {
                    starIcon = regularStar;
                  }
                  return (
                    <FontAwesomeIcon
                      key={index}
                      className="text-app-yellow"
                      icon={starIcon}
                    />
                  );
                })}
                <p className="font-semibold px-2">
                  {product.rating.rate}{" "}
                  <span className="text-gray-500 font-normal">
                    ({product.rating.count} Reviews)
                  </span>
                </p>
              </div>
              <div>
                <h1 className="text-4xl font-bold">
                  ₹{Math.round(product.price * 84)}
                </h1>
              </div>
              <div className="w-2/3 text-gray-500 text-justify">
                <p>{product.description}</p>
              </div>
              <div className="flex items-center gap-5 mt-4">
                <div className="border border-gray-200 rounded-full flex items-center text-black font-bold text-lg gap-5">
                  <div
                    className="cursor-pointer border-r border-gray-200 px-4 py-2"
                    onClick={handleReduceCount}
                  >
                    -
                  </div>
                  <div>{count}</div>
                  <div
                    className="cursor-pointer border-l border-gray-200 px-4 py-2"
                    onClick={handleAddCount}
                  >
                    +
                  </div>
                </div>
                <div
                  className="flex items-center cursor-pointer hover:bg-app-dark-green rounded-full bg-app-green text-white px-4 py-2"
                  onClick={handleAddToCart}
                >
                  <FontAwesomeIcon
                    className="text-app-yellow mr-2"
                    icon={faShoppingCart}
                  />
                  Add to Cart
                </div>
                <div
                  className="flex items-center cursor-pointer hover:bg-app-dark-yellow bg-app-yellow text-black rounded-full  px-4 py-2"
                  onClick={handleAddToFav}
                >
                  <FontAwesomeIcon
                    className="text-app-green mr-2"
                    icon={faHeart}
                  />
                  <p>Add to Fav</p>
                </div>
              </div>
            </div>
          </div>
          <RelatedProducts products={product.relProds} />
          <DetailsStrip />
        </div>
      )}
    </div>
  );
};
export default ProductView;
