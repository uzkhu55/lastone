"use client";

import Magicheader from "./Magicheader";
import { FaArrowDown, FaArrowRight } from "react-icons/fa";
const Money = () => {
  return (
    <div className="flex relative items-center flex-col gap-6">
      <Magicheader />
      <nav className="flex w-[1200px] ml-[100px] justify-between mx-[50px]   ">
        <a
          href="/"
          className="bg-[#fe0f7b] underline  font-extrabold text-white w-[163px] h-[44px] flex items-center  gap-16 px-4 rounded-3xl  text-xl"
        >
          HOME <FaArrowDown />
        </a>
        <a
          href="earn"
          className="bg-[#fe0f7b] underline  font-extrabold text-white w-[163px] h-[44px] flex items-center  gap-16 px-4 rounded-3xl  text-xl"
        >
          EARN <FaArrowRight />
        </a>
        <a
          href="#learn"
          className="bg-[#fe0f7b]  font-extrabold text-white w-[163px] h-[44px] flex items-center  gap-12 px-4 rounded-3xl  text-xl"
        >
          LEARN <FaArrowRight />
        </a>
        <a
          href="#play"
          className="bg-[#fe0f7b]  font-extrabold text-white w-[163px] h-[44px] flex items-center  gap-16 px-4 rounded-3xl  text-xl"
        >
          PLAY <FaArrowRight />
        </a>
        <a
          href="#find"
          className="bg-[#fe0f7b]  font-extrabold text-white w-[163px] h-[44px] flex items-center  gap-16 px-4 rounded-3xl  text-xl"
        >
          FIND <FaArrowRight />
        </a>
        <a
          href="#find"
          className="bg-[#4e0a3d]  font-extrabold text-gray-500 w-[163px] h-[44px] flex items-center  gap-16 px-4 rounded-3xl  text-xl"
        >
          USE <FaArrowRight />
        </a>
        <a
          href="#find"
          className="bg-[#fe0f7b]  font-extrabold text-white w-[163px] h-[44px] flex items-center  gap-16 px-4 rounded-3xl  text-xl"
        >
          LEAD <FaArrowRight />
        </a>
      </nav>
      <div className="flex">
        <nav className="flex flex-col items-center justify-between h-[480px] ml-[50px] mr-4 ">
          <a
            href="#home"
            className="bg-[#fe0f7b] font-extrabold text-white w-[163px] h-[44px] flex items-center  gap-16 px-4 rounded-3xl  text-xl"
          >
            EARN <FaArrowRight />
          </a>
          <a
            href="earn"
            className="bg-black  font-extrabold text-white w-[163px] h-[44px] flex items-center  gap-12 px-4 rounded-3xl  text-xl"
          >
            POINTS <FaArrowRight />
          </a>
          <a
            href="money"
            className="bg-black  font-extrabold text-white w-[163px] h-[44px] flex items-center  gap-12 px-4 rounded-3xl  text-xl"
          >
            MONEY <FaArrowRight />
          </a>
          <a
            href="#play"
            className="bg-black  font-extrabold text-white w-[163px] h-[44px] flex items-center  gap-12 px-4 rounded-3xl  text-xl"
          >
            TICKET <FaArrowRight />
          </a>
          <a
            href="#find"
            className="bg-black  font-extrabold text-white w-[163px] h-[44px] flex items-center  gap-16 px-4 rounded-3xl  text-xl"
          >
            CARD <FaArrowRight />
          </a>
          <a
            href="#find"
            className="bg-black  font-extrabold text-white w-[163px] h-[44px] flex items-center  gap-4 px-4 rounded-3xl  text-xl"
          >
            MATERIAL <FaArrowRight />
          </a>
          <a
            href="#find"
            className="bg-black  font-extrabold text-white w-[163px] h-[44px] flex items-center  gap-4 px-4 rounded-3xl  text-xl"
          >
            SLOTTERY <FaArrowRight />
          </a>
        </nav>
        <div className="relative">
          <img className="w-[862px] h-[478px]" src="money.png" alt="" />
        </div>
        <div>
          <img className="w-[163px] h-[478px]" src="Leaderboard.png" alt="" />
        </div>
      </div>
      <nav className="flex w-[1200px] items-center ml-[100px] justify-between mx-[50px]   ">
        <a
          href="#home"
          className="bg-[#4e0a3d]  font-extrabold text-gray-300 w-[163px] h-[44px] flex items-center  gap-16 px-4 rounded-3xl  text-xl"
        >
          LOVE <FaArrowDown />
        </a>
        <a
          href="earn"
          className="bg-[#4e0a3d]  font-extrabold text-gray-300 w-[163px] h-[44px] flex items-center  gap-16 px-4 rounded-3xl  text-xl"
        >
          LIKE <FaArrowRight />
        </a>
        <a
          href="#learn"
          className="bg-[#4e0a3d]  font-extrabold text-gray-300 w-[163px] h-[44px] flex items-center  gap-12 px-4 rounded-3xl  text-xl"
        >
          CARE <FaArrowRight />
        </a>

        <div className="relative">
          <img
            src="treasurebox.gif"
            className="absolute left-[220px] top-2 w-[63px] h-[46px]"
            alt=""
          />
          <img src="footerlink.png" className="w-[700px]" alt="" />
        </div>
      </nav>
    </div>
  );
};

export default Money;
