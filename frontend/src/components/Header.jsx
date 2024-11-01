"use client";

import React from "react";
import { FaArrowDown } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";

function Header() {
  return (
    <div className="flex mx-[50px] flex-col justify-between p-4  text-white">
      <div className="flex justify-between space-x-4">
        {/* <h1 className="text-pink-600 font-bold text-2xl">LEARN</h1> */}
        <img src="learn.png" className="w-[350px] mx-12 h-[60px]" alt="" />
        {/* <div className="flex w-[350px] justify-between">
          <div className="bg-black text-yellow-400 px-4 py-1 rounded-full">
            Point - 312
          </div>
          <div className="bg-black text-blue-400 px-4 py-1 rounded-full">
            Wallet - 3$
          </div>
          <button className="bg-green-500 px-4 py-1 rounded-full">
            AES is on
          </button>
        </div> */}
      </div>
      <nav className="flex justify-between mx-[50px] m-4  space-x-4">
        <a
          href="#home"
          className="bg-violet-800 font-semibold flex items-center py-2 gap-16 px-4 rounded-2xl  text-lg"
        >
          HOME <FaArrowDown />
        </a>
        <a
          href="earn"
          className="bg-pink-600 underline font-semibold  flex items-center gap-16 px-4 rounded-2xl  text-lg"
        >
          EARN <FaArrowRight />
        </a>
        <a
          href="#learn"
          className="bg-pink-600 font-semibold  flex items-center gap-16 px-4 rounded-2xl  text-lg"
        >
          LEARN <FaArrowRight />
        </a>
        <a
          href="#play"
          className="bg-pink-600 font-semibold  flex items-center gap-16 px-4 rounded-2xl  text-lg"
        >
          PLAY <FaArrowRight />
        </a>
        <a
          href="#find"
          className="bg-pink-600 font-semibold  flex items-center gap-16 px-4 rounded-2xl  text-lg"
        >
          FIND <FaArrowRight />
        </a>
        <a
          href="#find"
          className="bg-pink-600 font-semibold  flex items-center gap-16 px-4 rounded-2xl  text-lg"
        >
          USE <FaArrowRight />
        </a>
        <a
          href="#find"
          className="bg-pink-600 font-semibold  flex items-center gap-16 px-4 rounded-2xl  text-lg"
        >
          LEAD <FaArrowRight />
        </a>
      </nav>
    </div>
  );
}

export default Header;
