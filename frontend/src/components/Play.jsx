"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

const Play = () => {
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

  return (
    <div className="relative">
      <img className="h-[779px]" src="playpage.png" alt="" />
      <Link
        href="/newwizardhome"
        className="absolute top-[415px] font-semibold text-2xl left-[400px]"
      >
        Wizard Word
      </Link>
      <Link
        href="/comingsoon"
        className="absolute font-semibold text-2xl top-[415px] left-[715px]"
      >
        Wizard x Magic
      </Link>
      <Link
        href="/comingsoon"
        className="absolute top-[415px]  font-semibold text-2xl left-[1060px]"
      >
        Magic Word
      </Link>
    </div>
  );
};

export default Play;
