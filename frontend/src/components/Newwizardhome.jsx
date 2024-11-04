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
  const [pointsAdded, setPointsAdded] = useState(0); // State to track points added
  const [selectedReward, setSelectedReward] = useState("");
  const [selectedCode, setSelectedCode] = useState("");
  const [password, setPassword] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [title, setTitle] = useState("");
  const [titlePassword, setTitlePassword] = useState("");
  const [isAddRewardModalOpen, setIsAddRewardModalOpen] = useState(false);
  const [rewards, setRewards] = useState([]);
  const modalRef = useRef(null);
  const responseModalRef = useRef(null); // Ref for the response modal
  const [isPasswordMatched, setIsPasswordMatched] = useState(false); // State for password match

  // Fetch rewards from the server when the modal opens
  const fetchRewards = async () => {
    try {
      const response = await axios.get(
        "https://magicword.onrender.com/api/users/rewards"
      );
      setRewards(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching rewards:", error);
    }
  };

  const handleRewardClick = (reward) => {
    setSelectedReward(reward.title);
    setSelectedCode(reward.password); // Assuming the password is the code
    setPassword("");
    setIsModalOpen(false);
  };

  const handlePostReward = async () => {
    const selected = rewards.find((reward) => reward.password === selectedCode);
    const username = localStorage.getItem("username"); // Retrieve username from local storage

    // Initialize randomPoints
    let randomPoints = 0;

    // Generate a random number of points between 10 and 800
    if (username) {
      randomPoints = Math.floor(Math.random() * (800 - 10 + 1)) + 10;

      try {
        // Add points to the user
        await axios.post(
          `https://magicword.onrender.com/api/users/add-points`,
          {
            username: username,
            points: randomPoints,
          }
        );

        // Update state with points added
        setPointsAdded(randomPoints);
      } catch (error) {
        console.error("Failed to add points to the user.", error);
      }
    }

    // Check if the password is correct
    if (selected && password === selected.password) {
      setResponseMessage("Correct password! Reward unlocked.");
      setIsCorrect(true);
      setIsPasswordMatched(true); // Set to true if password matches
      try {
        await axios.delete(
          `https://magicword.onrender.com/api/users/reward/${selected._id}`
        );
        setRewards(rewards.filter((reward) => reward._id !== selected._id)); // Remove the deleted reward from the state
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
      // "https://magicword.onrender.com/api/users/admin-heart-slot",
      await axios.post(
        `https://magicword.onrender.com/api/users/admin-heart-decr`,
        {
          username: storedUsername,
        }
      );
      setHeartCount((prev) => prev - 1);

      setIsCorrect(false);
      setIsPasswordMatched(false); // Reset password match state
    }

    // Open the response modal
    setIsResponseModalOpen(true);

    // Hide the response message after 10 seconds
    setTimeout(() => {
      setIsResponseModalOpen(false);
    }, 5000); // 10000 milliseconds = 10 seconds
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

    // Hide the response message after 1 second
    setTimeout(() => {
      setIsResponseModalOpen(false);
    }, 1000); // 1000 milliseconds = 1 second
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

      // Close the response modal if clicking outside of it
      if (
        isResponseModalOpen &&
        responseModalRef.current &&
        !responseModalRef.current.contains(event.target)
      ) {
        setIsResponseModalOpen(false);
      }
    };

    if (isModalOpen) {
      fetchRewards(); // Fetch rewards when modal opens
      window.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen, isResponseModalOpen]); // Add isResponseModalOpen to dependencies
  const handleContactClick = () => {
    toast.success("Username sent!"); // Customize your message here
  };

  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col gap-2">
        <button
          className="flex w-[529px] items-center justify-between p-4 text-3xl h-[76px] rounded-xl bg-[#1e1e3a]"
          onClick={() => setIsModalOpen(true)}
        >
          <input
            placeholder="Choose reward"
            value={selectedReward}
            readOnly
            className="flex w-[529px] items-center justify-between text-3xl h-[76px] rounded-xl bg-[#1e1e3a] cursor-pointer"
            type="text"
          />
          <img
            src="downarrowinput.gif"
            className="w-[43px] h-[48px]"
            alt="Down Arrow"
          />
        </button>
        <input
          className="flex w-[529px] items-center justify-between p-4 text-3xl h-[76px] rounded-xl bg-[#1e1e3a]"
          placeholder="Reward password"
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button onClick={handlePostReward} disabled={!heartCount}>
        <img
          className="w-[230px] h-[160px]"
          src="seemagic.png"
          alt="See Magic"
        />
      </button>

      {/* Rewards Selection Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center gap-4 justify-center bg-black bg-opacity-50 z-50">
          <div
            className="bg-[#1e1e3a] p-6 rounded-lg text-white max-w-xl w-full"
            ref={modalRef}
          >
            <div className="flex justify-between items-center">
              {/* Check if the user is an admin */}
              {localStorage.getItem("username") === "Admin" && ( // Replace 'adminUsername' with the actual admin username
                <button
                  onClick={() => setIsAddRewardModalOpen(true)}
                  className="text-1xl font-bold mb-4"
                >
                  Become magician
                </button>
              )}
              <h2 className="text-2xl font-bold mb-4">Choose Your Reward</h2>
            </div>
            <div className="flex flex-col gap-2">
              {rewards.map((reward) => (
                <button
                  key={reward._id}
                  onClick={() => handleRewardClick(reward)}
                  className="block w-full text-left py-2 px-4 rounded text-black bg-[#ffd704]"
                >
                  {reward.title}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Add Reward Modal */}
      {isAddRewardModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-[#1e1e3a] p-6 rounded-lg text-white max-w-xl w-full">
            <h2 className="text-2xl font-bold mb-4">Add New Reward</h2>
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
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Add Reward
            </button>
          </div>
        </div>
      )}

      {isResponseModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div
            className={`p-6 rounded-lg text-center ${
              isPasswordMatched ? "bg-green-500" : "bg-red-500"
            }`}
            ref={responseModalRef}
          >
            <p className="text-xl font-bold text-white">{responseMessage}</p>
            {pointsAdded > 0 && (
              <p className="text-lg text-white">
                You have been awarded {pointsAdded} points!
              </p>
            )}
            {isPasswordMatched ? (
              <button
                className="mt-4 px-4 py-2 bg-green-600 text-white rounded"
                onClick={handleContactClick}
              >
                Contact
              </button>
            ) : (
              <div>
                <p className="mt-2 text-lg text-white">
                  Incorrect Password. Please try again.
                </p>
                {heartCount > 0 ? (
                  <button
                    onClick={() => {
                      setPassword(""); // Clear the password input for the next attempt
                      setIsResponseModalOpen(false); // Hide the response modal immediately
                      setIsModalOpen(false); // Hide the rewards modal immediately
                    }}
                    className="mt-4 px-4 py-2 bg-red-600 text-white rounded"
                  >
                    Try Again
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      // Logic for charging the heart count can be implemented here
                      alert("Redirecting to charge your heart count!");
                    }}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                  >
                    Charge
                  </button>
                )}
              </div>
            )}
            {isPasswordMatched && (
              <button
                onClick={() => setIsAddRewardModalOpen(true)} // Open the Add Reward modal
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
              >
                Add Reward
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
