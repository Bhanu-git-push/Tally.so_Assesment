import React, { useState } from "react";
import { FaTasks, FaMoon, FaSun, FaBars } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginResetAction } from "../redux/authentication/actions";
import { useTheme } from "../context/ThemeContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  // const { isAuth } = useSelector((store) => store.AuthenticationReducer);
  const { isAuth, user, isLoading, isError } = useSelector(
    (state) => state.AuthenticationReducer
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleDarkMode = () => setDarkMode(!darkMode);
  const { theme, toggleTheme } = useTheme();
  console.log(theme);

  const handleLogout = () => {
    dispatch(loginResetAction());
    navigate("/login");
  };

  return (
    <nav className="w-full">
      {/* Top Bar */}
      {/* <div
    className={`text-center py-2 flex justify-center gap-2 
      ${theme === "light" ? "bg-gray-300" : "bg-gray-800"}
    `}
  >
    <Link
      to="/login"
      className={`font-semibold text-decoration-none 
        ${theme === "light" ? "text-black" : "text-white"}
      `}
    >
      Sign in
    </Link>

    <span
      className={`font-semibold 
        ${theme === "light" ? "text-black" : "text-white"}
      `}
    >
      /
    </span>

    <Link
      to="/register"
      className={`font-semibold text-decoration-none 
        ${theme === "light" ? "text-black" : "text-white"}
      `}
    >
      Create Account
    </Link>
  </div> */}
      <div
        className={`text-center py-2 flex justify-center gap-4 
    ${theme === "light" ? "bg-gray-300" : "bg-gray-800"}
  `}
      >
        {!isAuth ? (
          <>
            <Link
              to="/login"
              className={`font-semibold text-decoration-none 
          ${theme === "light" ? "text-black" : "text-white"}
        `}
            >
              Sign in
            </Link>

            <span
              className={`font-semibold 
          ${theme === "light" ? "text-black" : "text-white"}
        `}
            >
              /
            </span>

            <Link
              to="/register"
              className={`font-semibold text-decoration-none 
          ${theme === "light" ? "text-black" : "text-white"}
        `}
            >
              Create Account
            </Link>
          </>
        ) : (
          <div className="flex align-center justify-center gap-2">
            {/* Show Logged-in User Name */}
            <p
              className={`font-semibold my-2
          ${theme === "light" ? "text-black" : "text-white"}
        `}
            >
              Hello, {user.firstName || "User"}
            </p>

            {/* Sign Out */}
            <div
              role="button"
              onClick={handleLogout}
              className={`font-semibold cursor-pointer py-1 px-2 my-1 rounded-md
          ${
            theme === "light"
              ? "text-black bg-red-500  hover:bg-red-600 shadow"
              : "text-red-400 hover:text-red-300 bg-gray-700 shadow"
          }
        `}
            >
              Sign Out
            </div>
          </div>
        )}
      </div>

      {/* Main Navbar */}
      <div
        className={`px-4 py-3 flex justify-between items-center ${
          theme === "light" ? "bg-orange-300" : "bg-blue-500"
        }`}
      >
        {/* Left Icon */}
        <FaTasks
          className={`${theme === "light" ? "text-black" : "text-white"}`}
          size={26}
        />

        {/* Center Menu - Desktop */}
        <ul
          className={`hidden md:flex gap-10 font-medium text-lg my-2 ${
            theme === "light" ? "text-black" : "text-white"
          }`}
        >
          <li className="cursor-pointer hover:underline">Home</li>
          <li className="cursor-pointer hover:underline">About</li>
          <li className="cursor-pointer hover:underline">Services</li>
          <li className="cursor-pointer hover:underline">Contact</li>
        </ul>

        {/* Dark Mode Icon */}
        <div className="hidden md:block">
          {theme === "dark" ? (
            <FaSun
              className="text-white cursor-pointer"
              size={26}
              onClick={toggleTheme}
            />
          ) : (
            <FaMoon
              className="text-black cursor-pointer"
              size={26}
              onClick={toggleTheme}
            />
          )}
        </div>

        {/* Hamburger - Mobile */}
        <FaBars
          className={`md:hidden cursor-pointer ${
            theme === "light" ? "text-black" : "text-white"
          }`}
          size={26}
          onClick={toggleMenu}
        />
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          className={`py-4 px-6 md:hidden ${
            theme === "light" ? "bg-orange-300" : "bg-orange-900"
          }`}
        >
          <ul
            className={`flex flex-col gap-4 text-lg font-medium ${
              theme === "light" ? "text-black" : "text-white"
            }`}
          >
            <li className="cursor-pointer">Home</li>
            <li className="cursor-pointer">About</li>
            <li className="cursor-pointer">Services</li>
            <li className="cursor-pointer">Contact</li>

            {/* Theme Toggle */}
            <li className="cursor-pointer flex items-center justify-center gap-2">
              {theme === "dark" ? (
                <FaSun
                  className="text-white cursor-pointer"
                  size={22}
                  onClick={toggleTheme}
                />
              ) : (
                <FaMoon
                  className="text-black cursor-pointer"
                  size={22}
                  onClick={toggleTheme}
                />
              )}
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
