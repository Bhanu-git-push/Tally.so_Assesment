import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useTheme } from "../context/ThemeContext";

const Register = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();

  const fields = [
    {
      id: "firstName",
      label: "First Name",
      type: "text",
      placeholder: "Enter your first name",
    },
    {
      id: "lastName",
      label: "Last Name",
      type: "text",
      placeholder: "Enter your last name",
    },
    {
      id: "email",
      label: "Email",
      type: "email",
      placeholder: "Enter your email",
    },
    {
      id: "mobile",
      label: "Mobile",
      type: "number",
      placeholder: "Enter your mobile number",
    },
    {
      id: "password",
      label: "Password",
      type: "password",
      placeholder: "Enter your password",
    },
    {
      id: "confirmPassword",
      label: "Confirm Password",
      type: "password",
      placeholder: "Re-enter your password",
    },
  ];

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.mobile ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("All fields are required");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await axios.get("http://localhost:3001/users");
      const users = res.data;

      const emailExists = users.some(
        (u) => u.email.toLowerCase() === formData.email.toLowerCase()
      );
      const mobileExists = users.some((u) => u.mobile === formData.mobile);

      if (emailExists) {
        setLoading(false);
        setError("This email is already registered.");
        return;
      }
      if (mobileExists) {
        setLoading(false);
        setError("Mobile number is already registered.");
        return;
      }

      const userData = {
        id: uuidv4(),
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        mobile: formData.mobile,
        password: formData.password,
      };

      await axios.post("http://localhost:3001/users", userData);

      setLoading(false);
      alert("Registration successful!");
      navigate("/login");
    } catch (err) {
      setLoading(false);
      setError("Failed to register. Try again.");
      console.error(err);
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-4 transition-all duration-300 ${
        theme === "light" ? "bg-gray-100" : "bg-gray-900"
      }`}
    >
      <div
        className={`w-full max-w-md rounded-xl p-8 transition-shadow duration-300 ${
          theme === "light"
            ? "bg-white shadow-lg hover:shadow-2xl text-gray-900"
            : "bg-gray-800 shadow-[0_10px_15px_rgba(0,0,0,0.6)] hover:shadow-[0_20px_25px_rgba(0,0,0,0.7)] text-white"
        }`}
      >
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {fields.map((field) => (
            <div key={field.id} className="flex flex-col">
              <label className="mb-1 font-medium text-left">
                {field.label}:
              </label>

              <input
                id={field.id}
                type={
                  field.id === "password" || field.id === "confirmPassword"
                    ? showPassword
                      ? "text"
                      : "password"
                    : field.type
                }
                placeholder={field.placeholder}
                value={formData[field.id]}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded-md border transition-all duration-300 ${
                  theme === "light"
                    ? "border-gray-300 bg-white text-gray-900 focus:ring-orange-400"
                    : "border-gray-600 bg-gray-700 text-white focus:ring-orange-500"
                } focus:ring-2 focus:outline-none`}
              />
            </div>
          ))}

          {/* Show Password */}
          <div className="flex items-center justify-start gap-2 mt-1">
            <input
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
              className="h-4 w-4"
            />
            <label className="text-sm cursor-pointer">Show Password</label>
          </div>

          {/* Register Button (div role="button") */}
          <div
            role="button"
            onClick={handleSubmit}
            className={`w-full text-center py-2 rounded-md font-semibold mt-3 transition-all duration-300 ${
              loading ? "opacity-60 cursor-not-allowed" : "cursor-pointer"
            } ${
              theme === "light"
                ? "bg-orange-300 hover:bg-orange-400 text-gray-900"
                : "bg-orange-400 hover:bg-orange-500 text-white"
            }`}
          >
            {loading ? "Registering..." : "Register"}
          </div>
        </form>

        {error && <p className="text-red-500 text-center mt-4">{error}</p>}

        <p className="mt-4 text-center">
          Already have an account?{" "}
          <Link
            to="/login"
            className={`${
              theme === "light"
                ? "text-orange-600 hover:underline"
                : "text-orange-300 hover:underline"
            }`}
          >
            Login
          </Link>
        </p>
        <p className="mb-4">
          <Link
            to="/"
            className={`text-sm font-medium ${
              theme === "light"
                ? "text-orang e-600 hover:underline"
                : "text-orange-300 hover:underline"
            }`}
          >
            Go Back
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
