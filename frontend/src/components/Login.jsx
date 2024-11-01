"use client";
import axios from "axios";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS
import { useRouter } from "next/navigation"; // Import useRouter from Next.js

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter(); // Initialize useRouter

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://magicword.onrender.com/api/users/login",
        {
          email,
          password,
        }
      );

      if (response.data.success) {
        // Store token and username in localStorage
        localStorage.setItem("token", response.data.token); // Save token from response
        // Example of storing the username
        localStorage.setItem("username", "asd");

        toast.success("Login successful!"); // Show success toast
        setTimeout(() => {
          router.push("/"); // Redirect to homepage after a delay
        }, 2000); // Delay for 2 seconds
      } else {
        toast.error(response.data.message); // Show error message from response
      }
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error("Login failed. Please check your credentials."); // Show error toast
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-700">Login</h2>
        <form onSubmit={handleLogin} className="mt-6">
          <div>
            <label
              className="block mb-2 text-sm font-medium text-gray-600"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full text-black px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mt-4">
            <label
              className="block mb-2 text-sm font-medium text-gray-600"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full text-black px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full mt-6 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
      <ToastContainer /> {/* Add ToastContainer for notifications */}
    </div>
  );
};

export default LoginPage;
