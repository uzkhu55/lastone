"use client";
import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUpPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [images, setImages] = useState([]);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [userId, setUserId] = useState(null); // Track user ID after signup

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!username) {
      setError("Please enter a username.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }
    try {
      // Send signup request
      const response = await axios.post(
        "https://magicword.onrender.com/api/users/signup",
        {
          username,
          email,
          password,
          images,
        }
      );

      if (response.data.success) {
        setIsOtpSent(true);
        setUserId(response.data.userId); // Store user ID for OTP verification
        toast.success("Sign up successful! Check your email for the OTP.");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "An error occurred during signup."
      );
    }

    setUsername("");
    setPassword("");
    setConfirmPassword("");
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError("");

    try {
      console.log(email, "emailemailemailemail");

      const response = await axios.post(
        "https://magicword.onrender.com/api/users/verify-otp",
        {
          email,
          otp,
        }
      );

      if (response.data.success) {
        toast.success("OTP verified successfully! Redirecting to login...");
        setTimeout(() => {
          window.location.href = "/login"; // Redirect to login
        }, 2000);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid OTP.");
    }

    setOtp("");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <ToastContainer />
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-black">Sign Up</h2>
        {error && <p className="mb-4 text-red-600 text-center">{error}</p>}

        {!isOtpSent ? (
          <form onSubmit={handleSubmit} className="mt-6">
            <div>
              <label
                className="block mb-2 text-sm font-medium text-black"
                htmlFor="username"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                className="w-full text-black px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="mt-4">
              <label
                className="block mb-2 text-sm font-medium text-black"
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
                className="block mb-2 text-sm font-medium text-black"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className="w-full text-black px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-600"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
            <div className="mt-4">
              <label
                className="block mb-2 text-sm font-medium text-black"
                htmlFor="confirm-password"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirm-password"
                  className="w-full text-black px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-600"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                >
                  {showConfirmPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="w-full mt-6 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Sign Up
            </button>
            <p className="mt-4 text-center text-sm text-black">
              Already have an account?{" "}
              <a href="/login" className="text-blue-600 hover:underline">
                Log in
              </a>
            </p>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="mt-6">
            <div className="mt-4">
              <label
                className="block mb-2 text-sm font-medium text-black"
                htmlFor="otp"
              >
                Enter OTP
              </label>
              <input
                type="text"
                id="otp"
                className="w-full text-black px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full mt-6 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Verify OTP
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default SignUpPage;
