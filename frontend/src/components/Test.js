import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

const Newwizardhome = () => {
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
  const [isPasswordIncorrect, setIsPasswordIncorrect] = useState(false); // Track password state
  const modalRef = useRef(null);

  // Fetch rewards from the server when the modal opens
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
      setIsPasswordIncorrect(false); // Set to false on correct password
      try {
        await axios.delete(
          `https://magicword.onrender.com/api/users/reward/${selected._id}`
        );
        setRewards(rewards.filter((reward) => reward._id !== selected._id));
        setSelectedReward("");
        setPassword("");
      } catch (error) {
        setResponseMessage("Failed to delete the reward.");
      }
    } else {
      setResponseMessage("Incorrect password. Points have been added!");
      setIsCorrect(false);
      setIsPasswordIncorrect(true); // Set to true on incorrect password
    }

    // Open the response modal
    setIsResponseModalOpen(true);

    // Hide the response message after 1 second
    setTimeout(() => {
      setIsResponseModalOpen(false);
    }, 1000);
  };

  const tryAgain = () => {
    setIsModalOpen(true); // Reopen the reward selection modal
    setPassword(""); // Clear the password input
  };

  const contactToGetPrize = () => {
    // Add logic to contact for the prize, e.g., opening a contact form or redirecting
    alert("Contact us to get your prize!");
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
    };

    if (isModalOpen) {
      fetchRewards();
      window.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen]);

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

      <button onClick={handlePostReward}>
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
              <button
                onClick={() => setIsAddRewardModalOpen(true)}
                className="text-1xl font-bold mb-4"
              >
                Become magician
              </button>
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

      {/* Response Modal */}
      {isResponseModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="p-6 rounded-lg text-center bg-red-500">
            <p className="text-xl font-bold text-white">{responseMessage}</p>
            {pointsAdded > 0 && (
              <p className="text-lg text-white">
                You have been awarded {pointsAdded} points!
              </p>
            )}
            {/* Conditional Button Rendering */}
            {isPasswordIncorrect ? (
              <button
                onClick={tryAgain}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
              >
                Try Again
              </button>
            ) : (
              <button
                onClick={contactToGetPrize}
                className="mt-4 px-4 py-2 bg-green-600 text-white rounded"
              >
                Contact to Get Prize
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Newwizardhome;
