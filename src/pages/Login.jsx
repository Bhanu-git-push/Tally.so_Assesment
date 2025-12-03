import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  loginRequestAction,
  loginSuccessAction,
  loginFailureAction,
} from "../redux/authentication/actions";
import { getUsers } from "../api/fetchUserAPI";
import { useTheme } from "../context/ThemeContext";

export default function Login() {
  const { theme } = useTheme();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, isError } = useSelector(
    (state) => state.AuthenticationReducer
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorMessage("Please enter your Email and Password to Login.");
      dispatch(loginFailureAction());
      return;
    }

    dispatch(loginRequestAction());

    try {
      const users = await getUsers(email, password);

      if (users.length === 0) {
        setErrorMessage("Login failed. Please check your credentials.");
        dispatch(loginFailureAction());
        return;
      }

      const user = users[0];
      dispatch(loginSuccessAction(user));
      alert("Login Success");
      navigate("/");
    } catch (err) {
      console.error(err);
      setErrorMessage("Something went wrong. Try again!");
      dispatch(loginFailureAction());
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-4 transition-all duration-300 ${
        theme === "light" ? "bg-gray-100" : "bg-gray-900"
      }`}
    >
      <div
        className={`w-full max-w-md rounded-xl p-8 transition-all duration-300 ${
          theme === "light"
            ? "bg-white text-gray-900 shadow-lg hover:shadow-2xl"
            : "bg-gray-800 text-white shadow-[0_10px_15px_rgba(0,0,0,0.6)] hover:shadow-[0_20px_25px_rgba(0,0,0,0.7)]"
        }`}
      >
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-left">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className={`w-full px-4 py-2 rounded-md border transition-all duration-300 ${
                theme === "light"
                  ? "border-gray-300 bg-white text-gray-900 focus:ring-orange-400"
                  : "border-gray-600 bg-gray-700 text-white focus:ring-orange-500"
              } focus:ring-2 focus:outline-none`}
            />
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-left">Password:</label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className={`w-full px-4 py-2 rounded-md border transition-all duration-300 ${
                theme === "light"
                  ? "border-gray-300 bg-white text-gray-900 focus:ring-orange-400"
                  : "border-gray-600 bg-gray-700 text-white focus:ring-orange-500"
              } focus:ring-2 focus:outline-none`}
            />
          </div>

          {/* Show Password */}
          <div className="flex items-center justify-start gap-2">
            <input
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
              className="h-4 w-4"
            />
            <label className="text-sm cursor-pointer">Show Password</label>
          </div>

          {/* Login Button */}
          <div
            role="button"
            onClick={handleSubmit}
            className={`w-full text-center py-2 rounded-md font-semibold transition-all duration-300 ${
              isLoading ? "opacity-60 cursor-not-allowed" : "cursor-pointer"
            } ${
              theme === "light"
                ? "bg-orange-300 hover:bg-orange-400 text-gray-900"
                : "bg-orange-400 hover:bg-orange-500 text-white"
            }`}
          >
            {isLoading ? "Logging in..." : "Login"}
          </div>
        </form>

        {isError && (
          <p className="text-red-500 mt-4 text-center text-sm">
            {errorMessage}
          </p>
        )}

        <p className="mt-4 text-center">
          Don't have an account?{" "}
          <Link
            to="/register"
            className={`${
              theme === "light"
                ? "text-orange-600 hover:underline"
                : "text-orange-300 hover:underline"
            }`}
          >
            Register
          </Link>
        </p>
        <p className="mb-4">
          <Link
            to="/"
            className={`text-sm font-medium ${
              theme === "light"
                ? "text-orange-600 hover:underline"
                : "text-orange-300 hover:underline"
            }`}
          >
            Go Back
          </Link>
        </p>
      </div>
    </div>
  );
}
