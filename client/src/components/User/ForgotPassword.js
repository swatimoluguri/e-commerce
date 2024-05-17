import Clothes from "../../assets/clothes.jpg";
import Heading from "../Partials/Heading";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import bcrypt from "bcryptjs";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [mailSent, setMailSent] = useState(false);
  const [verifyOTP, setVerifyOTP] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const constraints = [
    "8 Digits",
    "Uppercase Alphabet",
    "Lowercase Alphabet",
    "Special Character",
    "Number",
  ];

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const length = 4;
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [mailSent]);

  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => {
        navigate("/signin");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showSuccess, navigate]);

  const handleChangeMail = (e) => {
    setEmail(e.target.value);
    setError(null);
  };

  const handleChangeOTP = (index, e) => {
    const value = e.target.value;
    if (isNaN(value)) return;

    const newOtp = [...otp];
    // allow only one input
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // submit trigger
    const combinedOtp = newOtp.join("");
    if (combinedOtp.length === length) onOtpSubmit(combinedOtp);

    // Move to next input if current field is filled
    if (value && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleSendMail = async (e) => {
    e.preventDefault();
    await axios
      .post("/server/send-mail", {
        email,
      })
      .then((response) => {
        setError(null);
        setMailSent(true);
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          setError(error.response.data.message);
        }
      });
  };

  const handleClick = (index) => {
    inputRefs.current[index].setSelectionRange(1, 1);

    // optional
    if (index > 0 && !otp[index - 1]) {
      inputRefs.current[otp.indexOf("")].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0 &&
      inputRefs.current[index - 1]
    ) {
      // Move focus to the previous input field on backspace
      inputRefs.current[index - 1].focus();
    }
  };

  const onOtpSubmit = async (otp) => {
    await axios
      .post("/server/verify-otp", {
        otp,
        email,
      })
      .then((response) => {
        setError(null);
        setVerifyOTP(true);
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          setError(error.response.data.message);
        }
      });
  };

  const handleChangeNewPwd = (e) => {
    setNewPassword(e.target.value);
  };

  const handleChangeConfirmPwd = (e) => {
    setConfirmPassword(e.target.value);
  };

  const isConstraintSatisfied = (constraint) => {
    switch (constraint) {
      case "8 Digits":
        return newPassword.length >= 8;
      case "Uppercase Alphabet":
        return /[A-Z]/.test(newPassword);
      case "Lowercase Alphabet":
        return /[a-z]/.test(newPassword);
      case "Special Character":
        return /[!@#$%^&*(),.?":{}|<>]/.test(newPassword);
      case "Number":
        return /\d/.test(newPassword);
      default:
        return false;
    }
  };

  const handleNewPassword = async (e) => {
    e.preventDefault();
    if (newPassword.trim() === "" || confirmPassword.trim() === "") {
      setError("Please enter passwords");
    }

    if (newPassword !== confirmPassword) {
      setError("New Password and Confirm Password don't match");
      return;
    }

    if (newPassword === confirmPassword) {
      for (let i = 0; i < constraints.length; i++) {
        if (!isConstraintSatisfied(constraints[i])) {
          setError("Password should contain " + constraints[i]);
          return;
        }
      }
      setError(null);
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await axios
        .post("/server/change-password", {
          newPassword: hashedPassword,
          email,
        })
        .then((response) => {
          setShowSuccess(true);
        })
        .catch((error) => {
          if (error.response && error.response.status === 400) {
            setError(error.response.data.message);
          }
        });
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col items-center bg-[url('assets/bg.jpg')] bg-cover	">
        <Heading text="Password Recovery" heading="" highlight="" />
      </div>
      <div className="flex flex-col lg:flex-row justify-around p-4 ">
        {showSuccess ? (
          <div className="flex flex-col w-11/12 mx-auto lg:mx-0 lg:w-1/3 gap-3 mt-10">
            <div>
              <h1 className="font-bold text-2xl">Password Recovery</h1>
            </div>
            <div>
              <p className="text-gray-500">
                New password has been set for your account.
              </p>
            </div>
            <div>
              <h1 className="font-semibold text-2xl text-app-green">
                Password changed successfully!.
                <br />
                Redirecting to Signin...
              </h1>
            </div>
          </div>
        ) : mailSent ? (
          verifyOTP ? (
            <div className="flex flex-col w-11/12 mx-auto lg:mx-0 lg:w-1/3 gap-3 mt-10">
              <div>
                <h1 className="font-bold text-2xl">Password Recovery</h1>
              </div>
              <div>
                <p className="text-gray-500">
                  Set new password for your account.
                </p>
              </div>
              <form onSubmit={handleNewPassword}>
                <div className="w-full">
                  <label className="font-bold w-full" htmlFor="new-password">
                    New Password <sup>*</sup>
                  </label>
                  <input
                    className="border-gray-200 border rounded-full px-4 py-2 my-2 w-full"
                    type="password"
                    placeholder="Enter New Password"
                    onChange={handleChangeNewPwd}
                    value={newPassword}
                    name="new-password"
                  />
                </div>
                <div className="w-full">
                  <label
                    className="font-bold w-full"
                    htmlFor="confirm-password"
                  >
                    Confirm Password <sup>*</sup>
                  </label>
                  <div className="relative">
                    <input
                      className="border-gray-200 border rounded-full px-4 py-2 my-2 w-full"
                      type={showPassword ? "text" : "password"}
                      placeholder="Confirm Password"
                      onChange={handleChangeConfirmPwd}
                      value={confirmPassword}
                      name="confirm-password"
                    />
                    <FontAwesomeIcon
                      className="text-app-yellow absolute right-4 top-5 cursor-pointer"
                      icon={showPassword ? faEyeSlash : faEye}
                      onClick={togglePasswordVisibility}
                    />
                  </div>
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
                    Change Password
                  </button>
                  <hr />
                  {error && (
                    <div className="text-red-500 font-bold">{error}</div>
                  )}
                </div>
              </form>
            </div>
          ) : (
            <div className="flex flex-col w-11/12 mx-auto lg:mx-0 lg:w-1/3 gap-3 mt-10">
              <div>
                <h1 className="font-bold text-2xl">Password Recovery</h1>
              </div>
              <div>
                <p className="text-gray-500">
                  Recover your account by entering the OTP recieved in your mail
                  ID.
                </p>
              </div>
              <div>
                {otp.map((value, index) => {
                  return (
                    <input
                      key={index}
                      type="text"
                      ref={(input) => (inputRefs.current[index] = input)}
                      value={value}
                      onChange={(e) => handleChangeOTP(index, e)}
                      onClick={() => handleClick(index)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      className="w-14 h-14 m-2 text-center text-xl border border-gray-300 rounded-lg"
                    />
                  );
                })}
              </div>
              <hr />
              {error && <div className="text-red-500 font-bold">{error}</div>}
            </div>
          )
        ) : (
          <div className="flex flex-col w-11/12 mx-auto lg:mx-0 lg:w-1/3 gap-3 mt-10">
            <div>
              <h1 className="font-bold text-2xl">Password Recovery</h1>
            </div>
            <div>
              <p className="text-gray-500">Recover your account.</p>
            </div>
            <form onSubmit={handleSendMail}>
              <div className="w-full">
                <label className="font-bold w-full" htmlFor="email">
                  Email <sup>*</sup>
                </label>
                <input
                  className="border-gray-200 border rounded-full px-4 py-2 my-2 w-full"
                  type="text"
                  placeholder="Enter Registered Email Address"
                  onChange={handleChangeMail}
                  value={email}
                  name="email"
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full bg-app-green text-white px-4 py-3 rounded-full my-4 hover:bg-app-dark-green"
                >
                  Send Reset Code
                </button>
                <hr />
                {error && <div className="text-red-500 font-bold">{error}</div>}
              </div>
            </form>
          </div>
        )}
        <div className="lg:block hidden w-1/3 lg:my-auto">
          <img className="rounded-2xl" src={Clothes} />
        </div>
      </div>
    </div>
  );
};
export default ForgotPassword;
