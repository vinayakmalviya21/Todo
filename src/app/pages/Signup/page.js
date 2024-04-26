"use client";
import { useState } from "react";
import Link from "next/link";
import axios from "axios";

export default function SignUpForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/signup", formData);
      console.log(response.data);
      window.location = "/pages/Login";
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto mt-10 w-fit">
      <h1 className="text-3xl font-bold mb-4 flex justify-center">SignUp</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-lg font-bold text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border rounded-md text-black text-lg"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-lg font-bold text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border rounded-md text-black text-lg"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-lg font-bold text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border rounded-md text-black text-lg"
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded mb-2 flex justify-center"
          >
            SignUp
          </button>
          </div>

          <div className="flex justify-center">
            <p className="text-md text-gray-400 font-semibold">Already have an account?</p>
          <Link href="/pages/Login">
            <p
              type="button"
              className="text-blue-500 px-4"
            >
              Login
            </p>
          </Link>
        </div>
      </form>
    </div>
  );
}
