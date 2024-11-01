"use client";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";

const Vipfooter = () => {
  return (
    <div className="flex z-10 justify-evenly items-center mx-16">
      <button className="p-2 px-8 text-2xl font-semibold text-black w-[430px] justify-center mb-6 bg-[#ffd704] rounded-2xl flex gap-[100px]">
        Winners
      </button>
      <button className="p-2 px-8 text-2xl font-semibold text-black w-[430px] justify-center bg-[#ffd704] mb-6 rounded-2xl flex gap-[100px]">
        Updates
      </button>
      <button className="p-2 px-8 text-2xl font-semibold text-black w-[430px] justify-center bg-[#ffd704] mb-6 rounded-2xl flex gap-[100px]">
        Profile
      </button>
    </div>
  );
};

export default Vipfooter;
