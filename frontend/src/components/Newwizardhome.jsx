"use client";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Newwizardhome = ({ setHeartCount, heartCount }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isResponseModalOpen, setIsResponseModalOpen] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [pointsAdded, setPointsAdded] = useState(0);
  const [selectedReward, setSelectedReward] = useState("");
  const [selectedCode, setSelectedCode] = useState("");
  const [password, setPassword] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [title, setTitle] = useState("");
  const [titlePassword, setTitlePassword] = useState("");
  const [isAddRewardModalOpen, setIsAddRewardModalOpen] = useState(false);
  const [rewards, setRewards] = useState([]);
  const modalRef = useRef(null);
  const responseModalRef = useRef(null);
  const [isPasswordMatched, setIsPasswordMatched] = useState(false);

  const fetchRewards = async () => {
    try {
      const response = await axios.get(
        "https://magicword.onrender.com/api/users/rewards"
      );
      setRewards(response.data);
    } catch (error) {
      console.error("Error fetching rewards:", error);
    }
  };

  const handleRewardClick = (reward) => {
    setSelectedReward(reward.title);
    setSelectedCode(reward.password);
    setPassword("");
    setIsModalOpen(false);
  };

  const handlePostReward = async () => {
    const selected = rewards.find((reward) => reward.password === selectedCode);
    const username = localStorage.getItem("username");

    let randomPoints = 0;
    if (username) {
      randomPoints = Math.floor(Math.random() * (800 - 10 + 1)) + 10;

      try {
        await axios.post(
          `https://magicword.onrender.com/api/users/add-points`,
          {
            username: username,
            points: randomPoints,
          }
        );
        setPointsAdded(randomPoints);
      } catch (error) {
        console.error("Failed to add points to the user.", error);
      }
    }

    if (selected && password === selected.password) {
      setResponseMessage("Correct password! Reward unlocked.");
      setIsCorrect(true);
      setIsPasswordMatched(true);
      try {
        await axios.delete(
          `https://magicword.onrender.com/api/users/reward/${selected._id}`
        );
        setRewards(rewards.filter((reward) => reward._id !== selected._id));
        setSelectedReward("");
        setPassword("");
      } catch (error) {
        setResponseMessage("Failed to delete the reward.");
        setIsCorrect(false);
      }
    } else {
      const storedUsername = localStorage.getItem("username");
      setResponseMessage(
        "Incorrect password. Please try again. Points have been added!"
      );
      await axios.post(
        `https://magicword.onrender.com/api/users/admin-heart-decr`,
        {
          username: storedUsername,
        }
      );
      setHeartCount((prev) => prev - 1);
      setIsCorrect(false);
      setIsPasswordMatched(false);
    }

    setIsResponseModalOpen(true);
    setTimeout(() => {
      setIsResponseModalOpen(false);
    }, 5000);
  };

  const addReward = async () => {
    try {
      const response = await axios.post(
        "https://magicword.onrender.com/api/users/reward",
        {
          title,
          password: titlePassword,
        }
      );

      if (response.status === 201) {
        setResponseMessage("Reward added successfully!");
        setIsAddRewardModalOpen(false);
      }
      setTitle("");
      setTitlePassword("");
    } catch (error) {
      console.error(
        "Error adding reward:",
        error.response ? error.response.data : error.message
      );
      setResponseMessage("Failed to add reward.");
    }

    setIsResponseModalOpen(true);
    setTimeout(() => {
      setIsResponseModalOpen(false);
    }, 1000);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isModalOpen &&
        modalRef.current &&
        !modalRef.current.contains(event.target)
      ) {
        setIsModalOpen(false);
      }

      if (
        isResponseModalOpen &&
        responseModalRef.current &&
        !responseModalRef.current.contains(event.target)
      ) {
        setIsResponseModalOpen(false);
      }
    };

    if (isModalOpen) {
      fetchRewards();
      window.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen, isResponseModalOpen]);

  return (
    <div className="flex flex-col items-center gap-6 px-4 sm:px-8 h-[180px] lg:px-16">
      <div className="flex flex-col gap-4 w-full sm:max-w-lg">
        <button
          className="flex items-center justify-between h-[20px] md:h-[60px] p-4 text-xl sm:text-2xl rounded-lg bg-[#1e1e3a] w-full"
          onClick={() => setIsModalOpen(true)}
        >
          <input
            placeholder="Choose reward"
            value={selectedReward}
            readOnly
            className="w-full text-xl sm:text-2xl bg-[#1e1e3a] cursor-pointer"
            type="text"
          />
          <img
            src="downarrowinput.gif"
            className="w-6 sm:w-8"
            alt="Down Arrow"
          />
        </button>
        <input
          className="p-4 text-xl sm:text-2xl rounded-lg h-[20px] md:h-[60px]  bg-[#1e1e3a] w-full"
          placeholder="Reward password"
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button
        onClick={handlePostReward}
        disabled={!heartCount}
        className="flex justify-center items-center mt-4"
      >
        <img
          className="md:w-40 w-20  sm:w-56"
          src="seemagic.png"
          alt="See Magic"
        />
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div
            className="bg-[#1e1e3a] p-6 rounded-lg text-white w-full max-w-md sm:max-w-lg"
            ref={modalRef}
          >
            <div className="flex justify-between items-center">
              {localStorage.getItem("username") === "Admin" && (
                <button
                  onClick={() => setIsAddRewardModalOpen(true)}
                  className="text-sm sm:text-lg font-bold"
                >
                  Become magician
                </button>
              )}
              <h2 className="text-lg sm:text-2xl font-bold">
                Choose Your Reward
              </h2>
            </div>
            <div className="flex flex-col gap-2 mt-4">
              {rewards.map((reward) => (
                <button
                  key={reward._id}
                  onClick={() => handleRewardClick(reward)}
                  className="py-2 px-4 rounded bg-[#ffd704] text-black"
                >
                  {reward.title}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {isAddRewardModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-[#1e1e3a] p-6 rounded-lg text-white w-full max-w-md">
            <h2 className="text-lg sm:text-2xl font-bold mb-4">
              Add New Reward
            </h2>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full mb-4 p-2 rounded bg-gray-800 text-white"
            />
            <input
              type="text"
              placeholder="Code"
              value={titlePassword}
              onChange={(e) => setTitlePassword(e.target.value)}
              className="w-full mb-4 p-2 rounded bg-gray-800 text-white"
            />
            <button
              onClick={addReward}
              className="px-4 py-2 bg-blue-500 text-white rounded w-full"
            >
              Add Reward
            </button>
          </div>
        </div>
      )}

      {isResponseModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div
            className={`p-6 rounded-lg text-center w-full max-w-sm ${
              isPasswordMatched ? "bg-green-500" : "bg-red-500"
            }`}
            ref={responseModalRef}
          >
            <p className="text-sm sm:text-lg font-bold text-white">
              {responseMessage}
            </p>
            {pointsAdded > 0 && (
              <p className="text-sm sm:text-base text-white">
                You have been awarded {pointsAdded} points!
              </p>
            )}
            {isPasswordMatched ? (
              <button
                className="mt-4 px-4 py-2 bg-green-600 text-white rounded"
                onClick={() => toast.success("Username sent!")}
              >
                Contact
              </button>
            ) : (
              <button
                onClick={() => setPassword("")}
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded"
              >
                Try Again
              </button>
            )}
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default Newwizardhome;
