/* eslint-disable react/no-unescaped-entities */
import { Link } from "react-router-dom";

import { IoMdMail } from "react-icons/io";
import { FaInstagram } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { FaSquareFacebook } from "react-icons/fa6";


const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-12">
        <div className="max-w-2xl mx-auto bg-white p-8 shadow-md rounded-md">
          <h1 className="text-3xl font-semibold mb-6">Contact Us</h1>
          <p className="text-gray-600 mb-4">
            Have questions or queries?
            <br></br>
            We'd love to hear from you. Reach out to us using the contact
            information below.
          </p>
          <h2 className="text-xl font-semibold mb-2">Email</h2>
          <p className="text-gray-600 mb-4">theogma.nittca@gmail.com</p>
          <h2 className="text-xl font-semibold mb-2">Phone</h2>
          <p className="text-gray-600 mb-4">+91 7984186658</p>
          <h2 className="text-xl font-semibold mb-2">Address</h2>
          <p className="text-gray-600 mb-4">
            Natiional Institute of Technology, Tiruchirappalli, Tamil
            Nadu-620015
          </p>
          <h2 className="text-xl font-semibold mb-4">Social Media</h2>
          <div className="flex space-x-6">
            <Link to="tel:+91 9578409525" target="_blank">
              <FaPhoneAlt className="text-2xl" />
            </Link>
            <Link
              target="_blank"
              to="https://www.google.com/maps/place/Lyceum/@10.7603685,78.8173178,17z/data=!4m14!1m7!3m6!1s0x3baa8d474ba54afb:0x4fcc5d43d6bc0d2c!2sCaf%C3%A9+Coffee+Day!8m2!3d10.7561682!4d78.8154838!16s%2Fg%2F11b6whp424!3m5!1s0x3baa8d40c882570d:0x7e958cef7652a589!8m2!3d10.7597292!4d78.8172264!16s%2Fg%2F11b6ztchd7?hl=en&entry=ttu"
            >
              <FaLocationDot className="text-2xl" />
            </Link>
            <Link to="mailto:theogma.nittca@gmail.com" target="_blank">
              <IoMdMail className="text-3xl" />
            </Link>
            <Link to="https://www.instagram.com/the_ogma/" target="_blank">
              <FaInstagram className="text-3xl" />
            </Link>
            <Link to="https://www.facebook.com/theogmanitt" target="_blank">
              <FaSquareFacebook className="text-3xl" />
            </Link>
          </div>

          <h2 className="text-xl font-semibold mb-2 mt-8">
            Be a Part Of Elite Club
          </h2>
          <form className="grid sm:grid-cols-2 gap-x-4 gap-y-2">
            <div className="mb-4">
              <input
                type="text"
                id="name"
                name="name"
                className="mt-1 p-2 border rounded-md w-full"
                placeholder="Name"
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="email"
                id="email"
                name="email"
                className="mt-1 p-2 border rounded-md w-full"
                placeholder="Email"
                required
              />
            </div>


            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 mt-2"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;