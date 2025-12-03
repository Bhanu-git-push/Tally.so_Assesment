import React from "react";
import { useTheme } from "../context/ThemeContext";

const Footer = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <footer
  className={`py-12 ${
    theme === "light" ? "bg-gray-200 text-gray-800" : "bg-gray-900 text-gray-200"
  }`}
>
  <div className="max-w-7xl mx-auto px-4">

    <div className="grid grid-cols-1 md:grid-cols-4 gap-10 text-center md:text-left">

      {/* Column 1 */}
      <div>
        <p className="text-2xl font-semibold mb-3">Your Company</p>
        <p className={theme === "light" ? "text-gray-600" : "text-gray-300"}>
          Providing high-quality services and products<br />
          since 2024.
        </p>
      </div>

      {/* Column 2 */}
      <div>
        <p className="text-2xl font-semibold mb-3">Company Services</p>
        <ul className="space-y-2">
          <li>
            <a
              href="#"
              className={`hover:underline ${
                theme === "light" ? "text-blue-600" : "text-blue-400"
              }`}
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#"
              className={`hover:underline ${
                theme === "light" ? "text-blue-600" : "text-blue-400"
              }`}
            >
              About
            </a>
          </li>
          <li>
            <a
              href="#"
              className={`hover:underline ${
                theme === "light" ? "text-blue-600" : "text-blue-400"
              }`}
            >
              Services
            </a>
          </li>
          <li>
            <a
              href="#"
              className={`hover:underline ${
                theme === "light" ? "text-blue-600" : "text-blue-400"
              }`}
            >
              Contact
            </a>
          </li>
        </ul>
      </div>

      {/* Column 3 */}
      <div>
        <p className="text-2xl font-semibold mb-3">Useful Links</p>
        <ul className="space-y-2">
          {["Company", "Stores", "Careers", "Support"].map((link) => (
            <li key={link}>
              <a
                href="#"
                className={`hover:underline ${
                  theme === "light" ? "text-blue-600" : "text-blue-400"
                }`}
              >
                {link}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Column 4 */}
      <div>
        <p className="text-2xl font-semibold mb-3">Contact</p>

        <p className={theme === "light" ? "text-gray-700" : "text-gray-300"}>
          Email: support@yourcompany.com
        </p>

        <p
          className={`mt-2 ${
            theme === "light" ? "text-gray-700" : "text-gray-300"
          }`}
        >
          Phone: +1 (123) 456-7890
        </p>

        <p
          className={`mt-2 ${
            theme === "light" ? "text-gray-700" : "text-gray-300"
          }`}
        >
          Location: Toronto, Canada
        </p>
      </div>
    </div>

    {/* Divider */}
    <div
      className={`mt-10 pt-4 text-center border-t ${
        theme === "light" ? "border-gray-400" : "border-gray-600"
      }`}
    >
      <p className={theme === "light" ? "text-gray-700" : "text-gray-300"}>
        © 2025 Your Company — All Rights Reserved.
      </p>
    </div>

  </div>
</footer>

  );
};

export default Footer;
