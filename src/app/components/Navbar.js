"use client";
import Link from "next/link";

const Navbar = ({ handleLogout }) => {
  return (
    <nav className="bg-gray-800 py-4 px-5">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-semibold">
          <Link href="/">
            <p className="text-2xl font-bold">ToDo App</p>
          </Link>
        </div>
        <div>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
