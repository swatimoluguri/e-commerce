import Clothes from "../../assets/clothes.jpg";
import Heading from "../Partials/Heading";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import bcrypt from "bcryptjs";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../../utils/UserSlice";
import { useSelector } from "react-redux";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const constraints = [
    "8 Digits",
    "Uppercase Alphabet",
    "Lowercase Alphabet",
    "Special Character",
    "Number",
  ];
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const cart = useSelector((store) => store.cart);
  const apiUrl = process.env.REACT_APP_API_URL || "";

  useEffect(() => {
    if (user?.user?.username?.length > 0) navigate("/");
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setError(null);
  };

  const isConstraintSatisfied = (constraint) => {
    switch (constraint) {
      case "8 Digits":
        return formData.password.length >= 8;
      case "Uppercase Alphabet":
        return /[A-Z]/.test(formData.password);
      case "Lowercase Alphabet":
        return /[a-z]/.test(formData.password);
      case "Special Character":
        return /[!@#$%^&*(),.?":{}|<>]/.test(formData.password);
      case "Number":
        return /\d/.test(formData.password);
      default:
        return false;
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    for (let i = 0; i < constraints.length; i++) {
      if (!isConstraintSatisfied(constraints[i])) {
        setError("Password should contain " + constraints[i]);
        return;
      }
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter valid Email Address");
      return;
    }

    const hashedPassword = await bcrypt.hash(formData.password, 10);
    const userData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: hashedPassword,
    };
    await axios
      .post(`${apiUrl}/sign-up`, {
        formData: userData,
        cart,
      })
      .then((response) => {
        dispatch(addUser(response.data));
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
        });
        navigate("/");
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
        <Heading text="Sign Up" heading="" highlight="" />
      </div>
      <div className="flex flex-col lg:flex-row justify-around p-4 ">
        <div className="flex flex-col w-11/12 mx-auto lg:mx-0 lg:w-1/3 gap-3">
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
                <label className="font-bold" htmlFor="firstname">
                  First Name <sup>*</sup>
                </label>
                <input
                  className="border-gray-200 border rounded-full px-4 py-2 my-2 w-full"
                  type="text"
                  placeholder="Enter First Name"
                  onChange={handleChange}
                  value={formData.firstName}
                  name="firstName"
                  required
                />
              </div>
              <div className="flex-col w-1/2">
                <label className="font-bold" htmlFor="lastname">
                  Last Name <sup>*</sup>
                </label>
                <input
                  className="border-gray-200 border rounded-full px-4 py-2 my-2 w-full"
                  type="text"
                  placeholder="Enter Last Name"
                  onChange={handleChange}
                  value={formData.lastName}
                  name="lastName"
                  required
                />
              </div>
            </div>
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
                required
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
                required
              />
            </div>
            <div className="text-sm flex flex-wrap gap-5 justify-between my-6">
              {constraints.map((item, index) => (
                <div
                  key={index}
                  className={
                    isConstraintSatisfied(item)
                      ? "text-green-500"
                      : "text-red-500"
                  }
                >
                  {item}
                </div>
              ))}
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-app-green text-white px-4 py-3 rounded-full my-4 hover:bg-app-dark-green"
              >
                Sign Up
              </button>
              {error && <div className="text-red-500 font-bold">{error}</div>}
              <hr />
              {/* <p className="my-4 text-gray-500">Sign Up with</p>
              <p>Google Sign Up</p> */}
              <p className="font-bold my-4">
                Already have an account?{" "}
                <Link
                  className="text-app-green hover:underline text-xl pl-4"
                  to="/signin"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </form>
        </div>

        <div className="lg:block hidden w-1/3 lg:my-auto">
          <img className="rounded-2xl" src={Clothes} />
        </div>
      </div>
    </div>
  );
};
export default Signup;
