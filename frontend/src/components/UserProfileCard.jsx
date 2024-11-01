"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";

function UserProfileCard() {
  // State to track login status
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Function to check if user is logged in
    const checkLoginStatus = () => {
      const token = localStorage.getItem("token"); // Retrieve the token from local storage
      if (token) {
        setIsLoggedIn(true); // User is logged in if the token exists
      } else {
        setIsLoggedIn(false); // User is not logged in
      }
    };

    checkLoginStatus();
  }, []);

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove the token from local storage
    setIsLoggedIn(false); // Update login status
  };

  return (
    <div className="relative ml-[80px] text-white p-4 rounded-md">
      <img
        className="w-[1272px] h-[500px]"
        src="Userprofile.png"
        alt="User Profile"
      />
      <div className="absolute justify-between flex w-[300px] bottom-8 right-[200px]">
        {!isLoggedIn ? (
          <>
            <Link className="flex font-extrabold text-2xl" href="/login">
              Log in
            </Link>
            <Link className="flex font-extrabold text-2xl" href="/signup">
              Sign up
            </Link>
          </>
        ) : (
          <>
            <span className="font-extrabold text-2xl">Welcome back!</span>
            <button
              onClick={handleLogout}
              className="ml-4 font-extrabold text-2xl text-red-500"
            >
              Log out
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default UserProfileCard;
