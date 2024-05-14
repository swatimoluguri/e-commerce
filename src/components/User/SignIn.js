import Clothes from "../../assets/clothes.jpg";
import Heading from "../Partials/Heading";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../../utils/UserSlice";
import { useSelector } from "react-redux";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setError(null);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    await axios
      .post("/sign-in", {
        formData,
      })
      .then((response) => {
        dispatch(addUser(response.data.username));
        setFormData({
          email: "",
          password: "",
        });
        setError(null);
        navigate(response.data.redirect);
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          setError(error.response.data.message);
        }
      });
  };
  return (
    <div className="flex flex-col">
      <div className="flex flex-col items-center bg-[url('assets/bg.jpg')] bg-cover	">
        <Heading text="Sign In" heading="" highlight="" />
      </div>
      <div className="flex justify-around p-4 items-center">
        <div className="flex flex-col w-1/3 gap-3">
          <div>
            <h1 className="font-bold text-2xl">Sign In</h1>
          </div>
          <div>
            <p className="text-gray-500">Sign in to your account.</p>
          </div>
          <form onSubmit={handleSignUp}>
            <div className="w-full">
              <label className="font-bold w-full" htmlFor="email">
                Email <sup>*</sup>
              </label>
              <input
                className="border-gray-200 border rounded-full px-4 py-2 my-2 w-full"
                type="text"
                placeholder="Enter Email Address"
                onChange={handleChange}
                value={formData.email}
                name="email"
              />
            </div>
            <div>
              <label className="font-bold w-full" htmlFor="password">
                Password <sup>*</sup>
              </label>
              <input
                className="border-gray-200 border rounded-full px-4 py-2 my-2 w-full"
                type="password"
                placeholder="Enter Password"
                onChange={handleChange}
                value={formData.password}
                name="password"
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full bg-app-green text-white px-4 py-3 rounded-full my-4 hover:bg-app-dark-green"
              >
                Sign In
              </button>
              <hr />
              <div className="flex justify-between items-center">
                <p className="font-bold my-4">
                  <Link
                    className="text-app-green hover:underline "
                    to="/forgot-password"
                  >
                    Forgot Password?
                  </Link>
                </p>
                {error && <div className="text-red-500 font-bold">{error}</div>}
              </div>
            </div>
          </form>
        </div>

        <div className="w-1/3">
          <img className="rounded-2xl" src={Clothes} />
        </div>
      </div>
    </div>
  );
};
export default SignIn;
