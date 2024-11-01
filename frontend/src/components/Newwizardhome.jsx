// "use client";
// import Link from "next/link";
// import React, { useEffect, useRef, useState } from "react";
// import axios from "axios"; // Import axios for API calls

// // Sample rewards with unique codes
// const rewards = [
//   { title: "Computer (1 Available) Invite 3 Members To Unlock", code: "CODE1" },
//   { title: "iPhone 13 Pro Max (2 Available)", code: "CODE2" },
//   { title: "30,000₮ (111 Available)", code: "CODE3" },
//   { title: "30,000$ (1 Available)", code: "CODE4" },
//   { title: "Car (1 Available)", code: "CODE5" },
//   { title: "3 Room Apartment (1 Available)", code: "CODE6" },
//   { title: "Gremix Special", code: "CODE7" },
//   { title: "Cami's Special", code: "CODE8" },
//   { title: "Car (2 Available)", code: "CODE9" },
//   { title: "Samsung 24 Ultra (1 Available)", code: "CODE10" },
//   { title: "Mobicom Gifts (10,000 Available)", code: "CODE11" },
// ];

// const Newwizardhome = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedReward, setSelectedReward] = useState("");
//   const [selectedCode, setSelectedCode] = useState("");
//   const modalRef = useRef(null);

//   const handleRewardClick = async (reward) => {
//     setSelectedReward(reward.title);
//     setSelectedCode(reward.code);

//     try {
//       const response = await axios.get(
//         "http://localhost:8000/api/users/save-reward",
//         {
//           rewardTitle: reward.title,
//           rewardCode: reward.code,
//         }
//       );
//       console.log(response.data.message); // Log success message
//     } catch (error) {
//       console.error(
//         "Error saving reward:",
//         error.response?.data?.message || error.message
//       ); // Log error message
//     }

//     setIsModalOpen(false);
//     console.log(`Reward selected: ${reward.title}, Code: ${reward.code}`);
//   };

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         isModalOpen &&
//         modalRef.current &&
//         !modalRef.current.contains(event.target)
//       ) {
//         setIsModalOpen(false);
//       }
//     };

//     if (isModalOpen) {
//       window.addEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       window.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [isModalOpen]);

//   return (
//     <div className="flex items-center justify-center">
//       <div className="flex flex-col gap-2">
//         <button
//           className="flex w-[529px] items-center justify-between p-4 text-3xl h-[76px] rounded-xl bg-[#1e1e3a]"
//           onClick={() => setIsModalOpen(true)}
//         >
//           <input
//             placeholder="Choose reward"
//             value={selectedReward}
//             readOnly
//             className="flex w-[529px] items-center justify-between text-3xl h-[76px] rounded-xl bg-[#1e1e3a] cursor-pointer"
//             type="text"
//           />
//           <img
//             src="downarrowinput.gif"
//             className="w-[43px] h-[48px]"
//             alt="Down Arrow"
//           />
//         </button>
//         <input
//           className="flex w-[529px] items-center justify-between p-4 text-3xl h-[76px] rounded-xl bg-[#1e1e3a]"
//           placeholder="Reward password"
//           type="text"
//           name=""
//           id=""
//         />
//       </div>

//       <button>
//         <img
//           className="w-[230px] h-[160px]"
//           src="seemagic.png"
//           alt="See Magic"
//         />
//       </button>

//       {isModalOpen && (
//         <div className="fixed inset-0 flex items-center gap-4 justify-center bg-black bg-opacity-50 z-50">
//           <div
//             className="bg-[#1e1e3a] p-6 rounded-lg text-white max-w-xl w-full"
//             ref={modalRef}
//           >
//             <div className="flex justify-between items-center">
//               <button className="text-1xl font-bold mb-4">
//                 Become magician
//               </button>
//               <h2 className="text-2xl font-bold mb-4">Choose Your Reward</h2>
//             </div>
//             <div className="flex flex-col gap-2">
//               <Link
//                 href="vipwizardhome"
//                 className="block w-full text-left py-2 px-4 rounded text-black bg-[#ffd704]"
//               >
//                 VIP ALL REWARDS
//               </Link>
//               {rewards.map((reward, index) => (
//                 <button
//                   key={index}
//                   onClick={() => handleRewardClick(reward)}
//                   className={`block w-full text-left py-2 px-4 rounded ${
//                     index === 6
//                       ? "bg-[#00c2ff]"
//                       : index === 7
//                       ? "bg-[#fe0f7b]"
//                       : "bg-[#1e1e3a]"
//                   }`}
//                 >
//                   {index + 1}. {reward.title}
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Newwizardhome;
"use client";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

// Sample rewards with unique codes and passwords
const rewards = [
  {
    title: "Computer (1 Available) Invite 3 Members To Unlock",
    code: "CODE1",
    password: "pass1",
  },
  {
    title: "iPhone 13 Pro Max (2 Available)",
    code: "CODE2",
    password: "pass2",
  },
  { title: "30,000₮ (111 Available)", code: "CODE3", password: "pass3" },
  { title: "30,000$ (1 Available)", code: "CODE4", password: "pass4" },
  { title: "Car (1 Available)", code: "CODE5", password: "pass5" },
  { title: "3 Room Apartment (1 Available)", code: "CODE6", password: "pass6" },
  { title: "Gremix Special", code: "CODE7", password: "pass7" },
  { title: "Cami's Special", code: "CODE8", password: "pass8" },
  { title: "Car (2 Available)", code: "CODE9", password: "pass9" },
  {
    title: "Samsung 24 Ultra (1 Available)",
    code: "CODE10",
    password: "pass10",
  },
  {
    title: "Mobicom Gifts (10,000 Available)",
    code: "CODE11",
    password: "pass11",
  },
];

const Newwizardhome = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isResponseModalOpen, setIsResponseModalOpen] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [selectedReward, setSelectedReward] = useState("");
  const [selectedCode, setSelectedCode] = useState("");
  const [password, setPassword] = useState(""); // Reward password input
  const [isCorrect, setIsCorrect] = useState(false); // Track if the guess is correct
  const modalRef = useRef(null);

  const handleRewardClick = (reward) => {
    setSelectedReward(reward.title);
    setSelectedCode(reward.code);
    setPassword(""); // Reset the password field when a reward is selected
    setIsModalOpen(false);
  };

  const handlePostReward = async () => {
    // Find the selected reward
    const selected = rewards.find((reward) => reward.code === selectedCode);

    // Check if the password matches
    if (selected && password === selected.password) {
      setResponseMessage("Correct password! Reward unlocked.");
      setIsCorrect(true); // Set to true if the guess is correct
    } else {
      setResponseMessage("Incorrect password. Please try again.");
      setIsCorrect(false); // Set to false if the guess is incorrect
    }

    setIsResponseModalOpen(true);
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

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center gap-4 justify-center bg-black bg-opacity-50 z-50">
          <div
            className="bg-[#1e1e3a] p-6 rounded-lg text-white max-w-xl w-full"
            ref={modalRef}
          >
            <div className="flex justify-between items-center">
              <button className="text-1xl font-bold mb-4">
                Become magician
              </button>
              <h2 className="text-2xl font-bold mb-4">Choose Your Reward</h2>
            </div>
            <div className="flex flex-col gap-2">
              <Link
                href="vipwizardhome"
                className="block w-full text-left py-2 px-4 rounded text-black bg-[#ffd704]"
              >
                VIP ALL REWARDS
              </Link>
              {rewards.map((reward, index) => (
                <button
                  key={index}
                  onClick={() => handleRewardClick(reward)}
                  className={`block w-full text-left py-2 px-4 rounded ${
                    index === 6
                      ? "bg-[#00c2ff]"
                      : index === 7
                      ? "bg-[#fe0f7b]"
                      : "bg-[#1e1e3a]"
                  }`}
                >
                  {index + 1}. {reward.title}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {isResponseModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div
            className={`p-6 rounded-lg text-center ${
              isCorrect ? "bg-green-500" : "bg-red-500"
            }`}
          >
            <p className="text-xl font-bold text-white">{responseMessage}</p>
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
              onClick={() => setIsResponseModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Newwizardhome;
