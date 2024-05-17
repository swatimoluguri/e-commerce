import Heading from "../Partials/Heading";
import DetailsStrip from "../Partials/DetailsStrip";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import SocialMedia from "../Partials/SocialMedia";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [enquiry, setEnquiry] = useState(null);
  const apiUrl = process.env.REACT_APP_API_URL || "";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleContactUs = async (e) => {
    e.preventDefault();
    const response = await axios.post(`${apiUrl}/contact-us`, {
      formData,
    });
    if (response.status === 200) {
      setEnquiry(response.data.success);
    }
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };
  return (
    <div>
      <div className="flex flex-col items-center bg-[url('assets/bg.jpg')] bg-cover	">
        <Heading text="Contact Us" heading="" highlight="" />
      </div>
      <div className="flex flex-col md:flex-row justify-around p-4 ">
        {enquiry ? (
          <div className="flex justify-center items-center text-center w-5/6 md:w-1/3 mx-auto md:mx-0 gap-3">
            <div>
              <h1 className="font-bold text-xl">Thanks for reaching out to us, our executives will contact you soon. <br/>Your enquiry ID is <span className="text-app-green">#{enquiry}</span></h1>
            </div>
          </div>
        ) : (
          <div className="flex flex-col w-5/6 md:w-1/3 mx-auto md:mx-0 gap-3">
            <div>
              <h1 className="font-bold text-2xl">Get in Touch</h1>
            </div>
            <div>
              <p className="text-gray-500">
                Your email address will not be published. Please fill in your
                enquiry.
              </p>
            </div>
            <form onSubmit={handleContactUs}>
              <div className="flex gap-4 mt-6 w-full justify-between">
                <div className="flex-col w-1/2">
                  <label className="font-bold" htmlFor="name">
                    Your Name <sup>*</sup>
                  </label>
                  <input
                    className="border-gray-200 border rounded-full px-4 py-2 my-2 w-full"
                    type="text"
                    placeholder="Ex. John Doe"
                    onChange={handleChange}
                    value={formData.name}
                    name="name"
                  />
                </div>
                <div className="flex-col w-1/2">
                  <label className="font-bold" htmlFor="email">
                    Email <sup>*</sup>
                  </label>
                  <input
                    className="border-gray-200 border rounded-full px-4 py-2 my-2 w-full"
                    type="text"
                    placeholder="example@gmail.com"
                    onChange={handleChange}
                    value={formData.email}
                    name="email"
                  />
                </div>
              </div>
              <div className="w-full">
                <label className="font-bold w-full" htmlFor="subject">
                  Subject <sup>*</sup>
                </label>
                <input
                  className="border-gray-200 border rounded-full px-4 py-2 my-2 w-full"
                  type="text"
                  placeholder="Enter Subject"
                  onChange={handleChange}
                  value={formData.subject}
                  name="subject"
                />
              </div>
              <div>
                <label className="font-bold w-full" htmlFor="message">
                  Your Message <sup>*</sup>
                </label>
                <textarea
                  className="border-gray-200 border rounded-lg px-4 py-2 my-2 w-full resize-none"
                  type="text"
                  placeholder="Enter here"
                  onChange={handleChange}
                  value={formData.message}
                  rows={5}
                  name="message"
                />
              </div>
              <div className="p-4">
                <button
                  type="submit"
                  className="w-full bg-app-green text-white px-4 py-3 rounded-full my-4 hover:bg-app-dark-green"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="w-5/6 md:w-1/3 mx-auto md:mx-0 bg-app-green text-white rounded-xl flex flex-col  p-10 gap-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Address</h1>
            <p className="text-gray-300">
              SVJC Girls Jr. College Vavilalapally Rd, Vavilalapally,
              Karimnagar, Telangana 505001
            </p>
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-2">Contact</h1>
            <p className="text-gray-300">
              Phone:+91-9876543210
              <br />
              Email:example@gmail.com
            </p>
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-2">Open Time</h1>
            <p className="text-gray-300">
              Mon-Fri: 10:00 - 20:00
              <br />
              Sat-Sun: 11:00 - 18:00
            </p>
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-2">Stay Connected</h1>
            <SocialMedia />
          </div>
        </div>
      </div>
      <div className="flex justify-center">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d669.0547157050926!2d79.12829866533423!3d18.44988308890282!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bccd8decd62d78f%3A0xfaaf8ec24fa783d6!2sSVJC%20Girls%20Jr.%20College!5e0!3m2!1sen!2sin!4v1715335905158!5m2!1sen!2sin"
        width="1920"
        height="600"
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
      </div>
      <DetailsStrip />
    </div>
  );
};
export default Contact;
