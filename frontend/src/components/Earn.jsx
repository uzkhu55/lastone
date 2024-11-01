"use client";

import Link from "next/link";
import Magicheader from "./Magicheader";
import { FaArrowDown, FaArrowRight } from "react-icons/fa";

const Earn = () => {
  return (
    <div className="flex relative items-center flex-col gap-6">
      <Magicheader />
      <nav className="flex w-[1200px] ml-[100px] justify-between mx-[50px]   ">
        <a
          href="/"
          className="bg-[#fe0f7b] underline  font-extrabold text-white w-[163px] h-[44px] flex items-center  gap-16 px-4 rounded-3xl  text-xl"
        >
          HOME <FaArrowRight />
        </a>
        <a
          href="earn"
          className="bg-[#fe0f7b]   font-extrabold text-white w-[163px] h-[44px] flex items-center  gap-16 px-4 rounded-3xl  text-xl"
        >
          EARN <FaArrowDown />
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
            className="bg-black  underline font-extrabold text-white w-[163px] h-[44px] flex items-center  gap-12 px-4 rounded-3xl  text-xl"
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
          <img className="w-[862px] h-[478px]" src="earn.png" alt="" />
          <Link
            href="/play"
            className="flex underline absolute bottom-4 gap-4 left-6 text-white text-xl items-center font-black"
          >
            PLAY GAME <FaArrowRight />
          </Link>
        </div>
        <div>
          <img className="w-[163px] h-[478px]" src="Leaderboard.png" alt="" />
        </div>
      </div>
      <nav className="flex w-[1200px] ml-[100px] justify-between mx-[50px]   ">
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
        <a
          href="#play"
          className="bg-[#fe0f7b]  font-extrabold text-white w-[163px] h-[44px] flex items-center  gap-4 px-4 rounded-3xl  text-xl"
        >
          UPDATES <FaArrowRight />
        </a>
        <a
          href="#find"
          className="bg-[#fe0f7b]  font-extrabold text-white w-[163px] h-[44px] flex items-center  gap-4 px-4 rounded-3xl  text-xl"
        >
          MEMBERS <FaArrowRight />
        </a>
        <a
          href="#find"
          className="bg-[#fe0f7b]  font-extrabold text-white w-[163px] h-[44px] flex items-center  gap-8 px-4 rounded-3xl  text-xl"
        >
          SOCIAL <FaArrowRight />
        </a>
        <a
          href="#find"
          className="bg-[#fe0f7b]  font-extrabold text-white w-[163px] h-[44px] flex items-center  gap-12 px-4 rounded-3xl  text-xl"
        >
          DAILY <FaArrowRight />
        </a>
      </nav>
    </div>
  );
};

export default Earn;
