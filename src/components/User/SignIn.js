import Clothes from "../../assets/clothes.jpg";
import Heading from "../Partials/Heading";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";

const SignIn = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    const response = await axios.post("http://localhost:3000/sign-in", {
      formData,
    });
    console.log(response);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
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
              <label className="font-bold w-full" for="email">
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
              <label className="font-bold w-full" for="password">
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
                Sign Up
              </button>
              <hr />
              <p className="font-bold my-4">
                <Link className="text-app-green hover:underline " to="/signin">
                  Forgot Password?
                </Link>
              </p>
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
