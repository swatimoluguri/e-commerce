import Clothes from "../../assets/clothes.jpg";
import Heading from "../Partials/Heading";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import bcrypt from "bcryptjs";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {addUser} from "../../utils/UserSlice";
import { useSelector } from "react-redux";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  useEffect(() => {
    if (user.user.length > 0) navigate("/");
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    const hashedPassword = await bcrypt.hash(formData.password, 10);
    const userData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: hashedPassword,
    };
    const response = await axios.post("/sign-up", {
      formData: userData,
    });
    dispatch(addUser(formData.firstName+' '+formData.lastName));
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    });
    navigate(response.data.redirect);
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col items-center bg-[url('assets/bg.jpg')] bg-cover	">
        <Heading text="Sign Up" heading="" highlight="" />
      </div>
      <div className="flex justify-around p-4 ">
        <div className="flex flex-col w-1/3 gap-3">
          <div>
            <h1 className="font-bold text-2xl">Sign Up</h1>
          </div>
          <div>
            <p className="text-gray-500">
              Fill your information below or register with your social media
              account.
            </p>
          </div>
          <form onSubmit={handleSignUp}>
            <div className="flex gap-4 mt-6 w-full justify-between">
              <div className="flex-col w-1/2">
                <label className="font-bold" for="firstname">
                  First Name <sup>*</sup>
                </label>
                <input
                  className="border-gray-200 border rounded-full px-4 py-2 my-2 w-full"
                  type="text"
                  placeholder="Enter First Name"
                  onChange={handleChange}
                  value={formData.firstName}
                  name="firstName"
                />
              </div>
              <div className="flex-col w-1/2">
                <label className="font-bold" for="lastname">
                  Last Name <sup>*</sup>
                </label>
                <input
                  className="border-gray-200 border rounded-full px-4 py-2 my-2 w-full"
                  type="text"
                  placeholder="Enter Last Name"
                  onChange={handleChange}
                  value={formData.lastName}
                  name="lastName"
                />
              </div>
            </div>
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
              <input type="checkbox" />
              <span className="ml-4 font-bold">
                I agree with Terms & Conditions and Privacy Policy
              </span>
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-app-green text-white px-4 py-3 rounded-full my-4 hover:bg-app-dark-green"
              >
                Sign Up
              </button>

              <hr />
              {/* <p className="my-4 text-gray-500">Sign Up with</p>
              <p>Google Sign Up</p> */}
              <p className="font-bold my-4">
                Already have an account?{" "}
                <Link className="text-app-green hover:underline " to="/signin">
                  Sign In
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
export default Signup;
