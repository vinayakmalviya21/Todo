'use client'
import { useState } from 'react';
import Link from 'next/link';
import axios from "axios";

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
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
      const response = await axios.post("/api/login", formData);
      console.log(response.data);
      localStorage.setItem("Uid", response.data.userId);
      window.location = "/pages/Todo";
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto mt-[10rem] w-fit">
      <h1 className="text-3xl font-bold mb-4 flex justify-center">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
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
            Login
          </button>
          </div>

          <div className="flex justify-center">
            <p className="text-md text-gray-400 font-semibold">Welcome! Ready to get started?</p>
          <Link href="/">
            <p
              type="button"
              className="text-blue-500 px-4"
            >
              Signup
            </p>
          </Link>
        </div>
        
      </form>
    </div>
  );
}
