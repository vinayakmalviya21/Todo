"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { useCookies } from "next-client-cookies";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [Uid, setUid] = useState();
  const [formData, setFormData] = useState({
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

  const cookies = useCookies();
  const router = useRouter();

  useEffect(() => {
    const NewUid = cookies.get("my-cookie");
    setUid(NewUid);
    console.log(Uid);

    if (Uid != null) {
      router.push("/pages/Todo");
    }
  }, [Uid]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/login", formData);
      console.log(response.data);
      router.push("/pages/Todo");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto mt-[10rem] w-fit text-black">
      <h1 className="text-3xl font-bold mb-4 flex justify-center">Login</h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 border-gray-400 border-2 rounded-lg p-5 bg-slate-300"
      >
        <div>
          <label htmlFor="email" className="block text-lg font-bold">
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
          <label htmlFor="password" className="block text-lg font-bold">
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
          <p className="text-md font-semibold">
            Welcome! Ready to get started?
          </p>
          <Link href="/">
            <p type="button" className="text-blue-500 px-4">
              Signup
            </p>
          </Link>
        </div>
      </form>
    </div>
  );
}
