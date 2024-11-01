"use client";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const Vipdheader = () => {
  return (
    <div className="flex z-10 justify-evenly items-center mx-16">
      <button>
        <div className="p-2 px-8 text-2xl font-semibold text-black w-[430px] justify-between mt-6 bg-[#ffd704]  rounded-2xl flex gap-[100px]">
          <div className="flex gap-[4px] items-center">
            <FontAwesomeIcon
              icon={faHeart}
              className="w-[20px]"
              beat
              fade
              style={{ color: "#f70a79" }}
            />
            <FontAwesomeIcon
              icon={faHeart}
              className="w-[20px]"
              beat
              fade
              style={{ color: "#f70a79" }}
            />
            <FontAwesomeIcon
              icon={faHeart}
              className="w-[20px]"
              beat
              fade
              style={{ color: "#f70a79" }}
            />
          </div>
          Recharge
        </div>
      </button>
      <button className="p-2 font-semibold px-8 text-2xl text-black w-[430px] justify-center mt-6 bg-[#ffd704]  rounded-2xl flex gap-[100px]">
        Task
      </button>
      <button className="p-2 font-semibold px-8 text-2xl text-black w-[430px]  justify-center mt-6 bg-[#ffd704]  rounded-2xl flex gap-[100px]">
        Leaderboard
      </button>
    </div>
  );
};

export default Vipdheader;
