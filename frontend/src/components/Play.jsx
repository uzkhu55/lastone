"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

const Play = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem("token");
      if (token) {
        setIsLoggedIn(true); // User is logged in if the token exists
      } else {
        setIsLoggedIn(false); // User is not logged in
      }
    };

    checkLoginStatus();
  }, []);

  return (
    <div className="relative h-screen">
      {/* <img className="h-auto w-full object-cover" src="playpage.png" alt="" /> */}
      <div className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-[40px] text-center">
        <Link
          href="/newwizardhome"
          className="font-semibold text-xl sm:text-7xl"
        >
          Wizard Word
        </Link>
        <Link href="/comingsoon" className="font-semibold text-xl sm:text-7xl">
          Wizard x Magic
        </Link>
        <Link href="/comingsoon" className="font-semibold text-xl sm:text-7xl">
          Magic Word
        </Link>
      </div>
    </div>
  );
};

export default Play;
