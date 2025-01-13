// "use client";
// import { faHeart } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import axios from "axios";
// import { useEffect, useRef, useState } from "react";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import QR from "qrcode-base64";

// const Wizardheader = ({ username, setHeartCount, heartCount }) => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isModalOpen1, setIsModalOpen1] = useState(false);
//   const [isModalOpen2, setIsModalOpen2] = useState(false);
//   const [leaderboardData, setLeaderboardData] = useState([]);

//   const fetchLeaderboardData = async () => {
//     try {
//       const response = await axios.get(
//         "https://magicword.onrender.com/api/users/leaderboard"
//       );
//       setLeaderboardData(response.data);
//     } catch (error) {
//       const errorMessage =
//         error.response?.data?.message ||
//         error.message ||
//         "Failed to load leaderboard data.";
//       console.error("Error fetching leaderboard data:", error);
//       toast.error(errorMessage);
//     }
//   };

//   useEffect(() => {
//     if (isModalOpen2) {
//       fetchLeaderboardData();
//     }
//   }, [isModalOpen2]);

//   const fetchHeartCount = async () => {
//     const loggedInUsername = localStorage.getItem("username");
//     if (!loggedInUsername) {
//       setHeartCount(0);
//       return;
//     }
//     try {
//       const response = await axios.get(
//         "https://magicword.onrender.com/api/users/heart-count",
//         { params: { username: loggedInUsername } }
//       );
//       setHeartCount(response.data.heartCount || 0);
//     } catch (error) {
//       console.error("Error fetching heart count:", error);
//     }
//   };

//   useEffect(() => {
//     fetchHeartCount();
//     const handleClickOutside = (event) => {
//       if (
//         (isModalOpen || isModalOpen1 || isModalOpen2) &&
//         modalRef.current &&
//         !modalRef.current.contains(event.target)
//       ) {
//         setIsModalOpen(false);
//         setIsModalOpen1(false);
//         setIsModalOpen2(false);
//       }
//     };

//     window.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       window.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [isModalOpen, isModalOpen1, isModalOpen2]);

//   const handleHeartSlotClick = async () => {
//     const username = localStorage.getItem("username");
//     if (!username) {
//       toast.error("No username found in local storage.");
//       return;
//     }
//     try {
//       const response = await axios.post(
//         "https://magicword.onrender.com/api/users/add-heart-slot",
//         { username }
//       );
//       toast.success(response.data.message || "Email sent!");
//     } catch (error) {
//       const errorMessage =
//         error.response?.data?.message || error.message || "Unknown error";
//       toast.error(`Failed to add heart slot: ${errorMessage}`);
//     }
//   };

//   return (
//     <div className="flex flex-wrap justify-evenly items-center mx-4 md:mx-16 gap-4">
//       {/* Recharge Button */}
//       <button onClick={() => setIsModalOpen(true)} className="w-full md:w-[430px]">
//         <div className="p-2 text-lg md:text-2xl text-white bg-[#1e1e3a] rounded-2xl flex justify-between items-center gap-4">
//           <div className="flex gap-[4px] items-center">
//             {Array.from({ length: heartCount }).map((_, index) => (
//               <FontAwesomeIcon
//                 key={index}
//                 icon={faHeart}
//                 className="w-4 md:w-5"
//                 beat
//                 fade
//                 style={{ color: "#f70a79" }}
//               />
//             ))}
//           </div>
//           <span>Recharge</span>
//         </div>
//       </button>

//       {/* Task Button */}
//       <button
//         onClick={() => setIsModalOpen1(true)}
//         className="w-full md:w-[430px] p-2 text-lg md:text-2xl text-white bg-[#1e1e3a] rounded-2xl flex justify-center"
//       >
//         Task
//       </button>

//       {/* Leaderboard Button */}
//       <button
//         onClick={() => setIsModalOpen2(true)}
//         className="w-full md:w-[430px] p-2 text-lg md:text-2xl text-white bg-[#1e1e3a] rounded-2xl flex justify-center"
//       >
//         Leaderboard
//       </button>

//       {/* Modals */}
//       {isModalOpen && (
//         <Modal ref={modalRef} title="Recharge" content={/* Recharge Content */} />
//       )}
//       {isModalOpen1 && (
//         <Modal ref={modalRef} title="Tasks" content={/* Tasks Content */} />
//       )}
//       {isModalOpen2 && (
//         <Modal
//           ref={modalRef}
//           title="Leaderboard"
//           content={
//             leaderboardData.length > 0 ? (
//               leaderboardData.map((item, index) => (
//                 <div key={index} className="flex justify-between">
//                   <span>{index + 1}</span>
//                   <span>{item.username}</span>
//                   <span>{item.points}</span>
//                 </div>
//               ))
//             ) : (
//               <p>No leaderboard data available.</p>
//             )
//           }
//         />
//       )}

//       <ToastContainer />
//     </div>
//   );
// };

// export default Wizardheader;
